const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tbl = 'Klink_driver';

const Klink_driver = sequelize.define('klink-driver', {
  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  whcd: {
    type: Sequelize.STRING,
  },
  driver_code: {
    type: Sequelize.STRING,
  },
  nama: {
    type: Sequelize.STRING,
  },
  tlpn: {
    type: Sequelize.STRING,
  },
  active: {
    type: Sequelize.INTEGER,
  },
  create_at: {
    type: Sequelize.DATE,
    defaultValue:Sequelize.NOW
  },
  update_at:{
    type: Sequelize.DATE,
    defaultValue:Sequelize.NOW
  }
 
}, {  tbl, timestamps:false, freezeTableName:true });

Klink_driver.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());

  delete values.id;
  delete values.create_at;
  delete values.update_at;

  return values;
};

module.exports = Klink_driver;
