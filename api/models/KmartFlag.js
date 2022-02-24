const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const trackingsend = require('./Tracking_send');

const tbl = 'kmart_awb';

const kmart_awb = sequelize.define('kmart_awb', {
  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  awb: {
    type: Sequelize.STRING,
  },
  ekspedisi:{
    type: Sequelize.STRING,
  },
  id_member:{
    type: Sequelize.STRING,
  },
  message: {
    type: Sequelize.ENUM('PROSES', 'SUCCESS', 'RETUR'),
  },
  update_flag:{
    type: Sequelize.BOOLEAN
  },
  webhook_flag: {
    type: Sequelize.BOOLEAN,
  },
  status_webhook: {
    type: Sequelize.BOOLEAN,
  },
  response_webhook: {
    type: Sequelize.STRING,
  },
  createdAt:{
    type: Sequelize.DATEONLY,
  },
  updatedAt: {
    type: Sequelize.DATEONLY,
  },
  
}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = kmart_awb;
