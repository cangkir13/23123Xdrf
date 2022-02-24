const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'Transaksi_send';

const Transaksi_send = sequelize.define('tracking_send', {
  
  id_tracking: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  token:{
    type: Sequelize.STRING,
  },
  id_member: {
    type: Sequelize.STRING,
  },
  jenis_alamat: {
    type: Sequelize.STRING,
  },
  awb: {
    type: Sequelize.STRING,
  },
  ekspedisi: {
    type: Sequelize.STRING,
  },
  id_order: {
    type: Sequelize.STRING,
  },
  is_cod: {
    type: Sequelize.INTEGER,
  },
  finish: {
    type: Sequelize.INTEGER,
  },
  return: {
    type: Sequelize.INTEGER,
  },
  create_at: {
    type: Sequelize.DATE,
  },
  update_at: {
    type: Sequelize.DATE,
  },

 
}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = Transaksi_send;
