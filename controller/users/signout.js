module.exports = {
  post: (req, res) => {
    // TODO : 유저가 로그아웃했을 때, session 정보를 없애고, '/'로 redirect할 수 있도록 구현하세요.
    const sess = req.session; // session 정보를 가져온다 ( 이 경우는 데이터를 넘겨주지 않아도 이미 생성된 session값이 존재하기 때문에 생성을 하지않고 데이터를 반환)

    if (sess.userid) {
      // 로그인(세션 생성)이 되지않은 상태에서 불러오면 userid값이 존재하지 않는다
      req.session.destroy(err => {
        // session을 제거하기 위한 함수로 인자는 function을 넘겨주면 된다
        if (err) {
          console.log(err);
        } else {
          res.redirect('/'); // session이 성공적으로 존재하며 session 삭제가 완료되면 클라이언트에서 다시 `${URL}/`로 페이지를 이동시킨다
        }
      });
    } else {
      res.redirect('/');
    }
  }
};
