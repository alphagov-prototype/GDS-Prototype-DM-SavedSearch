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
  res.render('g-cloud/search/index', req.query); 
})

// G-Cloud live search
router.get('/g-cloud/search/live', function(req, res){
  var path = req.url.replace('/g-cloud/search/live','/g-cloud/search');
  var url = `https://www.digitalmarketplace.service.gov.uk${path}&live-results=true`;
  url = url.replace('lot=&','');
  var getJSON = require('get-json');
  getJSON(url, function(error, response) {
    res.header('Content-Type', 'application/json');
    res.send(response);
  });
})

// G-Cloud save-search page
router.get('/g-cloud/search/save-search', function (req, res) {
  var search_url = req.query.search_url;
  var existing_searches = req.session.saved_searches;
  res.render('g-cloud/search/save-search/index', { search_url: search_url, existing_searches: req.session.saved_searches }); 
})

// G-Cloud save-search page
router.post('/g-cloud/search/save-search', function (req, res) {

  var guidGenerator = function() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  };

  var existing_search = req.body.existing_search;
  var date_now = Date.now();
  
  var data = {
    name: req.body.search_name,
    search_url: req.body.search_url,
    last_modified: date_now
  };

  if ( !req.session.saved_searches ) req.session.saved_searches = {};

  if ( existing_search && existing_search != '' )
  {
    req.session.saved_searches[ existing_search ].search_url = data.search_url;
    req.session.saved_searches[ existing_search ].last_modified = data.last_modified;
  }
  else
  {
    var new_id = guidGenerator();
    data.created_date = date_now;
    req.session.saved_searches[new_id] = data;
  }

  res.redirect('/buyers/saved-searches')
})

// G-Cloud save-search page
router.get('/buyers/saved-searches', function (req, res) {
  var existing_searches = req.session.saved_searches;
  res.render('buyers/saved-searches/index', { existing_searches: req.session.saved_searches }); 
})



module.exports = router
