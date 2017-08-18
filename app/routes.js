var express = require('express')
var router = express.Router()

// home page
router.get('/', function (req, res) {
  res.render('index')
})

// home page login redirect post
router.post('/', function (req, res) {
  if ( req.query.profile_completed == "true" )
  {
    req.session.profile_completed = true;
  }
  res.render('index')
})

// login page
router.get('/login', function (req, res) {
  res.render('login/index')
})

//login post
router.post('/login', function (req, res) {
  req.session.authenticated = true;
  res.redirect('/')
})

//logout page
router.get('/logout', function (req, res) {
  req.session.authenticated = false;
  res.redirect('/login')
})

//buyer dashboard
router.get('/buyers', function (req, res) {
  if ( req.session.authenticated !== true )
  {
    return res.redirect('/login')
  }
  res.render('buyers/index')
})

//buyer register page
router.get('/buyers/create', function (req, res) {
  res.render('login/register')
})

//buyer register summary
router.post('/buyers/create', function (req, res) {
  res.render('login/registration_summary')
})

//buyer create user screen
router.get('/create-user', function (req, res) {
  req.session.authenticated = true;
  res.render('login/create_user')
})

// G-Cloud home page
router.get('/g-cloud', function (req, res) {
  res.render('g-cloud/index')
})

// G-Cloud search page
router.get('/g-cloud/search', function (req, res) {
  var lot = req.query.lot;
  var category = req.query.serviceCategories;  
  res.render('g-cloud/search', {lot: lot, category: category}); 
})

// G-Cloud live search
router.get('/g-cloud/search/live', function(req, res){
  var path = req.url.replace('/g-cloud/search/live','/g-cloud/search');
  var url = `https://www.digitalmarketplace.service.gov.uk${path}&live-results=true`;
  var getJSON = require('get-json');
  getJSON(url, function(error, response) {
    res.header('Content-Type', 'application/json');
    res.send(response);
  });
})


module.exports = router
