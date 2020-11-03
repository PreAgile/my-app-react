const { users } = require('../../models');

module.exports = {
  get: (req, res) => {
    // TODO : 유저의 session을 이용하여, 데이터베이스에 있는 정보를 제공하도록 구현하세요.
    const sess = req.session;
    if (sess.userid) {
      // userid를 따로 body나 query, param에 넣지 않아도 서버 자체의 세션에 저장된 userid를 가져와 데이터를 반환한다
      users
        .findOne({
          where: {
            id: sess.userid
          }
        })
        .then(result => {
          if (result) {
            res.status(200).json(result);
          } else {
            res.sendStatus(204);
          }
        })
        .catch(error => {
          res.sendStatus(500);
        });
    } else {
      res.status(401).send('need user session');
    }
  }
};
