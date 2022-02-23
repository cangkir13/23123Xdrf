const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'klink_history';

const klink_history = sequelize.define('klink-tracking', {
  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idorder: {
    type: Sequelize.STRING,
  },
  status_code: {
    type: Sequelize.INTEGER,
  },
  history: {
    type: Sequelize.STRING,
  },
  create_at:{
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  
}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = klink_history;
