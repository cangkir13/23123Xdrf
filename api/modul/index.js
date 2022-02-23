const jne = require('./globawb/jne').tracking_jne
const jnt = require('./globawb/jnt').tracking_jnt
const sap = require('./globawb/sap').tracking_sap
const klink_driver = require('./globawb/klink_driver')
const ninja = require('./globawb/ninja');
const gosend = require('./globawb/gosend').tracking_gosend
async function ekspedisiHistory(ekspedisi, awb) {
    switch (ekspedisi) {
        case 'jnt':
            return await jnt(awb)
        case 'jne':
            return await jne(awb)
        case 'sap':
            return await sap(awb)
        case 'klink-driver':
            return await klink_driver(awb)
        case 'ninja':
            return await ninja(awb)
        case 'gosend':
            return await gosend(awb)
        default:
            return false
    }
}

module.exports = ekspedisiHistory