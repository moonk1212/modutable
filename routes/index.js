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
  let countSeats = 0;
  
  dbInfo.query(`SELECT occupied FROM remaining_seats;`, (err, data) => {
    if (err) throw err;
    else {
      countSeats = data[0].occupied + data[1].occupied;
      res.render('mainpage', { 
        title: '누구나 골목',
        remainingSeats: countSeats
      });
    }
  });
});

router.get('/about_ngn', (req, res, next) => {
  res.render('about_ngn', { title: '누구나 골목' });
});

router.get('/algo', (req, res, next) => {
  res.render('store', { title: '누구나 골목: 알고탭하우스'});
});
router.get('/gongdae', (req, res, next) => {
  res.render('store2', { title: '누구나 골목: 공대오빠'});
});

router.get('/admin/:storename', (req, res, next) => {

  let storeName = req.params.storename;
  let storeData;
  let seatNum; // 가게별 좌석 갯수

  if (storeName !== 'gongdae' && storeName !== 'algo') throw err; 
  else {
    if(storeName === 'gongdae') storeName += '2';

    dbInfo.query(`SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = '${storeName}_store_tbl';`, (err, data) => {
      if(err) throw err;
      else { 
        seatNum = data[0];
        seatNum = seatNum[Object.keys(seatNum)[0]] - 1;
      }
    });
    dbInfo.query(`SELECT * FROM ${storeName}_store_tbl;`, (err, data) => {
      if(err) throw err;
      else{
        storeData = data[0];
        res.render('admin', { 
          title: '누구나 골목 :: 관리자 페이지',
          storeName : storeName,
          seatNum : seatNum,
          storeData : storeData
        });
      }
    });
  }
});

router.post('/seat_submit', (req, res) => {
  // 가게별 여석 수 테이블
  let seatCount = req.body.seatcount;
  delete req.body.seatcount;

  // 가게 좌석 정보 테이블
  let storeName = req.body.storename;
  delete req.body.storename;
  let numOfSeats = Object.keys(req.body).length;
  let qKey = Object.keys(req.body);
  let qValue = "UPDATE `" + storeName + "_store_tbl` SET"; // 가게 좌석 업데이트할 쿼리문

  seatCount = numOfSeats - seatCount;

  let numQuery = "UPDATE `remaining_seats` SET occupied=" + seatCount + " WHERE store_name='" + storeName + "';"; // 가게 여석 개수 표시하는 테이블을 업데이트를 위한 쿼리문

  let tmp = req.body;
  let tmpVal = tmp[`${qKey[0]}`];
  qValue += ` ${storeName}_seat_1='${tmpVal}'`;

  for (let i = 2; i < numOfSeats + 1; i++) {
    tmpVal = tmp[`${qKey[i-1]}`];
    qValue += `, ${storeName}_seat_${i}='${tmpVal}'`;
  }
  qValue += ';';
  // console.log(qValue);

  dbInfo.query(qValue, (err, data) => {
    if (err) throw err
  });

  dbInfo.query(numQuery, (err, data) => {
    if (err) throw err;
    else res.json('좌석 업데이트 완료');
  });
});

router.get('/seats/:storename', (req, res) => {
  /*
  공대오빠 2,3층 = gongdae
  진맥 = jinmac
  치킨처럼 = likechicken
  알고탭하우스 = algo
  */
  let storeName = req.params.storename;
  let storeData;
  let seatNum; // 가게별 좌석 갯수

  if (storeName !== 'gongdae' && storeName !== 'algo') throw err; 
  else {
    if(storeName === 'gongdae') storeName += '2';

    dbInfo.query(`SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name = '${storeName}_store_tbl';`, (err, data) => {
      if(err) throw err;
      else { 
        seatNum = data[0];
        seatNum = seatNum[Object.keys(seatNum)[0]] - 1;
      }
    });
    dbInfo.query(`SELECT * FROM ${storeName}_store_tbl;`, (err, data) => {
      if(err) throw err;
      else{
        storeData = data[0];
        // console.log(storeData);
        // console.log(Object.values(storeData));
        res.render('storeseats', { 
          title: `누구나 골목 :: 이용 가능 좌석 - ${storeName}`,
          storeName : storeName,
          seatNum : seatNum,
          storeData : Object.values(storeData)
        });
      }
    });
  }
});
// compression 이라는 미들웨어 쓰면 데이터 압축해서 전송할 수 있음
// 사용자 많아지면 효율적
// 근데 속도가 많이 느려지려나..? 쓸말...?

module.exports = router;
