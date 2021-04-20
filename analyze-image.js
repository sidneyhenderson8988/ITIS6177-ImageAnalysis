
const request = require('request');
const express = require('express');
const app = express();
const port = 3000;
const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const { check, validationResult } = require('express-validator');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const optionsDoc = {
  swaggerDefinition: {
    info: {
      title: "Sidney's Image Analysis API",
      version: '1.0.0',
      description: 'API Documentation showing all endpoints for image analysis API.\n\n IMAGE SPECIFICATIONS:\n - The image must be presented in JPEG, PNG, GIF, or BMP format.\n - The file size of the image must be less than 4 megabytes (MB).\n - The dimensions of the image must be greater than 50 x 50 pixels',
    },
     host: 'localhost:3000',
     basePath: '/',
  },
  apis: ['./analyze-image.js'],
};

const specs = swaggerJsdoc(optionsDoc);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, {explorer: true}));
app.use(cors());

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

/**
 * @swagger
 * /detectImage:
 *    post:
 *      description: Receives an image URL and returns general information
 *      summary: Focuses on an image's description, category, and color; replace "string" field with your image URL!
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: imageUrl
 *          description: Analyze an image and receive general information.
 *          schema:
 *            type: object
 *            properties:
 *              imageUrl:
 *                type: string
 *      responses:
 *        200:
 *          description: Image Successfully Analyzed
 */
app.post('/detectImage', check('imageUrl').isURL(), function (req, res) {

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

/**
 * @swagger
 * /detectBrand:
 *    post:
 *      description: Receives an image URL and returns information about Brands
 *      summary: Receives an image URL and returns information about Brands; replace "string" field with your image URL!
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: imageUrl
 *          description: Analyze brands on an image.
 *          schema:
 *            type: object
 *            properties:
 *              imageUrl:
 *                type: string
 *      responses:
 *        200:
 *          description: Image Successfully Analyzed
 */
app.post('/detectBrand', check('imageUrl').isURL(), function (req, res) {

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

/**
 * @swagger
 * /detectFaces:
 *    post:
 *      description: Receives an image URL and returns facial information
 *      summary: Receives an image URL and returns returns facial information; replace "string" field with your image URL!
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: imageUrl
 *          description: Analyze an image and return facial information.
 *          schema:
 *            type: object
 *            properties:
 *              imageUrl:
 *                type: string
 *      responses:
 *        200:
 *          description: Image Successfully Analyzed
 */
app.post('/detectFaces', check('imageUrl').isURL(), function (req, res) {

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

/**
 * @swagger
 * /detectCelebrities:
 *    post:
 *      description: Receives an image URL and detects celebrities
 *      summary: Receives an image URL and returns celebrity information; replace "string" field with your image URL!
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: imageUrl
 *          description: Analyze brands on an image.
 *          schema:
 *            type: object
 *            properties:
 *              imageUrl:
 *                type: string
 *      responses:
 *        200:
 *          description: Image Successfully Analyzed
 */
app.post('/detectCelebrities', check('imageUrl').isURL(), function (req, res) {

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

/**
 * @swagger
 * /detectLandmarks:
 *    post:
 *      description: Receives an image URL and detects landmarks
 *      summary: Receives an image URL and returns landmark information; replace "string" field with your image URL!
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: imageUrl
 *          description: Analyze an image and receive landmark information.
 *          schema:
 *            type: object
 *            properties:
 *              imageUrl:
 *                type: string
 *      responses:
 *        200:
 *          description: Image Successfully Analyzed
 */
app.post('/detectLandmarks', check('imageUrl').isURL(), function (req, res) {

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

/**
 * @swagger
 * /detectType:
 *    post:
 *      description: Receives an image URL and detects clipart/hand-drawn images
 *      summary: Receives an image URL and detects clipart/hand-drawn images; replace "string" field with your image URL!
 *      consumes:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: imageUrl
 *          description: Analyze an image and detect clipart/hand-drawn, image match is rated 0 (not clipart) to 3 (excellent clipart). Hand-drawn detection is a boolean variable, 0 (not hand-drawn) or 1 (is hand-drawn)
 *          schema:
 *            type: object
 *            properties:
 *              imageUrl:
 *                type: string
 *      responses:
 *        200:
 *          description: Image Successfully Analyzed
 */
app.post('/detectType', check('imageUrl').isURL(), function (req, res) {

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