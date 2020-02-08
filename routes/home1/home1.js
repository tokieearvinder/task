var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    console.log('home page req session ', req.session);
    if (!req.session.userId) {
        res.redirect('/login');
    } else {
        res.render('home1', { title: 'home1Express' });
    }
});

router.post('/logout', function (req, res) {
    console.log('logout hit')
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/home1')
        }
        res.clearCookie();
        res.redirect('/login')
    })
  })


module.exports = router;
