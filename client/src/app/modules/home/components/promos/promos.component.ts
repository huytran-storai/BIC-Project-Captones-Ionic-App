import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { PromosService } from 'src/app/services/promos.service';


register();
@Component({
  selector: 'promo',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.scss'],
})
export class PromoComponent implements OnInit {
  public promoData: any;
  constructor(
    private PromosService: PromosService,

  ) { }

  ngOnInit(): void {
    this.getBlogRender()
  }
  getBlogRender() {
    this.PromosService.getPromocodes().subscribe(
      (res: any) => {
        this.promoData = res.data.map((item: any) => item.attributes)
        console.log('Find promoData:', this.promoData)
      },
      (err) => {
        console.error('Error fetching current store data:', err);
      }
    )
  }
  
  copyToClipboard(event: Event, promoText: string) {
    event.preventDefault();
    const textarea = document.createElement('textarea');
    textarea.value = promoText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    console.log('Đã copy thành công:', promoText);
  }
  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  setResult(event: Event) {
    
  }
}
