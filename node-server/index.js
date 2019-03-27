const express = require('express');
const http = require('http');
const path = require('path');
const request = require('request-promise');
const app = express();

//Server Setup
var server = app.listen(3000, listening);

function listening () {
   console.log("listening . . . ");
}

app.use(express.static('dist'));


//API variables
var searchTerm = 'brexit';

//Authentication code
var token = {
   method: 'POST',
   uri: 'https://api.twitter.com/oauth2/token',
   form: {
      grant_type: 'client_credentials'
   },
   json: true // Automatically stringifies the body to JSON
};


//Endpoint setup
app.get('/api/tweets/search/', searchTweets); 
app.get('/api/tweets/random', randomTweets);


//Endpoint functions
function searchTweets (data, response) {
  
      request(token)
      .auth('CTRQEpzD07wT6r5FLpPMIVONQ','wwMqkbDuLEDq6dGS2jHJNFm76WmAi4zoSs0mIvQEvMEnWKbSFU', true)
      .then(function (jsonData) {
         //store bearerToken to be used in 'get' functions
          bearerToken = jsonData.access_token;
      })
      .then(function() {
        getTweets(bearerToken);
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
            q: searchTerm,
            result_type: 'popular',
            count: 5
         },
         auth: {
            bearer: bearerToken
         },
         json: true
      };
   
   request(searchParams)
      .then(function(jsonData){

        tweets = jsonData.statuses;
        response.send(tweets);
      // NEED TO PRINT THIS TO THE Angular App SOMEHOW

      tweets.forEach(entry => {
         console.log(entry.text);
         console.log("::::::::::::::::::::::");
         console.log("twitter user: "+entry.user.screen_name);
      })
        console.log("no of tweets ", tweets.length);
      })
      .catch(function (errorObject){
         console.log(errorObject);
      });
   }   
}


function randomTweets(data, response) {
   response.send("Here are random tweets");
   request(token)
   .auth('CTRQEpzD07wT6r5FLpPMIVONQ','wwMqkbDuLEDq6dGS2jHJNFm76WmAi4zoSs0mIvQEvMEnWKbSFU', true)
   .then(function (jsonData) {
      //store bearerToken to be used in 'get' functions
       bearerToken = jsonData.access_token;

       getUsers(bearerToken);
   })
   .catch(function (err) {
      console.log("failure: ", err)
   });

   //Retrieve User data from Twitter
   function getUsers(bearerToken){
      var searchParams = {
         method: 'GET',
         uri: 'https://api.twitter.com/1.1/users/show.json',
         qs: {
            screen_name: searchTerm
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

}

