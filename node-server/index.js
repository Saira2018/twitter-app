const express = require('express');
const request = require('request-promise');
const app = express();


//Server Setup


app.listen(4200, () => {
   console.log("listening . . . ");
});


app.use(express.static('dist'));



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
app.get('/api/tweets/search/:searchTerm', searchTweets); 
app.get('/api/tweets/random', randomTweets);

var searchData;

//Endpoint functions
function searchTweets (data, response) { //request or response
      searchData = data.params;
      console.log("-----------",searchData.searchTerm);


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
            q: searchData.searchTerm,
            result_type: 'recent',
            count: 8
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
         console.log("img: "+entry.user.profile_image_url);
         console.log("picture: "+entry.user.entities.media_url);
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

//I have created this function so that I can test that a function call from Angular is successful. I haven't gotten around to calling it yet though.
function testPing () {
   console.log("success talk from Angular to node server");
}




