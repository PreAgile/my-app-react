'use strict';

const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const urls = sequelize.define(
    'urls',
    {
      url: DataTypes.STRING,
      code: DataTypes.STRING,
      title: DataTypes.STRING,
      visits: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      hooks: {
        afterValidate: (data, options) => {
          var shasum = crypto.createHash('sha1');
          shasum.update(data.url);
          data.code = 'D' + shasum.digest('hex').slice(0, 5);
        }
      }
    }
  );

  urls.associate = function (models) { };
  return urls;
};
