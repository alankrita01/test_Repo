const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'expense','root','mysql123',{
        dialect : 'mysql',
        host : 'localhost'
    }
);

module.exports = sequelize;