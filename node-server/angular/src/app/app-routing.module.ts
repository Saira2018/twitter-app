import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchTweetComponent } from './search-tweet/search-tweet.component';
import { RandomTweetComponent } from './random-tweet/random-tweet.component';
import { FooterComponent } from './footer/footer.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search-tweet', component: SearchTweetComponent },
  { path: 'random-tweet', component: RandomTweetComponent },
  { path: 'footer', component: FooterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
