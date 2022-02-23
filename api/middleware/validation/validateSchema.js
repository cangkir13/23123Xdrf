const Joi = require('@hapi/joi');

const schemas = { 
  createUser: Joi.object().keys({ 
    Users: Joi.array().required().items(Joi.string().required())
  }),

  createTask: Joi.object().keys({ 
  	user: Joi.string().required(),
    tasks: Joi.array().required().items(Joi.string().required())
  }) ,

  assignTask: Joi.object().keys({ 
    Users: Joi.array().required().items(Joi.string().required())
  }),

  unassignTask: Joi.object().keys({ 
    user: Joi.string().required(),
    tasks: Joi.array().required().items(Joi.string().required())
  }) ,

  tracking: Joi.object().keys({ 
    ekspedisi: Joi.string().required(),
    awb: Joi.string().required()
  }) ,

  // CRUD DRIVER
  GetDriver: Joi.object().keys({ 
    whcd: Joi.string().required(),
  }) ,

  addDriver: Joi.object().keys({ 
    whcd: Joi.string().required(),
    nama: Joi.string().required(),
    tlpn: Joi.string().required(),
  }) ,

  updateDriver: Joi.object().keys({ 
    whcd: Joi.string().required(),
    drivecode:Joi.string().required(),
    nama: Joi.string().required(),
    tlpn: Joi.string().required(),
  }) ,

  updateDriveStatus: Joi.object().keys({
    drivecode:Joi.string().required(),
    status: Joi.number().required(),
  }) ,

  // end CRUD DRIVER

  // add history tracking klink-driver
  DriveHistoryStatus: Joi.object().keys({
    whcd:Joi.string().required(),
    idorder:Joi.string().required(),
    status: Joi.string().required(),
    status_code:Joi.number().required(),
    drivercode:Joi.string().allow('')
  }) ,

  // crud data location WAREHOUSE

  // get wh location 
  GetWHLocPrice:Joi.object().keys({
    whcd:Joi.string().required(),
  }),
  UpdateStatusCOD: Joi.object().keys({
    whcd:Joi.string().required(),
    id:Joi.number().required(),
    price: Joi.number().required(),
    is_cod:Joi.number().required(),
    status:Joi.number().required(),
  }) ,

  AddLocationKlinkEx:Joi.object().keys({
    whcd:Joi.string().required(),
    provinsi:Joi.string().required(),
    kabupaten:Joi.string().required(),
    kecamatan:Joi.string().required(),
    kelurahan:Joi.string().required(),
    kodepos:Joi.string().required(),
    price: Joi.number().required(),
    is_cod:Joi.number().required(),
  }) ,

  // end crud middleware wh price location
  
  // setting couriers of warehouse
  SetCourierWH: Joi.object().keys({
    whcd:Joi.string().required(),
    loccd:Joi.string().required(),
    active: Joi.number().required(),
    jne:Joi.number().required(),
    jnt:Joi.number().required(),
    sap: Joi.number().required(),
    rpx:Joi.number().required(),
    pos:Joi.number().required(),
    lion_parcel: Joi.number().required(),
    klink_express:Joi.number().required(),
    klink_driver:Joi.number().required(),
    sicepat: Joi.number().required(),
    gosend:Joi.number().required(),
    atha:Joi.number().required(),
  }) ,
  
  // define all the other schemas below 
}; 
module.exports = schemas;