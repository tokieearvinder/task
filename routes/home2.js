var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('home2', { title: 'home2Express' });
});

module.exports = router;
