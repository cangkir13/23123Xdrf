const axios = require('axios');

const api_jnt = async (awb) => {
    let url = "http://interchange.jet.co.id:22268/jandt-order-web/track/trackAction!tracking.action";
    let param = {
        awb: awb,
        eccompanyid:"KLINK"
    }
    param = JSON.stringify(param)
    var response_api = await axios({
        method: "POST",
        url,
        headers: {
            'Content-Type': 'application/json'
        },
        auth:{
            username:"KLINK",
            password:"Kl1nk389476rfwsakfhh"
        },
        data:param
    }).then((result) => {
        return result.data
    }).catch((err) => {        
        return err.response.data
    });
    
    return response_api;
}

const global_res = (api) => {
    if(api.error_id) {
        return {
            status:false,
            ekspedisi:'jnt',
            awb:'null',
            status_code:'404',
            msg:'Invalid AWB Pleace Check and try again'
        }
    }else{
        let dhistori = api.history;
        let history = []
        dhistori.forEach(value => {
            history.push({
                track_date:value.date_time,
                status:value.status,
                status_code:value.status_code,
                driverName:value.driverName,
                driverPhone:value.driverPhone
            })
        });
        return {
            status:true,
            ekspedisi:'jnt',
            awb: api.awb,
            tgl_booking:api.detail.shipped_date,
            pengirim:api.detail.sender.name,
            penerima:api.detail.receiver.name,
            alamat_pengirim:api.detail.sender.addr,
            alamat_penerima:api.detail.receiver.addr,
            history
        };
    }
}

const tracking_jnt = async(awb) => {
    let api = await api_jnt(awb);
    return await global_res(api);
}


module.exports = {tracking_jnt}