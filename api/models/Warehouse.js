const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'Klink_warehouse_master';

const Warehouse = sequelize.define('klink_warehouse_master', {
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  whcd: {
    type: Sequelize.STRING,
  },
  fullnm: {
    type: Sequelize.STRING,
  },
  addr1: {
    type: Sequelize.STRING,
  },
  addr2: {
    type: Sequelize.STRING,
  },
  addr3: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  tel_hp: {
    type: Sequelize.STRING,
  },
  province: {
    type: Sequelize.STRING,
  },
  kab: {
    type: Sequelize.STRING,
  },
  kec: {
    type: Sequelize.STRING,
  },
  kel: {
    type: Sequelize.STRING,
  },
  postcd: {
    type: Sequelize.STRING,
  },
  latitude: {
    type: Sequelize.INTEGER,
  },
  longitude: {
    type: Sequelize.INTEGER,
  },
  org_sap: {
    type: Sequelize.STRING,
  },
  org_jnt: {
    type: Sequelize.STRING,
  },
  org_jne: {
    type: Sequelize.STRING,
  },
  org_lion: {
    type: Sequelize.STRING,
  },
  client_code: {
    type: Sequelize.STRING,
  },
  
}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = Warehouse;
