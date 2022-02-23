const axios = require('axios');
const qs = require('qs');
const ekspedisi = 'jne'

const api_jne = async (awb) => {
    let param = {
        username:"KLINK",
        api_key:'76270305bef5d402220c96d59ac61977'
    }
    var response = await axios({
        method: "POST",
        url: "http://apiv2.jne.co.id:10101/tracing/api/list/v1/cnote/"+awb,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data:qs.stringify(param)
    })
    .then((result) => {
        return result.data
    }).catch((error) => {
        return error.response.data
    })

    return response;
}

const global_res = async (api) => {
    if(api.status == false )
    {
        return {
            status:false,
            ekspedisi,
            awb:null,
            status_code:'404',
            msg:'Invalid AWB Pleace Check and try again'
        }
    }else{
        let data_api = api.history
        let history = []
        data_api.forEach(v => {
            let stcd = v.desc
            if(stcd.match(/DELIVERED/)){
                var status_code = '200'
            } else if(stcd.match(/RETUR/)){
                var status_code = '402'
            } else{
                var status_code = '100'
            }
            history.push({
                track_date:v.date,
                status:stcd,
                status_code,
                driverName:null,
                driverPhone:null
            })
        });
        return {
            status:true,
            ekspedisi,
            awb: api.cnote.cnote_no,
            tgl_booking:api.cnote.cnote_date,
            pengirim:api.detail[0].cnote_shipper_name,
            penerima:api.detail[0].cnote_receiver_name,
            alamat_pengirim:api.detail[0].cnote_shipper_addr1,
            alamat_penerima:api.detail[0].cnote_receiver_addr1,
            history
        }
    }
}

const tracking_jne = async (awb) => {
    let api = await api_jne(awb)
    // return api
    return global_res(api)
}

module.exports = {tracking_jne}