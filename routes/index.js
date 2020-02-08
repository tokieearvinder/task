var express = require('express');
var router = express.Router();
var NodeGeocoder = require('node-geocoder');


var options = {
  provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyB5K8WJMTe5z7DTSQ4pcIDjsSOLDuxORIM', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/home', function (req, res) {
  var params = req.body;
  console.log('params', params)
  geocoder.reverse({ lat: params.lat, lon: params.lng }, function (err, response) {
    if (err) {
      console.log('Error', err)
    } else {
      console.log('address response', response[0].formattedAddress);
    }
  });
  res.send('success')
})

module.exports = router;
