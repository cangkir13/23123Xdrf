const driver = require('../models/Klink_driver');
const history = require('../models/klink_history');
const transaksi = require('../models/kurir_klink_transaksi');
const moment = require('moment');

function statuscode(st){
    const availstatus = [100, 101, 102, 103, 200, 401, 402];
    const found = availstatus.find(element => element == st);
    
    if(found){
        // console.log('benar');
        return true
    }else{
        // console.log('salah');
        return false
    }
}

async function InsertUpdate(params) {
    const {idorder} = params
    
    let findtrans = await history.findOne({
        where:{idorder}
    })

    let historyNEW = JSON.parse(findtrans.history);
    historyNEW.history.push({
        track_date: moment().format('YYYY-MM-DD HH:m:ss'),
        status: params.status,
        status_code: parseInt(params.status_code),
        driverName: params.driverName,
        driverPhone: params.driverPhone
    })

    await history.update({
            status_code:parseInt(params.status_code), 
            history:JSON.stringify(historyNEW)},
        {
            where:{idorder}
        })
    return {status:true, msg:'Data has been updated', data:historyNEW}
    
}

const KlinkWebhook = () => {
    const add = async(req, res) => {
        const {idorder, drivercode, status_code, status} = req.body
        
        // cek idorder di transaksi
        if(! await transaksi.findOne({where:{idorder:idorder}}))
            return res.status(404).json({status:false, msg:"id order not found"});
        // console.log(idorder);
        
        let cekHIS = await history.findOne({
            where:{idorder:idorder}
        })
        
        // cek status code terakhir
        if(cekHIS.status_code == 200 || cekHIS.status_code == 402 )    
            return res.status(403).json({status:false, msg:"History was finish"});

        let driverWH;
        // cek driver wh
        if (drivercode !== '') {
            driverWH = await driver.findOne({
                where:{
    
                    driver_code:drivercode,
                    active:1
                }
            })
            if (!driverWH) 
                return res.status(404).json({status:false, msg:"Driver not found"});    
        }
        
        if(statuscode(status_code) == false)
            return res.status(404).json({status:false, msg:"status_code not found"});
        
        return res.json(await InsertUpdate({
            idorder,
            status,
            status_code,
            drivercode:(driverWH !== undefined)?driverWH.driver_code:null,
            track_date:moment().format('YYYY-MM-DD HH:mm:ss'),
            driverName:(driverWH !== undefined)?driverWH.nama:null,
            driverPhone:(driverWH !== undefined)?driverWH.tlpn:null,
        }))
    }

    return {
        add
    }
}

module.exports = KlinkWebhook