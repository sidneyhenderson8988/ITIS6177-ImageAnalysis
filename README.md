# ITIS6177-ImageAnalysis

This repository contains the code used to create my API that access Microsfot Vision services for Image Analysis.

## Getting Started

These instructions will tell you how to use this API. Feel free to use my SwaggerUI documentation to test the API endpoints or you can use Postman.

### Prerequisites

Here are some tools you may need:

```
Postman
...or just a working browser and an internet connection to access my SwaggerUI!
```

### How to access using Postman

First, open Postman and enter the address below in the "Enter Request URL" field located at the top of Postman.

```
67.207.85.230/
```

Also, set the request type to "Post".

Here are the names of the endpoints that you can utilize. Just add these names to the end of the request URL:

```
detectGeneral
detectBrand
detectFaces
detectCelebrities
detectLandmarks
detectType
```

An example of a valid request URL would look like:

```
67.207.85.230/detectFaces
```

Next, we need to create a request body to send to the server. This is very simple, as only one field is required.

## How to create request body

You can copy this example into your request body (located under the "body" tab in Postman).
Be sure to also select "raw" and "JSON" as well.

```
{
  "imageUrl": "Paste_your_image_URL_here!"
}
```

Here is an example of a valid request.

```
{
  "imageUrl": "https://www.visualcapitalist.com/wp-content/uploads/2020/01/Ranking-the-Most-Valuable-Brands-in-the-World-shareable-1000x600.jpg"
}
```

### How to get an image's URL

Getting an images URL is easy. Lets say you go to google and search for an image. Once that image is open, right-click and select "Open image in a new tab".
Doing so will take you to a seperate tab that has its own URL address. That is the address that you want to copy and paste into the request body.

```
{
  "imageUrl": "https://www.visualcapitalist.com/wp-content/uploads/2020/01/Ranking-the-Most-Valuable-Brands-in-the-World-shareable-1000x600.jpg"
}
```

## Using the different endpoints

Each endpoints serves a unique purpose. Depending on what information you wish to gather from an image will determine what endpoint you will use.

```
67.207.85.230/detectGeneral - Receives an image URL and returns general information such as description, category, and colors.

67.207.85.230/detectBrand - Receives an image URL and returns information about Brands.

67.207.85.230/detectFaces - Receives an image URL and returns facial information.

67.207.85.230/detectCelebrities - Receives an image URL and detects celebrities.

67.207.85.230/detectLandmarks - Receives an image URL and detects landmarks.

67.207.85.230/detectType - Receives an image URL and detects clipart/hand-drawn images.
```

## SwaggerUI Link and instructions

If you are not using Postman, you can simply access this URL below to test out my API in your browser.
When trying out the endpoints, all you have to do is replace the "string" field with your image URL.

```
67.207.85.230/docs
```

## Versioning

This is version 1.0.0

## Authors

- **Sidney Henderson**
