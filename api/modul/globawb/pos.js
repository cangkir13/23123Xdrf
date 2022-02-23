const axios = require('axios');
const ekspedisi = 'pos'

const api_pos = async (arg) => {
    
    var response = await axios({
        method: "GET",
        url: "https://service-kirim.k-link.dev/GetPricePos/api_tracking",
        data:arg
    })
    .then((result) => {
        return result.data
    }).catch((error) => {
        return error.response.data
    })
    return response;
}

const globalres = async (api) => {
    if (api.rs_tnt == null) {
        return {
            status:false,
            ekspedisi,
            awb:'null',
            status_code:'404',
            msg:'Invalid AWB Pleace Check and try again'
        }
    } else {
        let history = [];
        resapi = api.rs_tnt.r_tnt
        resapi.forEach(element => {
            history.push({
                track_date:element.eventDate,
                status:element.eventName+element.office,
                status_code:element.eventName
            })
        });

        return {
            status:true,
            ekspedisi,
            awb:resapi[0].barcode,
            tgl_booking:resapi[0].eventDate,
            pengirim:resapi[0].office,
            alamat_pengirim:resapi[0].office,
            history
        };
    }
}

const tracking_pos = async (arg) => {
    let api = await api_pos(arg)
    // return api
    return await globalres(api)
}

module.exports = {tracking_pos}