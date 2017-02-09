var express = require('express');
var router = express.Router();


router.get('/getApi', function(req, res, next) {
  var query = req.query;

  var data2 = {
    zhuzhu: '傻蛋',
    maomao: '猫猫最聪明'
  }
  var data = {
    zhuzhu:'帅气',
    mm: '猫猫是傻蛋'
  }

  if(query.zhuzhu == '1'){
    res.json(data2)
  }else {
    res.json(data);
  }
})

router.post('/postApi', function(req, res, next) {
  var body = req.body;

  var data2 = {
    zhuzhu: '傻蛋',
    maomao: '猫猫最聪明'
  }
  var data = {
    zhuzhu:'帅气',
    mm: '猫猫是傻蛋'
  }

  if(body.zhuzhu == '1'){
    res.json(data2)
  }else {
    res.json(data);
  }
})

module.exports = router;
