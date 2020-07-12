const express = require('express');
const router = express.Router();
const dbInfo = require('../database');


// dbInfo.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
//   if (err) throw err

//   console.log('The solution is: ', rows[0].solution)
// });

// dbInfo.end();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('mainpage', { title: '누구나 골목' });
});

router.get('/about_ngn', (req, res, next) => {
  res.render('about_ngn', { title: '누구나 골목' });
});

router.get('/mypage', (req, res, next) => {
  let userId='gaga';
  dbInfo.query(`SELECT * FROM user WHERE user_id='${userId}';`, function(err, data){
    if(err) throw err;
    else {
      let user_name = data[0].user_name;
      let user_phone = data[0].user_phone;
      let user_email = data[0].user_email;
      let user_total = data[0].user_rs_total;

      res.render('mypage', { 
        title : '누구나 골목',
        uName : user_name,
        uPhone : user_phone,
        uEmail : user_email,
        uTotal : user_total
      });
    }
  });
});

// compression 이라는 미들웨어 쓰면 데이터 압축해서 전송할 수 있음
// 사용자 많아지면 효율적
// 근데 속도가 많이 느려지려나..? 쓸말...?

module.exports = router;
