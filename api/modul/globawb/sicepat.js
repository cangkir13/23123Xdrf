const axios = require('axios');
const ekspedisi = 'sicepat';

const api_sicepat = async (awb) => {
    
    var response = await axios({
        method: "GET",
        url: "http://api.sicepat.com/customer/waybill",
        headers: {
            'Accept': 'application/json',
            'api-key': '525ce3d154e4f068a24fe213c671ab17'
        },
        params:{
            waybill:awb
        }
    })
    .then((result) => {
        return result.data
    }).catch((error) => {
        return error.response.data
    })
    // console.log(response.sicepat)
    return response.sicepat;
}

const global_res = async (api) => {
    if(api.status.code != 200 )
    {
        return {
            status:false,
            ekspedisi,
            awb:null,
            status_code:404,
            msg:'Invalid AWB Pleace Check and try again'
        }
    }else{
        let data_api = api.result.track_history
        // console.log(data_api)
        let history = []
        data_api.forEach(v => {
            let stcd = v.status
            if(stcd.match(/DELIVERED/)){
                var status_code = '200'
            }  else{
                var status_code = stcd
            }
            history.push({
                track_date:v.date_time,
                status:v.city,
                status_code,
                driverName:null,
                driverPhone:null
            })
        });
        return {
            status:true,
            ekspedisi,
            awb: api.result.waybill_number,
            tgl_booking:api.result.send_date,
            pengirim:api.result.sender,
            penerima:api.result.receiver_name,
            alamat_pengirim:api.result.sender_address,
            alamat_penerima:api.result.receiver_address,
            history
        }
    }
}

const tracking_sicepat = async (awb) => {
    let api = await api_sicepat(awb)
    console.log(api);
    
    // return api
    return global_res(api)
}

module.exports = {tracking_sicepat}