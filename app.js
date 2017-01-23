var MsTranslator = require('mstranslator');
var bodyParser = require("body-parser");
var express = require('express');
var secret = require('./secret.js');
var path = require('path');
var app = express();

app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/views')));
 
var client = new MsTranslator({ api_key:  secret.API_KEY }, true);

var params = {
  text: 'How\'s it going?',
  from: 'en',
  to: 'es'
};

// Using initialize_token manually. 
client.translate(params, (err, data) => {
  console.log(data);
});

app.get('/', (req, res) => {
  res.render('index');
})

app.post('/', (req, res) => {
	console.log(req.body);
});

app.listen(3000, function(){
  console.log('Server started on port 3000')
});