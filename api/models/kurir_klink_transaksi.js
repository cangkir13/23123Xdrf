const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'kurir_klink_transaksi';

const kurir_klink_transaksi = sequelize.define('klink-transaksi', {
  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  whcd: {
    type: Sequelize.STRING,
  },
  warehouse: {
    type: Sequelize.STRING,
  } ,
  idorder: {
    type: Sequelize.STRING,
  },
  pengirim: {
    type: Sequelize.STRING,
  },
  tlpn_pengirim: {
    type: Sequelize.STRING,
  },
  alamat_pengirim:{
    type: Sequelize.STRING,
  },
  penerima:{
    type: Sequelize.STRING,
  },
  tlpn_penerima: {
    type: Sequelize.STRING,
  },
  alamat_penerima:{
    type: Sequelize.STRING,
  },
  nama_barang:{
    type: Sequelize.STRING,
  },
  jumlah:{
    type: Sequelize.INTEGER,
  },
  berat:{
    type: Sequelize.FLOAT,
  },
  harga_barang:{
    type: Sequelize.INTEGER,
  },
  is_cod:{
    type: Sequelize.INTEGER,
  },
  create_at:{
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  
}, {  tbl, timestamps:false, freezeTableName:true });

kurir_klink_transaksi.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.id;

  return values;
};

module.exports = kurir_klink_transaksi;
