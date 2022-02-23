const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'trackingjobsave';

const Trackingjobsave = sequelize.define('trackingjobsave', {
  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ekspedisi: {
    type: Sequelize.STRING,
  },
  awb: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.STRING,
  },
  status_code:{
    type: Sequelize.INTEGER
  },
  msg: {
    type: Sequelize.STRING,
  },
  create_at: {
    type: Sequelize.DATE,
  },
  knet_flag: {
    type: Sequelize.INTEGER,
  },
  create_at: {
    type: Sequelize.DATE,
  },
  res: {
    type: Sequelize.TEXT,
  },
  thook: {
    type: Sequelize.INTEGER,
  },
  track: {
    type: Sequelize.INTEGER,
  },
  date_hit: {
    type : Sequelize.DATE
  },
  res_bu: {
    type: Sequelize.TEXT,
  },
 
}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = Trackingjobsave;
