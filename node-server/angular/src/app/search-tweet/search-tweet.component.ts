import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-search-tweet',
  templateUrl: './search-tweet.component.html',
  styleUrls: ['./search-tweet.component.scss']
})
export class SearchTweetComponent implements OnInit {

  searchInput: '';  
  users$: object;
  tweets$: object;

  constructor(private dataService: DataService) { }

  ngOnInit() {

   }

  search () {
    this.dataService.getTweets(this.searchInput).subscribe(
      data => this.tweets$ = data
    )
  }
}
