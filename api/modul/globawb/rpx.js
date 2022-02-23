const soap = require('soap');
const ekspedisi = 'rpx'

const api_rpx = async (awb) => {
    let param = {
        user:"rpxklink",
        password: "rpx123klink",
        awb,
        format:'JSON'
    }
    let url = 'http://api.rpxholding.com/wsdl/rpxwsdl.php?wsdl';

    let rpxClient = await soap.createClientAsync(url);
    let result = await rpxClient.getTrackingAWBAsync(param);    
 
    let ret_result = JSON.parse(result[0].return.$value).RPX;
    return ret_result;
}

const global_res = async(api, awb) => {
    if (api.ERROR) {
        return {
            status:false,
            ekspedisi,
            awb:null,
            status_code:'404',
            msg:'Invalid AWB Pleace Check and try again'
        }
    }
    let data_story = api.DATA
    delete data_story[0];
    let history = []
    data_story = data_story.reverse()
    // console.log(data_story)
    data_story.forEach(v => {
        if(v.TRACKING_ID == 'POD'){
            var status_code = '200';
        }else if(v.TRACKING_ID == 'STAT14' ){
            var status_code = '402';
        }else{
            var status_code = v.TRACKING_ID;
        }
        history.push({
            track_date:v.TRACKING_DATE+' '+v.TRACKING_TIME,
            status:v.TRACKING_DESC +' | '+ v.LOCATION,
            status_code, 
            driverName:null,
            driverPhone:null
        })
    });
    return {
        status:true,
        ekspedisi,
        awb,
        tgl_booking:api.DELIVERY_DATE+' '+api.DELIVERY_TIME,
        pengirim:null,
        penerima:api.DELIVERY_TO,
        alamat_pengirim:null,
        alamat_penerima:api.DELIVERY_LOC,
        history
    };  
}

const tracking_rpx = async (awb) => {
    let api = await api_rpx(awb)
    // return api;
    return global_res(api, awb)

}

module.exports = {tracking_rpx, api_rpx}