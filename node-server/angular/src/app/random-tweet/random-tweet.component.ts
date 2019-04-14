import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-random-tweet',
  templateUrl: './random-tweet.component.html',
  styleUrls: ['./random-tweet.component.scss']
})
export class RandomTweetComponent implements OnInit {

  user: string = ''; 
  randomTweet: object;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    console.log("what is user: "+ this.user);
  }



  loadUserRandomTweet () {
    this.dataService.getUser(this.user).subscribe(
      data => this.randomTweet = data
    )
   // this.arrayReturned();
  }

  arrayReturned() {
    console.log("what is userTweet$ : ", this.randomTweet);
    console.log("what is user : ", this.user);
  }

  clickOnMe1 () {
    console.log("you have clicked on me");
    this.user = 'worldarchery';
    this.loadUserRandomTweet();
    //this.nextFunction();
  }

  clickOnMe2(){
    this.user = 'GameOfThrones';
    this.loadUserRandomTweet();
  }

  clickonMe3(){
    this.user = 'SimonsCat';
    this.loadUserRandomTweet();
  }

  clickonMe4(){
    this.user = 'snowpatrol';
    this.loadUserRandomTweet();
  }

  clickonMe5(){
    this.user = 'Headspace';
    this.loadUserRandomTweet();
  }
}
