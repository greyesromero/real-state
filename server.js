const express = require('express');
const path = require('path');
const history = require('connect-history-api-fallback');
const request = require('request');
const cors = require('cors');
const api_helper = require('./routes/dogs');
var bodyParser = require('body-parser')
const request_promise = require('request-promise');
const app = express();

app.use(cors())

app.use(bodyParser());

// Middleware for serving '/dist' directory
const staticFileMiddleware = express.static(path.join(__dirname + '/dist'));
// // 1st call for unredirected requests 
app.use(staticFileMiddleware);
// Support history api 
app.use(history({
    disableDotRule: true,
    verbose: true,
    rewrites: [
        {from: /api/, to: function(context) {
            return context.parsedUrl.path
        }}
    ]
  }));
// 2nd call for redirected requests
app.use(staticFileMiddleware);

  
app.get('/', function (req, res) {
    res.render(path.join(__dirname + '/dist/index.html'));
});

app.get('/api/ping', function (req, res) {
    res.send("pong")
});

app.post('/api/getToken', cors(), function(req, res) {

    data = req.body

    let payload = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
        <CreateToken xmlns="http://tempuri.org/">
            <APIKey>*CHOOSEMF*2020v1.0</APIKey>
            <AccountNumber>${data.AccountNumber}</AccountNumber>
            <CardNumber>${data.CardNumber}</CardNumber>
            <ExpirationDate>${data.ExpirationMonth}/${data.ExpirationYear}</ExpirationDate>
            <CardholderName>${data.CardholderName}</CardholderName>
            <CVV>${data.CVV}</CVV>
        </CreateToken>
        </soap:Body>
    </soap:Envelope>`;

    let headers = {
        'Content-Type': 'text/xml',
        'SOAPAction': 'http://tempuri.org/CreateToken',
        'Host': 'gateway.merchantprocess.net',
        'User-Agent': 'PostmanRuntime/7.25.0',
        'Authority': 'gateway.merchantprocess.net',
    }

    var options = {
        url: 'https://gateway.merchantprocess.net/tokenV2/TokenWebService.asmx',
        method: 'POST',
        body: payload,
        headers: headers
    };

    res.header('Content-Type', 'text/xml')

    request(options, function (error, response, body) {
        if (!error) {
            console.log(response.body)
            return res.send(response.body);
        } else {
            console.log(error);
        }
    })

});

app.post('/getAPIResponse', function (req, res) {
    var options = {
        url: 'https://choosemyfitness-api.herokuapp.com/api/users/',
        method: 'POST',
    };
  
    
     request(options, function (error, response, body) {

        
         if (!error) {
             // Print out the response body
            
             res.send(response.body);
         } else {
             console.log(error);
         }
     })
})

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
