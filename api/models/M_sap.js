const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'kurir_sap_13apr20_new_2';

const Kurir_sap = sequelize.define('kurir_sap_13apr20_new_2', {
  
  No: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  provinsi: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
  },
  kecamatan: {
    type: Sequelize.STRING,
  },
  kelurahan: {
    type: Sequelize.STRING,
  },
  kodepos: {
    type: Sequelize.INTEGER,
  },
  is_cod: {
    type: Sequelize.INTEGER,
  },
  tlc_code: {
    type: Sequelize.STRING,
  },
 
}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = Kurir_sap;
