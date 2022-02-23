const {tracking_jnt} = require('./jnt');
const {tracking_sap} = require('./sap');
const {tracking_jne} = require('./jne');
const {tracking_rpx} = require('./rpx');
const {tracking_lion} = require('./lion');
const {tracking_klink} = require('./klink');
const {tracking_sicepat} = require('./sicepat');
const {tracking_pos} = require('./pos');
const {tracking_gosend} = require('./gosend');
const trackingklink_driv = require('./klink_driver');
const tracking_ninja = require('./ninja');
const tracking_dc = require('./dc_express')

module.exports = {
    jnt: tracking_jnt,
    sap: tracking_sap,
    jne: tracking_jne,
    rpx: tracking_rpx,
    lion_parcel: tracking_lion,
    klink_express: tracking_klink,
    sicepat: tracking_sicepat,
    pos: tracking_pos,
    gosend: tracking_gosend,
    'klink-driver': trackingklink_driv,
    ninja: tracking_ninja,
    dc_express : tracking_dc
}