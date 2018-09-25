import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Wordpress Display Posts';
  restItems: any;
  restItemsUrl = 'https://public-api.wordpress.com/rest/v1.1/sites/vocon-it.com/posts';

  constructor(private http: HttpClient, public sanitizer: DomSanitizer) {}
  

  ngOnInit() {
    this.getRestItems();
  }

  // Read all REST Items
  getRestItems(): void {
    this.restItemsServiceGetRestItems()
      .subscribe(
        restItems => {
          this.restItems = restItems;
          console.log(this.restItems);
        }
      )
  }

  // Rest Items Service: Read all REST Items
  restItemsServiceGetRestItems() {
    return this.http
      .get<any[]>(this.restItemsUrl)
      .pipe(map(data => data));
  }
}