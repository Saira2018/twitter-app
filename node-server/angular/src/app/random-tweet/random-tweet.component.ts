import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-random-tweet',
  templateUrl: './random-tweet.component.html',
  styleUrls: ['./random-tweet.component.scss']
})
export class RandomTweetComponent implements OnInit {

  user: string; 
  userTweet$: object;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    console.log("what is user: "+ this.user);
  }



  loadUserRandomTweet () {
    this.dataService.getUser(this.user).subscribe(
      data => this.userTweet$ = data
    )
   // this.arrayReturned();
  }

  arrayReturned() {
    console.log("what is userTweet$ : ", this.userTweet$);
    console.log("what is user : ", this.user);
  }

  clickOnMe1 () {
    console.log("you have clicked on me");
    this.user = 'archeryGB';
    this.nextFunction();
  }

    nextFunction () {
      console.log("user is now: "+this.user);
      this.loadUserRandomTweet();
    }

}
