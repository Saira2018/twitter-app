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



request(token)
   .auth('CTRQEpzD07wT6r5FLpPMIVONQ','wwMqkbDuLEDq6dGS2jHJNFm76WmAi4zoSs0mIvQEvMEnWKbSFU', true)
   .then(function (parsedBody) {
      console.log("response: ", parsedBody)
      console.log('token-type: ', parsedBody.token_type);
      console.log('access-token: ', parsedBody.access_token);
      
       // POST succeeded...
   })
   .catch(function (err) {
      console.log("failure: ", err)
       // POST failed...
   });

   var searchParams = {
      method: 'GET',
      uri: 'https://api.twitter.com/1.1/search/tweets.json',
      qs: {
         q: nasa,
         result_type: popular
      },
      headers: {
         'User-Agent': 'request',
         'Authorization' : 'Bearer '+parsedBody.access_token + ''
      }
      
   }


/*var Twit = require('twit');

var T = new Twit({
   consumer_key: 'CTRQEpzD07wT6r5FLpPMIVONQ',
   consumer_secret: 'wwMqkbDuLEDq6dGS2jHJNFm76WmAi4zoSs0mIvQEvMEnWKbSFU',
   access_token: '1107206945285517312-w7ItFZ5mePQ7Ck5g9u6BWAtqtl4m29',
   access_token_secret: 'P2TdmiFrbQckB81eHKhWbTLMFVz4qHgDMmCWScW8zoOcx',
})

var tweetParams = {
   q: 'simonscat',
   count: 3
}

//send HTTP GET request to API endpoint for retrieving tweets
T.get('search/tweets', tweetParams, getTweets);

 //return data
function getTweets (err, data, response) {

   //extract text data from tweets.
   var tweets = data.statuses; //tweet object as an array
   for(i=0 ; i < tweets.length; i++ ){
      console.log('----------- Individual Tweet : #' + (i+1) + ' ------------');
      console.log(tweets[i].text);
      console.log('Favourite count: ' + tweets[i].favorite_count);
      console.log('------------------------------------------');

   }

   //console.log('----------- Entire collection ------------');
  // console.log(data);
   //console.log('------------------------------------------');
}*/