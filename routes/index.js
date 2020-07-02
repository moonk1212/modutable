var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mainpage', { title: '누구나 골목' });
});

router.get('/about_ngn', function(req, res, next) {
  res.render('about_ngn', { title: '누구나 골목' });
});

router.get('/mypage', function(req, res, next){
  res.render('mypage', { title : '누구나 골목'});
});
module.exports = router;
