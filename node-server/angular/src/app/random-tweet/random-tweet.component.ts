import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-random-tweet',
  templateUrl: './random-tweet.component.html',
  styleUrls: ['./random-tweet.component.scss']
})
export class RandomTweetComponent implements OnInit {

  randomTweet: object;

  private USERS: object = {
    WORLD_ARCHERY: 'worldarchery',
    GOT: 'GameOfThrones',
    SIMONS_CAT: 'SimonsCat',
    SNOW_PATROL: 'snowpatrol',
    HEADSPACE: 'headspace'
  }

  constructor(private dataService: DataService) { }

  ngOnInit()  {}

  loadUserRandomTweet (username) {
    this.dataService.getUser(username).subscribe(
      data => this.randomTweet = data
    )
  }
}
