const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'klink_member_alamat_verify';

const Member = sequelize.define('klink_member_alamat_verify', {
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  id_member: {
    type: Sequelize.STRING,
  },
  jenis_alamat: {
    type: Sequelize.STRING,
  },
  nama_penerima: {
    type: Sequelize.STRING,
  },
  telp: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  alamat: {
    type: Sequelize.STRING,
  },
  provinsi: {
    type: Sequelize.STRING,
  },
  kabupaten: {
    type: Sequelize.STRING,
  },
  kecamatan: {
    type: Sequelize.STRING,
  },
  kelurahan: {
    type: Sequelize.STRING,
  },
  kodepos: {
    type: Sequelize.STRING,
  },
  latitude: {
    type: Sequelize.INTEGER,
  },
  longitude: {
    type: Sequelize.INTEGER,
  },
  
}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = Member;
