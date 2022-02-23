const tblwbh = require('../models/WebhookNinja');
const modelTrackingjob = require('../models/Trackingjobsave');
const crypto = require('crypto');
const sharedSecretStaging = "35a79f487f8047ffa656b0adc758c60e";
const sharedSecretprod = "9cd93b7f9bc64591937d061a8bb88dd9";
const verify_staging = async(param, headers) => {
    calculated_hmac = crypto.createHmac("sha256", sharedSecretStaging).update(JSON.stringify(param)).digest("base64");
    return (headers == calculated_hmac)
}

const verify_production = async(param, headers) => {
    calculated_hmac = crypto.createHmac("sha256", sharedSecretprod).update(JSON.stringify(param)).digest("base64");
    return (headers == calculated_hmac)
}

// webhook staging
const webhook = async(body, encrypt) => {
    try {
        let signature = await verify_staging(body, encrypt);
        if(signature == true){
            if (body.comments) {
                var msg = body.comments;
            } else {
                var msg = '';
            }
            let paraminsert = {
                awb:body.tracking_id,
                status:body.status,
                status_code:body.status,
                msg,
                detail_data:JSON.stringify(body),
                date_add:body.timestamp
            }
            let db = await tblwbh.create(paraminsert)
            return {status:true, data:paraminsert, db}
        }else{
            return {status:false, data:'any Trouble'}
        }
    } catch (error) {
        return {status:false, data:"any troble in db"}
    }
}

// webhook prod
const webhook_prod = async(body, encrypt) => {
    try {
        let signature = await verify_production(body, encrypt);
        if(signature == true){
            if (body.comments) {
                var msg = body.comments;
            } else {
                var msg = '';
            }
            let paraminsert = {
                awb:body.tracking_id,
                status:body.status,
                status_code:body.status,
                msg,
                detail_data:JSON.stringify(body),
                date_add:body.timestamp
            }
            let db = await tblwbh.create(paraminsert)

            if (paraminsert.status === 'Completed') {
                await modelTrackingjob.create({
                    ekspedisi:'ninja',
                    awb:paraminsert.awb,
                    status:paraminsert.status,
                    status_code:200,
                    msg:paraminsert.msg,
                    create:paraminsert.timestamp
                }) 
            }

            if (paraminsert.status === 'Returned to Sender') {
                await modelTrackingjob.create({
                    ekspedisi:'ninja',
                    awb:paraminsert.awb,
                    status:paraminsert.status,
                    status_code:402,
                    msg:paraminsert.status,
                    create:paraminsert.timestamp
                })
            }

            return {status:true, data:paraminsert, db}
        }else{
            return {status:false, data:'invalid Signature'}
        }
    } catch (error) {
        console.log(error);
        return {status:false, data:"any troble in db", error}
    }
}

module.exports = {webhook, webhook_prod}