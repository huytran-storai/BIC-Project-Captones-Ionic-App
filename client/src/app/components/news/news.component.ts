import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/shared/models/News';
import { NewsService } from 'src/app/services/news.service';
import { register } from 'swiper/element/bundle';


register();
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  news: News[] = [];
  constructor(private NewsService: NewsService) { }

  ngOnInit(): void {
    this.news = this.NewsService.getAll()
  }

}
