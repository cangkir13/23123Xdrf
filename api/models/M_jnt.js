const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'Kurir_jnt';

const Kurir_jnt = sequelize.define('kurir_jnt', {
  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  PROVINSI: {
    type: Sequelize.STRING,
  },
  'KAB/KOTA': {
    type: Sequelize.STRING,
  },
  KECAMATAN: {
    type: Sequelize.STRING,
  },
  KELURAHAN: {
    type: Sequelize.STRING,
  },
  KODEPOS: {
    type: Sequelize.INTEGER,
  },
  origin_name:{
    type: Sequelize.STRING
  },
  destination_name:{
    type: Sequelize.STRING
  },
  tlc_code:{
    type: Sequelize.STRING
  }
 
}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = Kurir_jnt;
