const express = require('express');
const app = express();
const twitterService = require('./twitterService');

twitterService.getTweets();
twitterService.getRandomTweets();

app.listen(4200, () => {
   console.log("listening . . . ");
});

app.use(express.static('dist'));

//Endpoint setup
app.get('/api/tweets/search/', function(request, response) {
   twitterService.getTweets(request.query.searchTerm).then(jsonData => {
      response.send(jsonData.statuses);
   });

}); 
app.get('/api/tweets/random/', function(request, response){
   twitterService.getRandomTweets(request.query.user, 5).then(jsonData => {
      response.send(jsonData[1]);
   })
});


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
