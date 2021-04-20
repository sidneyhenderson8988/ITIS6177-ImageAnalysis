'use strict';

const request = require('request');
const express = require('express');
const app = express();
const port = 3000;
const async = require('async');
const fs = require('fs');
const https = require('https');
const path = require("path");
const createReadStream = require('fs').createReadStream
const sleep = require('util').promisify(setTimeout);
const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;
const bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/**
 * AUTHENTICATE
 * This single client is used for all examples.
 */
const subscriptionKey = '951b2e48327a446486828a2d84fe2ddf';
const endpoint = 'https://imageprojectsidney.cognitiveservices.azure.com/';

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': subscriptionKey } }), endpoint);

 /* IMAGE SPECIFICATIONS: 
  The image must be presented in JPEG, PNG, GIF, or BMP format
  The file size of the image must be less than 4 megabytes (MB)
  The dimensions of the image must be greater than 50 x 50 pixels
*/

//Endpoint used to describe an images categories and color.
app.post('/describeImage', function (req, res) {

  var uriBase = endpoint + 'vision/v3.1/analyze';
  const imageUrl = req.body.imageUrl

  // Request parameters.
  const params = {
      'visualFeatures': 'Categories,Description,Color',
      'details': '',
      'language': 'en'
  };

const options = {
    uri: uriBase,
    qs: params,
    body: '{"url": ' + '"' + imageUrl + '"}',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
};

  request.post(options, (error, response, body) => {
    if (error) {
      console.log('Error: ', error);
      return;
    }
    let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
    
    res.end(jsonResponse);
  });
})

//Endpoint used to find brands and colors.
app.post('/describeBrand', function (req, res) {

  var uriBase = endpoint + 'vision/v3.1/analyze';
  const imageUrl = req.body.imageUrl

  // Request parameters.
  const params = {
      'visualFeatures': 'Description,Brands',
      'details': '',
      'language': 'en'
  };

const options = {
    uri: uriBase,
    qs: params,
    body: '{"url": ' + '"' + imageUrl + '"}',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
};

  request.post(options, (error, response, body) => {
    if (error) {
      console.log('Error: ', error);
      return;
    }
    let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
    
    res.end(jsonResponse);
  });
})

//Endpoint used to describe and detect faces.
app.post('/detectFaces', function (req, res) {

  var uriBase = endpoint + 'vision/v3.1/analyze';
  const imageUrl = req.body.imageUrl

  // Request parameters.
  const params = {
      'visualFeatures': 'Description,Faces',
      'details': '',
      'language': 'en'
  };

const options = {
    uri: uriBase,
    qs: params,
    body: '{"url": ' + '"' + imageUrl + '"}',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
};

  request.post(options, (error, response, body) => {
    if (error) {
      console.log('Error: ', error);
      return;
    }
    let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
    
    res.end(jsonResponse);
  });
})

//Endpoint used to detect celebrities.
app.post('/detectCelebrities', function (req, res) {

  var uriBase = endpoint + 'vision/v3.1/analyze';
  const imageUrl = req.body.imageUrl

  // Request parameters.
  const params = {
      'visualFeatures': 'Description',
      'details': 'Celebrities',
      'language': 'en'
  };

const options = {
    uri: uriBase,
    qs: params,
    body: '{"url": ' + '"' + imageUrl + '"}',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
};

  request.post(options, (error, response, body) => {
    if (error) {
      console.log('Error: ', error);
      return;
    }
    let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
    
    res.end(jsonResponse);
  });
})

//Endpoint used to detect Landmarks.
app.post('/detectLandmarks', function (req, res) {

  var uriBase = endpoint + 'vision/v3.1/analyze';
  const imageUrl = req.body.imageUrl

  // Request parameters.
  const params = {
      'visualFeatures': 'Description',
      'details': 'Landmarks',
      'language': 'en'
  };

const options = {
    uri: uriBase,
    qs: params,
    body: '{"url": ' + '"' + imageUrl + '"}',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
};

  request.post(options, (error, response, body) => {
    if (error) {
      console.log('Error: ', error);
      return;
    }
    let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
    
    res.end(jsonResponse);
  });
})

//Endpoint used to detect image type. Rated 0-3 based on image's match to clipart. 
//Boolean 0 or 1 use to determine if image is drawn.
app.post('/detectType', function (req, res) {

  var uriBase = endpoint + 'vision/v3.1/analyze';
  const imageUrl = req.body.imageUrl

  // Request parameters.
  const params = {
      'visualFeatures': 'Description,ImageType',
      'details': '',
      'language': 'en'
  };

const options = {
    uri: uriBase,
    qs: params,
    body: '{"url": ' + '"' + imageUrl + '"}',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
};

  request.post(options, (error, response, body) => {
    if (error) {
      console.log('Error: ', error);
      return;
    }
    let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
    
    res.end(jsonResponse);
  });
})


//App listening at port:3000
app.listen(port, () => {
	console.log(`Image analysis application listening at http://localhost:${port}`)
});