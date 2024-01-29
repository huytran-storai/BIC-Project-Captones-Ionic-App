import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { BlogsService } from 'src/app/services/blogs.service';


register();
@Component({
  selector: 'promo',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.scss'],
})
export class PromoComponent implements OnInit {
  public blogData: any;
  constructor(
    private BlogsService: BlogsService,

  ) { }

  ngOnInit(): void {
    this.getBlogRender()
  }
  getBlogRender() {
    this.BlogsService.getBlog().subscribe(
      (res: any) => {
        this.blogData = res.data.map((item: any) => item.attributes)
        console.log('Find Blog:', this.blogData)
      },
      (err) => {
        console.error('Error fetching current store data:', err);
      }
    )
  }
  copyToClipboard(event: Event) {
    const promoTextElement = document.getElementById('promoText');
    event.preventDefault();
    if (promoTextElement) {
      const textarea = document.createElement('textarea');
      textarea.value = promoTextElement.innerText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      console.log('Đã copy thành công');
    } else {
      console.error('Không tìm thấy phần tử có id là "promoText"');
    }
  }
  
}
