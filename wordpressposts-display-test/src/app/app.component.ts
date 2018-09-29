import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AppService } from './app.service';
import { SafePost } from './safe-post.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Wordpress Display Posts';
  // restItems: any;
  // restItemsUrl = 'https://public-api.wordpress.com/rest/v1.1/sites/vocon-it.com/posts';
  posts: SafePost[];

  constructor(private appService: AppService, public sanitizer: DomSanitizer) {}
    

  ngOnInit() {
    this.getRestItems();
  }

   // Read all REST Items
   getRestItems(): void {
    this.appService.getAll()
    .subscribe(posts => { this.posts = posts; });
  }

}