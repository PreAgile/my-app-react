'use strict';

const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      hooks: {
        beforeCreate: (data, option) => {
          var shasum = crypto.createHmac('sha512', 'thisismysecretkey');
          shasum.update(data.password);
          data.password = shasum.digest('hex');
        },
        beforeFind: (data, option) => {
          if (data.where.password) {
            var shasum = crypto.createHmac('sha512', 'thisismysecretkey');
            shasum.update(data.where.password);
            data.where.password = shasum.digest('hex');
          }
        }
      }
    }
  );
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};
