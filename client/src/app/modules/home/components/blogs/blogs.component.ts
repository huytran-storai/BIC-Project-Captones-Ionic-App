import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { BlogsService } from 'src/app/services/blogs.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements OnInit {
  public blogsData: any;
  constructor(
    private BlogService: BlogsService,
    private loadingController: LoadingController,
    ) { }

  ngOnInit(): void {
    this.getBlogsRender()
  }

  async getBlogsRender() {
    const loading = await this.loadingController.create({ 
      cssClass: 'loading',
    })
    await loading.present();
    this.BlogService.getBlog().subscribe(
      (res: any) => {
        loading.dismiss();
        this.blogsData = res.data.map((item: any) => item.attributes);
        console.log("Find Blog: ", this.blogsData)
      },
      (err) => {
        loading.dismiss();
        console.error('Error fetching current store data:', err);
      }
    );
  }

}
