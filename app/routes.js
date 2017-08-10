var express = require('express')
var router = express.Router()


// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

router.post('/', function (req, res) {
  if ( req.query.profile_completed == "true" )
  {
    req.session.profile_completed = true;
  }
  res.render('index')
})

// Route index page
router.get('/login', function (req, res) {
  res.render('login/index')
})

router.post('/login', function (req, res) {
  req.session.authenticated = true;
  res.redirect('/')
})

router.get('/logout', function (req, res) {
  req.session.authenticated = false;
  res.redirect('/login')
})

router.get('/buyers', function (req, res) {
  if ( req.session.authenticated !== true )
  {
    return res.redirect('/login')
  }
  res.render('buyers/index')
})


router.get('/buyers/create', function (req, res) {
  res.render('login/register')
})

router.post('/buyers/create', function (req, res) {
  res.render('login/registration_summary')
})

router.get('/create-user', function (req, res) {
  req.session.authenticated = true;
  res.render('login/create_user')
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
