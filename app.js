var MsTranslator = require('mstranslator');
var bodyParser = require("body-parser");
var express = require('express');
var secret = require('./secret.js');
var path = require('path');
var app = express();

// Allow Heroku to set the port
var port = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/views')));
 
var client = new MsTranslator({ api_key:  secret.API_KEY }, true);

var params = {
  text: "",
  from: 'en',
  to: 'es'
};

app.get('/', (req, res) => {
  res.render('index', {params: params, data: ""});
})

app.post('/', (req, res) => {
	// Initialize paramaters from user data
	params.text = req.body.userText;
	params.from = req.body.lang1;
	params.to = req.body.lang2;
	// Using initialize_token manually. 
	client.translate(params, (err, data) => {
	  if(err){
	      console.log(err);
	  } else {
	      // Redirect back to page
	      res.render('index', {params: params, data: data});
	  }
	});
});

app.listen(port, function(){
  console.log('Server started and running on http://localhost:' + port)
});