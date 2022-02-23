const axios = require('axios')

const api_sap = async (awb) => {

    var response = await axios({
        method: "get",
        url: "http://track.coresyssap.com/shipment/tracking/awb?awb_no="+awb,
        headers: {
            'Content-Type': 'application/json',
            'api_key': 'KLinK_#_2019'
        }
    })
    .then((result) => {
        return result.data
    }).catch((error) => {
        return error.response.data
    })
    
    return response    
}

const global_res = async(api) => {
    let api_res = api[0];
    let history = [];
    // console.log(api);
    if(api.length){
        api.forEach(v => {
            let status_code = '';
            if(v.rowstate_name == "POD - DELIVERED"){
                status_code = "200";
            }else if (v.rowstate_name == "SHIPMENT RETURN TO CLIENT") {
                status_code = "402";
            } else {
                status_code = v.rowstate_name
            }
            history.push({
                track_date:v.create_date,
                status:v.description,
                status_code,
                driverName:'',
                driverPhone:'',
                photo:v.pod_photo,
                camera:v.pod_camera,
                signature:v.pod_signature,
            })
        });
        // awb:v.reference_no,
        return {
            status:true,
            ekspedisi:'sap',
            awb:api_res.reference_no,
            tgl_booking:api_res.create_date,
            penerima:api_res.receiver_name,
            alamat_pengirim:api_res.origin,
            alamat_penerima:api_res.destination,
            history
        }
    }else{
        return {
            status:false,
            ekspedisi:'sap',
            awb:'null',
            status_code:'404',
            msg:'Invalid AWB Pleace Check and try again'
        }
    }
    
}

const tracking_sap = async(awb) => {
    let api = await api_sap(awb);
    return await global_res(api);
}

module.exports = { tracking_sap}