const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db')

const User = sequelize.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  password: {
   
    type: DataTypes.STRING,
    allowNull: false,
    // allowNull defaults to true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name

});

// `sequelize.define` also returns the model
async function createUserTable() {
    console.log(User === sequelize.models.User); // true
    await User.sync({ force: true });
    console.log("The table for the User model was just (re)created!");
}
// createUserTable()
module.exports = User