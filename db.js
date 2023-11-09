const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('symmeenb_amlantestdb', 'symmeenb_amlancg', '8f*L{f[Aph?]', {
    host: '103.21.59.22',
    dialect: 'mysql',
});

module.exports = sequelize;
