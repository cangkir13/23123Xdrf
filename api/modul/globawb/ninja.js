const model = require('../../models/WebhookNinja');
const CustmerTsn = require('../../models/Transaksi_pesanan_detail');
const ekspedisi = 'ninja';

module.exports = async(awb) => {

    let usertrans = await CustmerTsn.findOne({
        where: {awb}
    })
    
    if (!usertrans) {
        return {
            status:false,
            ekspedisi,
            awb:null,
            status_code:'404',
            msg:'Invalid AWB Pleace Check and try again'
        }
    }

    let data = await model.findAll({
        where: {
            awb:awb
        }
    })

    if (data.length < 1) {
        return {
            status:false,
            ekspedisi,
            awb:null,
            status_code:'404',
            msg:'Invalid AWB Pleace Check and try again'
        }
    }

    let history = data.map((el) => {
        let v = el['dataValues']
        return {
            track_date:v.date_add,
            status:v.status ,
            status_code: (v.status === 'Completed')? 200 :
                        (v.status === 'Returned to Sender') ? 402:v.status, 
            driverName:null,
            driverPhone:null
        }
    })

    let pengirim = JSON.parse(usertrans.origin).warehouse
    let alamat_pengirim = JSON.parse(usertrans.origin).address
    let penerima = JSON.parse(usertrans.destination).pembeli
    let alamat_penerima = JSON.parse(usertrans.destination).address

    return {
        status:true,
        ekspedisi,
        awb,
        tgl_booking:usertrans.date_add,
        pengirim,
        penerima,
        alamat_pengirim,
        alamat_penerima,
        history
    };  

}