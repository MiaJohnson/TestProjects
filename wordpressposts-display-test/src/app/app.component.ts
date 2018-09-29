import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppService } from './app.service';
import { SafePost } from './safe-post.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Wordpress Display Posts';
  posts$: Observable<SafePost[]>;

  constructor(private appService: AppService) {}
    

  ngOnInit() {
    this.posts$ = this.getRestItems$();
  }

   // Read all REST Items
   getRestItems$(): Observable<SafePost[]> {
    return this.appService.getAll()
    .pipe(posts => posts);
  }

}