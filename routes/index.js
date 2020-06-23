var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mainpage', { title: '누구나 골목' });
});

module.exports = router;
