var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log(' login session body', req.session);
  if (req.session.userId) {
    res.redirect('/home1')
  } else {
    res.render('login', { title: 'Express' });
  }
  // const userId = 1;
});

const users = [{
  id: 1, name: 'alex', email: 'alex@gmail.com', password: '12345'
}]


router.post('/login', function (req, res) {
  console.log('hit login');
  const { email, password } = req.body;
  if (email && password) {
    const user = users.find(user => user.email === email && user.password === password)
    if (user) {
      console.log('userdata', user);
      req.session.userId = user.id
      return res.redirect('/home1');
    }
  }
  res.redirect('/login')
  // if (req.session.userId) {
  //   res.redirect('/home1')
  // } else {

  // }



})



module.exports = router;
