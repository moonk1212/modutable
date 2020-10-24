const express = require('express');
const router = express.Router();
const dbInfo = require('../database');

/* GET home page. */
router.get('/', (req, res) => {
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

router.get('/stores/:storenumber', (req, res) => {
  const stores = [
    { 
      storeId: 'algo',
      title: '누구나 골목: 알고탭하우스', 
      storeName: '알고탭하우스',
      storeInfo: '알고탭하우스는 넓은 창을 통해 조망과 시원하게 트인 공간을 선사합니다. 가게 내 배치되어있는 가지각색의 술병들과 다양한 포스터는 알고 탭만의 감성을 느끼게 해줍니다. 준비되어 있는 다양한 잡지와 책들을 읽으며 시간을 보낼 수 있으며 가게 내의 술, 음료(별도 지불)를 이용할 수 있습니다.',
      address: '서울 광진구 광나루로 17길로10 ',
      openTime: '평일 11:00 ~ 15:00, 18:00 ~ 23:59 토요일 13:00 ~ 0:00 매주 일요일 휴무, 매달 마지막 주 월요일 휴무 ',
      shareTime: '15:00 - 18:00',
      img1: '1',
      img2: '2'
    }
    ,{ 
      storeId: 'gongdae',
      title: '누구나 골목: 공대오빠', 
      storeName: '공대오빠', 
      storeInfo: '공대오빠의 2층과 3층은 다른 분위기의 공간을 제공합니다. 2층은 동그란 테이블과 의자들이 배치되어 함께 둘러앉아 각종 유쾌한 활동들을 할 수 있습니다. 3층은 조용하고 어두운 분위기이며 빔 프로젝터를 이용하여 다 함께 영화를 보는 등 색다른 활동을 할 수 있습니다. 가게 내의 술이나 음료(별도 지불)도 이용 할 수 있습니다.',
      address: '서울 광진구 화양동 번지 2호 111-36 3층',
      openTime: '17:30 ~ 03:00 (매주 일요일 휴무)',
      shareTime: '13:00 ~ 17:00',
      img1: '3', 
      img2: '4'
    }
  ]
  const storeNumber = req.params.storenumber;

  switch (storeNumber) {
    case '0':
      res.render('store2', stores[0]);
      break;
    case '1':
      res.render('store2', stores[1]);
      break;
    default:
      res.render('store2', stores[0]);
  }
})


// get 관리자 페이지
router.get('/admin/:storename', (req, res) => {

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

router.put('/seat-submit', (req, res) => {
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
