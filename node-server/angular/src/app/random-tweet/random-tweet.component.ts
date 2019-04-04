import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-random-tweet',
  templateUrl: './random-tweet.component.html',
  styleUrls: ['./random-tweet.component.scss']
})
export class RandomTweetComponent implements OnInit {

  user: ''; 
  userTweet$: object;

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  loadUserRandomTweet () {
    this.dataService.getUser(this.user).subscribe(
      data => this.userTweet$ = data
    )
  }
}
