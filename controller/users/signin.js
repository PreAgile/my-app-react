const { users } = require('../../models');

module.exports = {
  post: (req, res) => {
    // TODO : 유저가 로그인을 했을 때, 회원정보를 데이터베이스에서 확인하고, 회원의 id를 session에 담아주도록 구현하세요.
    const { email, password } = req.body;
    var sess = req.session; // req.session data를 확인 (생성 또는 기존 session이 존재하면 가져온다)
    users
      .findOne({
        where: {
          email: email,
          password: password
        }
      })
      .then(result => {
        if (result === null) {
          // 비밀번호나 이메일이 틀렸을 경우 404(Not Found) 반환
          res.status(404).send('unvalid user');
        } else {
          sess.userid = result.id; // 찾은 유저 id 값을 session userid 값을 매핑

          res.status(200).json({
            id: result.id
          });
        }
      })
      .catch(err => {
        res.status(404).send(err);
      });
  }
};
