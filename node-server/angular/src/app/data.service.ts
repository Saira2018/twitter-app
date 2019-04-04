import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

   constructor(private http: HttpClient) { }

  getUser(user){
     return this.http.get('/api/tweets/random/' + user);
  }

  getTweets(searchInput){
    return this.http.get('/api/tweets/search/' + searchInput );
  }
}
