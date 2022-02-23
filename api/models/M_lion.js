const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'Kurir_lion';

const Kurir_lion = sequelize.define('lion_dest_3', {
  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  kode: {
    type: Sequelize.STRING,
  },
  kota: {
    type: Sequelize.STRING,
  },
  kecamatan: {
    type: Sequelize.STRING,
  },
  kelurahan: {
    type: Sequelize.INTEGER,
  },
  kabupaten: {
    type: Sequelize.TEXT,
  },
  
 
}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = Kurir_lion;
