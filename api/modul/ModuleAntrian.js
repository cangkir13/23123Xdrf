const moment = require('moment');
const ModelAntrian = require('../models/Trackingjobsave');
const modelSimpanHistory = require('../models/Save_data_tracking');
const modelMars = require('../models/KmartFlag')
// check doublce antrian
const CheckDouble = async(awb) => {
    // query find awb
    let findata =  await ModelAntrian.findOne({
        where : {awb}
    })
    if (!findata) {
        return true
    } else {
        return false
    }
}

// save history tracking
const simpan_history = (payload) => {
    return modelSimpanHistory.create(payload)
}

// save new antrian
const simpan_antrian = (payload) => {
    return ModelAntrian.create(payload)
}
// update flag awb kmart
const updateFlagKmart = (where, payload) => {
    return modelMars.update(payload, {where})
}

const AddHisotry = async(awb, payloadhistory, ekspedisi) => {
    let check = await CheckDouble(awb)
    if(check) {
        let history = payloadhistory.history

        let payloadHistory = {
            'ekspedisi' : ekspedisi,
            'awb' : awb,
            'last_status' : history[history.length -1].status,
            'last_status_code' : history[history.length -1].status_code,
            'detail' : JSON.stringify(payloadhistory),
            'save_at' : moment().format('Y-MM-DD hh:mm:ss'),
        };

        let payloadAntrian = {
            'ekspedisi' : ekspedisi,
            'awb' : awb,
            'status' : history[history.length -1].status,
            'status_code' : history[history.length -1].status_code,
            'create_at' : moment().format('Y-MM-DD hh:mm:ss'),
        };

        if (history.some((el) => el.status_code == 200)) {
                    
            simpan_history(payloadHistory)
            payloadAntrian['msg'] = 'Barang sudah terkirim';
            payloadAntrian['status_code'] = 200;
            simpan_antrian(payloadAntrian)
            // update flag kmart
            updateFlagKmart({ekspedisi, awb}, {message : "SUCCESS", update_flag: true, updatedAt: moment(moment(), 'Y-MM-DD hh:mm:ss')})
            
            result = {
                awb, 
                ekspedisi,
                message : payloadAntrian.msg
            }
        } 
        // check data retur
        else if (history.some((el) => el.status_code == 402)) {
            simpan_history(payloadHistory)
            payloadAntrian['msg'] = 'Barang di Retur';
            payloadAntrian['status_code'] = 402;
            simpan_antrian(payloadAntrian)

            // update flag kmart
            updateFlagKmart({ekspedisi, awb}, {message : "RETUR", update_flag: true, updatedAt: moment(moment(), 'Y-MM-DD hh:mm:ss')})

            result = {
                awb, 
                ekspedisi,
                message : payloadAntrian.msg
            }
        } else {
            result = {
                awb, 
                ekspedisi,
                message : "Paket sedang dalam perjalanan",
                history
            }
        }
        console.log(result)

    } else {
        console.log("data is double")
    }
}

module.exports = AddHisotry;