const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'Kurir_dc_history';

const Kurir_dc_history = sequelize.define('kurir_dc_history', {
  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_order: {
    type: Sequelize.INTEGER,
  },
  id_driver: {
    type: Sequelize.STRING
  },
  status_last : {
    type: Sequelize.STRING
  },
  code_last : {
    type: Sequelize.ENUM('201', '101', '200', '402')
  },
  history : {
    type: Sequelize.TEXT
  },
  update_at : {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  new_awb: {
    type: Sequelize.STRING
  },
  new_kurir: {
    type: Sequelize.STRING
  }
  
}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = Kurir_dc_history;
