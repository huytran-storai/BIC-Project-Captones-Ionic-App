import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { BlogsService } from 'src/app/services/blogs.service';


register();
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  public blogData: any;
  constructor(
    private BlogsService : BlogsService,

    ) { }

  ngOnInit(): void {
    this.getBlogRender()
  }
getBlogRender(){
  this.BlogsService.getBlog().subscribe(
    (res: any) => {
      this.blogData = res.data.map((item:any) => item.attributes)
      console.log('Find Blog:',this.blogData)
    },
    (err) => {
      console.error('Error fetching current store data:', err);
    }
  )
}
}
