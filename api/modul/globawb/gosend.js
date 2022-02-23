const axios = require('axios');
const ekspedisi = 'gosend'

const api_gosend = async (awb) => {
    let param = {
        username:"KLINK",
        api_key:'76270305bef5d402220c96d59ac61977'
    }
    var response = await axios({
        method: "GET",
        url: "https://kilat-api.gojekapi.com/gokilat/v10/booking/orderno/"+awb,
        headers: {
            'Content-Type': 'application/json',
            'Client-ID': 'k-link-engine',
            'Pass-Key':'93ba01448ac1ff0db93fb96bf04d093628544e3e6c68d66a441ba5be2d49a1b6'
        }
    })
    .then((result) => {
        return result.data
    }).catch((error) => {
        return error.response.data
    })

    return response;
}

const global_res = async (api) => {
    // console.log(api)
    // return api
    if(!api.length || api.errors )
    {
        return {
            status:false,
            ekspedisi,
            awb:null,
            status_code:'404',
            msg:'Invalid AWB Pleace Check and try again'
        }
    }else{
        return {
            status:true,
            ekspedisi,
            awb: api.orderNo,
            tgl_booking:api.orderCreatedTime,
            pengirim:api.sellerAddressName,
            penerima:api.buyerAddressName,
            alamat_pengirim:api.sellerAddressDetail,
            alamat_penerima:api.buyerAddressDetail,
            history:{
                track_date:api.orderCreatedTime,
                status:api.liveTrackingUrl,
                status_code:null,
                driverName:api.driverName,
                driverPhone:api.driverPhone
            }
        }
    }
}

const tracking_gosend = async (awb) => {
    let api = await api_gosend(awb)
    // return api.errors;
    return global_res(api)
}

module.exports = {tracking_gosend}