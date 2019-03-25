const express = require('express');
const http = require('http');
const path = require('path');
const request = require('request-promise');

const app = express();

var server = app.listen(3000, listening);

function listening () {
   console.log("listening . . . ");
}

app.use(express.static('dist'));

/*app.get("/", (req, res) => {
   console.log("responding to root route")
   res.send("Hello from ROOT")
})

app.get("/users", (req, res) => {
   var user1 = {
      firstName: "Stephen",
      lastName: "Curry"
   }
   const user2 = {
      firstName: "Kevin",
      lastName: "Durrant"
   }

   res.json([user1, user2])

   //res.send("Nodemon auto updates when I save this file")
})
*/

//localhost: 3003
// app.listen(3003, () => {
//    console.log("Server is up and listening on 3003")
// })

// const port = process.env.PORT || 3000;

// app.use(express.static(__dirname + '/dist/'));

// app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

// const server = http.createServer(app);

// server.listen(port,() => console.log('Running...'));

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
         screen_name: twitterScreenName
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

