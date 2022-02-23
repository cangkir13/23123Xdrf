const ModelHistory = require('../../models/Kurir_dc_history');
const moduleVendor = require('../index');
const ekspedisi = 'dc_express';

const tracking = async(awb) => {
    try {
        let data = await ModelHistory.findOne({
            where : {
                id_order : awb
            }
        })
        
        if (!data) {
            return {
                status:false,
                ekspedisi,
                awb:awb,
                status_code:'404',
                msg:'Invalid AWB Pleace Check and try again'
            }
        }

        let result = JSON.parse(data.history)
        let newAWb = {}
        if(data.new_awb !== null) {
            newAWb =  await moduleVendor(data.new_kurir, data.new_awb);
            if (newAWb) {
                result.history.push(...newAWb.history)
            }
        }

        return result
    } catch (error) {
        return {
            status : false,
            status_code : 500,
            msg : 'error server '+ error.message
        }
    }
}

module.exports = tracking