const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'kode_pos';

const KodePos = sequelize.define('kode_pos', {
  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  province: {
    type: Sequelize.STRING,
  },
  city_type: {
    type: Sequelize.STRING,
  },
    city_kab_name: {
    type: Sequelize.STRING,
  },
  kec_subdistrict: {
    type: Sequelize.STRING,
  },
  kel_village: {
    type: Sequelize.STRING,
  },
  post_code: {
    type: Sequelize.INTEGER,
  },
   post_code_upd: {
    type: Sequelize.INTEGER,
  },
  lat:{
    type: Sequelize.STRING
  },
  long:{
    type: Sequelize.STRING
  },
  remarks:{
    type: Sequelize.STRING
  },
  last_update:{
    type: Sequelize.STRING
  },
  key_api:{
    type: Sequelize.STRING
  }
 
}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = KodePos;
