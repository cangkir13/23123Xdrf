const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'Transaksi_pesanan_detail';

const Transaksi_pesanan_detail = sequelize.define('transaksi_pesanan_detail', {
  
  id_rec: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  idmember: {
    type: Sequelize.STRING,
  },
  jenis_alamat: {
    type: Sequelize.STRING,
  },
  kurir: {
    type: Sequelize.STRING,
  },
  awb: {
    type: Sequelize.STRING,
  },
  detail_paket: {
    type: Sequelize.STRING,
  },
  origin: {
    type: Sequelize.STRING,
  },
  destination: {
    type: Sequelize.INTEGER,
  },
  date_add: {
    type: Sequelize.INTEGER,
  },
 
}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = Transaksi_pesanan_detail;
