var MsTranslator = require('mstranslator');
var secret = require('./secret.js');
var express = require('express');
var path = require('path');
var app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, '/views')));
 
var client = new MsTranslator({
  api_key:  secret.API_KEY
}, true);

var params = {
  text: 'How\'s it going?'
  , from: 'en'
  , to: 'es'
};

// Using initialize_token manually. 
client.translate(params, function(err, data) {
  console.log(data);
});

app.get('/', function (req, res) {
  res.render('index');
})

app.listen(3000, function(){
  console.log('Server started on port 3000')
});