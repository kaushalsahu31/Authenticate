const { Sequelize, DataTypes } = require("sequelize");


module.exports.sequelize = new Sequelize(
  {
    dialect: 'sqlite',
    logging: false,
    storage: "./database.sqlite"
  }
);

this.sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

