const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'Kurir_jne';

const Kurir_jne = sequelize.define('kurir_jne_30012020', {
  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  provinsi: {
    type: Sequelize.STRING,
  },
  nama_kab_kota: {
    type: Sequelize.STRING,
  },
  kecamatan: {
    type: Sequelize.STRING,
  },
  kelurahan: {
    type: Sequelize.STRING,
  },
  kode_pos: {
    type: Sequelize.INTEGER,
  },
  kodingan_acuan:{
    type: Sequelize.STRING
  },
  coding_destination:{
    type: Sequelize.STRING
  }
 
}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = Kurir_jne;
