const request = require('request-promise');

var bearerToken = '';

getBearerToken();

function getBearerToken() {
    var tokenRequest = {
        method: 'POST',
        uri: 'https://api.twitter.com/oauth2/token',
        form: {
            grant_type: 'client_credentials'
        },
        json: true // Automatically stringifies the body to JSON
    };
    return request(tokenRequest)
        .auth('CTRQEpzD07wT6r5FLpPMIVONQ', 'wwMqkbDuLEDq6dGS2jHJNFm76WmAi4zoSs0mIvQEvMEnWKbSFU', true)
        .then(function (jsonData) {
            bearerToken = jsonData.access_token;
        })
}


function getTweets(searchTerm) {
    console.log('Bearer Token: ', bearerToken);
    var searchParams = {
        method: 'GET',
        uri: 'https://api.twitter.com/1.1/search/tweets.json',
        qs: {
            q: searchTerm,
            result_type: 'recent',
            count: 8
        },
        auth: {
            bearer: bearerToken
        },
        json: true
    };

    return request(searchParams);
}



function getRandomTweets(username, count) {
    var searchParams = {
        method: 'GET',
        uri: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
        qs: {
            screen_name: username,
            count: count || 5,
            since_id: 50
        },
        auth: {
            bearer: bearerToken
        },
        json: true // Automatically stringifies the body to JSON
    }

    return request(searchParams);

}



module.exports = {
    getTweets: getTweets,
    getRandomTweets: getRandomTweets
}