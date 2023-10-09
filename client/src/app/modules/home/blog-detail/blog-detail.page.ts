import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { News } from '../../../shared/models/News';
import { NewsService } from '../../../services/news.service';
import { register } from 'swiper/element/bundle';
register();
@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.page.html',
  styleUrls: ['./blog-detail.page.scss'],
})
export class BlogDetailPage implements OnInit {
  blog: News[] = [];
  constructor(private NewsService: NewsService) { }

  ngOnInit(): void {
    this.blog = this.NewsService.getAll()
  }

}
