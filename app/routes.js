var express = require('express')
var router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// Route index page
router.get('/g-cloud', function (req, res) {
  res.render('g-cloud/index')
})

router.get('/g-cloud/search', function (req, res) {

  var stage = req.query.stage;

  switch( stage )
  {
    case "2":
      res.render('g-cloud/search_stage2');
      break;
    case "3":
      res.render('g-cloud/search_stage3');
      break;
    default:
      res.render('g-cloud/search_stage1');
      break;
  }


  
})

// add your routes here

module.exports = router
