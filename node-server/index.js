const express = require('express');
const http = require('http');
const path = require('path');
const request = require('request-promise');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/dist/'));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

const server = http.createServer(app);

server.listen(port,() => console.log('Running...'));

var token = {
   method: 'POST',
   uri: 'https://api.twitter.com/oauth2/token',
   form: {
      grant_type: 'client_credentials'
   },
   json: true // Automatically stringifies the body to JSON
};

var twitterScreenName = 'worldArchery'

request(token)
   .auth('CTRQEpzD07wT6r5FLpPMIVONQ','wwMqkbDuLEDq6dGS2jHJNFm76WmAi4zoSs0mIvQEvMEnWKbSFU', true)
   .then(function (jsonData) {
      //store bearerToken to be used in 'get' functions
       bearerToken = jsonData.access_token;

       getTweets(bearerToken);
       getUsers(bearerToken);
   })
   .catch(function (err) {
      console.log("failure: ", err)
   });

//retrieve tweets from twitter   
function getTweets(bearerToken) {
   var searchParams = {
      method: 'GET',
      uri: 'https://api.twitter.com/1.1/search/tweets.json',
      qs: {
         q: twitterScreenName,
         result_type: 'popular',
         count: 2
      },
      auth: {
         bearer: bearerToken
      },
      json: true
   };

request(searchParams)
   .then(function(jsonData){
     var tweets = jsonData.statuses;
      for(i=0 ; i < tweets.length; i++ ){
         console.log('----------- Individual Tweet : #' + (i+1) + ' ------------');
         console.log(tweets[i].text);
         console.log('Favourite count: ' + tweets[i].favorite_count);
         console.log('------------------------------------------');
      }
   })
   .catch(function (errorObject){
      console.log(errorObject);
   });
}

//Retrieve User data from Twitter
function getUsers(bearerToken){
   var searchParams = {
      method: 'GET',
      uri: 'https://api.twitter.com/1.1/users/show.json',
      qs: {
         screen_name: twitterHandle
      },
      auth: {
         bearer: bearerToken
      },
      json: true // Automatically stringifies the body to JSON
   }

   request(searchParams)
   .then(function(jsonData){
      var user = jsonData.screen_name;
      console.log('user retrieved object # ', user)
   })
   .catch(function (errorObject){
      console.log("ERROR SOMETHING NOT RIGHT: ",errorObject);
   });
}

