const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'Webhook_ninja';

const WebhookNinja = sequelize.define('webhook_ninja', {
  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  awb: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.STRING,
  },
  status_code: {
    type: Sequelize.STRING,
  },
  msg: {
    type: Sequelize.STRING,
  },
  detail_data: {
    type: Sequelize.STRING,
  },
  date_add: {
    type: Sequelize.DATE,
  }
 
}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = WebhookNinja;
