import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// var example = require('./search-tweet/search-tweet.component');

// console.log("================", example);
@Injectable({
  providedIn: 'root'
})
export class DataService {

   constructor(private http: HttpClient) { }

   getUsers(){
     return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  getTweets(){
    var searchInput = 'gameofthrones'; //import this from a module?
    return this.http.get('/api/tweets/search/' + searchInput );
  }
}
