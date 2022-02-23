const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'Save_data_tracking';

const Save_data_tracking = sequelize.define('save_data_tracking', {
  
id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  awb: {
    type: Sequelize.STRING,
  },
  ekspedisi: {
    type: Sequelize.STRING,
  },
  last_status: {
    type: Sequelize.STRING,
  },
  last_status_code: {
    type: Sequelize.STRING,
  },
  detail: {
    type: Sequelize.TEXT,
  },
  save_at: {
    type: Sequelize.DATE,
  },
  

 
}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = Save_data_tracking;
