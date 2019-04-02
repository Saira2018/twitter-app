import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';


var inputValue;

@Component({
  selector: 'app-search-tweet',
  templateUrl: './search-tweet.component.html',
  styleUrls: ['./search-tweet.component.scss']
})
export class SearchTweetComponent implements OnInit {

  users$: object;
  tweets$: object;

  constructor(private data: DataService) { }

  ngOnInit() {
    // this.data.getUsers().subscribe(
    //   data => this.users$ = data
    // )

    this.data.getTweets().subscribe(
      data => this.tweets$ = data
    )

    

    var submitSearch = document.getElementById("beginSearch");
    console.log("what is HTMLElement ",submitSearch);
    inputValue;

    submitSearch.addEventListener('click', function (event){
        console.log('clicked on button');
        inputValue = (<HTMLInputElement>document.getElementById("search")).value;
        console.log("value is:  "+ inputValue);
        
    })
  }
}
