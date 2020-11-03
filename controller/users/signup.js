const { users } = require('../../models');

module.exports = {
  post: (req, res) => {
    // TODO : 유저가 회원가입을 했을 때, 회원정보를 데이터베이스에 저장하도록 구현하세요.
    const { email, password, username } = req.body;

    users
      .findOrCreate({
        where: {
          email: email
        },
        defaults: {
          password: password,
          username: username
        }
      })
      .then(async ([user, created]) => {
        if (!created) {
          return res.status(409).send('Already exists user');
        }
        const data = await user.get({ plain: true });
        res.status(200).json(data);
      });
  }
};
