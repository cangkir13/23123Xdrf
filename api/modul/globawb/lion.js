const axios = require('axios')
const ekspedisi = 'lion_parcel';
const api_lion = async (awb) => {
    
    var response = await axios({
        method: "GET",
        url: "http://api.lionparcel.com/v3/stt/track?q="+awb,
        headers: {
            'Content-Type': 'application/xml',
            'Authorization': 'Basic cHJkQGxpb25wYXJjZWw1OiZeKkpIRyYmKEBIODk0NzU3MzQ4OWpoZGhkZmpkZw=='
        },
        
    })
    .then((result) => {
        // console.log(result.data)
        return result.data
    }).catch((error) => {
        // console.log(error.response.data)
        return error.response.data
    })
    
    return response;
}

const global_res = async (api) => {
    
    if (api.error_code == 701) {
        return {
            status:false,
            ekspedisi,
            awb:null,
            status_code:'404',
            msg:'Invalid AWB Pleace Check and try again'
        }
    }else{
        let data_str = api.stts[0].history;
        let history = []
        data_str.forEach(v => {
            let st = v.status_code
            if(st == 'POD'){
                var status_code = '200'
            }else if(st == 'CNX'){
                var status_code = '402'
            }else{
                var status_code = st
            }
            history.push({
                track_date:v.datetime,
                status:v.remarks+'|'+v.city,
                status_code,
                driverName:null,
                driverPhone:null
            })
        });

        let detail = api.stts[0];
        return {
            status:true,
            ekspedisi,
            awb:detail.stt_no,
            tgl_booking:null,
            pengirim:detail.sender_name,
            penerima:detail.recipient_name,
            alamat_pengirim:detail.origin,
            alamat_penerima:detail.destination,
            history
        };  

    }
}

const tracking_lion = async (awb) => {
    let api = await api_lion(awb);
    // return api
    return await global_res(api)
}

module.exports = {tracking_lion}