import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/shared/models/News';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements OnInit {

  news: News[] = [];
  constructor(private NewsService: NewsService) { }

  ngOnInit(): void {
    this.news = this.NewsService.getAllNews()
  }

}
