const trackingklink_driv = require('../../models/Klink_tracking')

const klink_driver = async(awb) => {
    let historyK = await trackingklink_driv.findOne({
        where:{
          idorder:awb
        }
      })
    
    if (!historyK) {
        return {
            status:false,
            ekspedisi,
            awb:null,
            status_code:'404',
            msg:'Invalid AWB Pleace Check and try again'
        }
    }else{
        return JSON.parse(historyK.history)
    }


}

module.exports = klink_driver