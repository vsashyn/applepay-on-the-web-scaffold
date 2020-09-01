const express = require('express');
const path = require('path')
const request = require('request');
const bodyParser = require('body-parser')
const fs = require('fs');
const http = require('http');
const https = require('https');

require('dotenv').config();
const privateKey  = fs.readFileSync('./sslcert/key.pem', 'utf8'); // https
const certificate = fs.readFileSync('./sslcert/cert.pem', 'utf8'); // https
const credentials = {key: privateKey, cert: certificate};
const MERCHANT_ID_CERT = fs.readFileSync('./sslcert/validate-merchant-cert.p12');
const STORE_NAME = 'store name'

const app = express();
app.use(bodyParser.json());


app.get('/', (req, res) => {
  var options = {
    root: path.join(__dirname),
  }
  res.sendFile('./index.html', options, error => {
    if(error) return res.send(error)
  });
})
app.get('/dist/bundle.js', (req, res) => {
  var options = {
    root: path.join(__dirname)
  }
  res.sendFile('./dist/bundle.js', options, error => {
    if(error) return res.send(error)
  });
})
app.get('/styles.css', (req, res) => {
  var options = {
    root: path.join(__dirname)
  }
  res.sendFile('./styles.css', options, error => {
    if(error) return res.send(error)
  });
})

app.post('/validate', (req, res) => {
  const options = {
    url: req.body.url,
    headers: {
      'content-type': 'application/json',
    },
    agentOptions: {
      pfx: MERCHANT_ID_CERT,
      passphrase: process.env.MERCHANT_ID_CERT_PASS,
    },
    json: {
      merchantIdentifier: process.env.MERCHANT_ID,
      displayName: STORE_NAME,
      initiative: 'web',
      initiativeContext: req.hostname,
    },
  };
  request.post(options, (err, response, body) => {
    if (err) return res.send(err)
    return res.send({
      validationResponse: body,
    });
  });
})

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(80);
httpsServer.listen(443);
