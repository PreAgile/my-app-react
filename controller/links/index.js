const utils = require('../../modules/utils');

const { urls } = require('../../models');

module.exports = {
  get: (req, res) => {
    urls
      .findAll()
      .then(result => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.sendStatus(204);
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).send(error);
      });
  },
  post: (req, res) => {
    const { url } = req.body;

    if (!utils.isValidUrl(url)) {
      return res.sendStatus(400);
    }

    utils.getUrlTitle(url, (err, title) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }

      urls
        .findOrCreate({
          where: {
            url: url
          },
          defaults: {
            title: title
          }
        })
        .then(([result, created]) => {
          if (!created) {
            return res.status(201).json('Already exists');
          }
          res.status(201).json(result); // Created
        })
        .catch(error => {
          console.log(error);
          res.sendStatus(500); // Server error
        });
    });
  }
};
