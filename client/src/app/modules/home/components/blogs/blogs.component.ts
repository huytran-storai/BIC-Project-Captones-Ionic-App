import { Component, OnInit } from '@angular/core';
import { BlogsService } from 'src/app/services/blogs.service';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements OnInit {
  public blogsData: any;
  constructor(
    private BlogService: BlogsService
    ) { }

  ngOnInit(): void {
    this.getBlogsRender()
  }

  getBlogsRender() {
    this.BlogService.getBlog().subscribe(
      (res: any) => {
        this.blogsData = res.data.map((item: any) => item.attributes);
        console.log("Find Blog: ", this.blogsData)
      },
      (err) => {
        console.error('Error fetching current store data:', err);
      }
    );
  }

}
