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
app.get('/api/tweets/random/:user', randomTweets);

var searchData;
var userData;

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
   userData = data.params;
   console.log("userData: ", userData);

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
         uri: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
         qs: {
            //user_id: 142225011,
            screen_name: userData.user,
            count: 5,
            since_id: 50
         },
         auth: {
            bearer: bearerToken
         },
         json: true // Automatically stringifies the body to JSON
      }
   
   request(searchParams)
      .then(function(jsonData){
         //var user = jsonData.screen_name;
         user = jsonData;
         response.send(user);
         //console.log('user retrieved object # ', user);
         //console.log('user retrieved object - TEXT ', user.user.description);
         user.forEach(entry => {
            console.log(entry.user.name);
            console.log(entry.text);
            console.log("Tweeted "+calculateSince(entry.created_at));
            console.log(entry.id);
           // console.log(entry.user.id);
         })
      })
      .catch(function (errorObject){
         console.log("ERROR SOMETHING NOT RIGHT: ",errorObject.message);
      });
   }  

}

//I have created this function so that I can test that a function call from Angular is successful. I haven't gotten around to calling it yet though.
function testPing () {
   console.log("success talk from Angular to node server");
}


//credit: https://www.sitepoint.com/calculate-twitter-time-tweet-javascript/
function calculateSince(datetime)
{
    var tTime=new Date(datetime);
    var cTime=new Date();
    var sinceMin=Math.round((cTime-tTime)/60000);
    if(sinceMin==0)
    {
        var sinceSec=Math.round((cTime-tTime)/1000);
        if(sinceSec<10)
          var since='less than 10 seconds ago';
        else if(sinceSec<20)
          var since='less than 20 seconds ago';
        else
          var since='half a minute ago';
    }
    else if(sinceMin==1)
    {
        var sinceSec=Math.round((cTime-tTime)/1000);
        if(sinceSec==30)
          var since='half a minute ago';
        else if(sinceSec<60)
          var since='less than a minute ago';
        else
          var since='1 minute ago';
    }
    else if(sinceMin<45)
        var since=sinceMin+' minutes ago';
    else if(sinceMin>44&&sinceMin<60)
        var since='about 1 hour ago';
    else if(sinceMin<1440){
        var sinceHr=Math.round(sinceMin/60);
    if(sinceHr==1)
      var since='about 1 hour ago';
    else
      var since='about '+sinceHr+' hours ago';
    }
    else if(sinceMin>1439&&sinceMin<2880)
        var since='1 day ago';
    else
    {
        var sinceDay=Math.round(sinceMin/1440);
        var since=sinceDay+' days ago';
    }
    return since;
};
