const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'Klink-tracking';

const Klink_tracking = sequelize.define('klink-tracking', {
  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idorder: {
    type: Sequelize.STRING,
  },
  status_code: {
    type: Sequelize.STRING,
  },
  history: {
    type: Sequelize.STRING,
  },
  create_at: {
    type: Sequelize.DATE,
  },
 
}, {  tbl, timestamps:false, freezeTableName:true });


module.exports = Klink_tracking;
