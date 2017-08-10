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
  res.render('g-cloud/search')
})

// add your routes here

module.exports = router
