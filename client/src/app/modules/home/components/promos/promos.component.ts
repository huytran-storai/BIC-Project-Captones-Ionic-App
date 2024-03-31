import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { PromosService } from 'src/app/services/promos.service';
import { AlertController, LoadingController } from '@ionic/angular';

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
    private alertController: AlertController,
    private loadingController: LoadingController,
  ) { }

  ngOnInit(): void {
    this.getPromosRender()
  }
  async getPromosRender() {
    const loading = await this.loadingController.create({ 
      cssClass: 'loading',
    })
    await loading.present();
    this.PromosService.getPromocodes().subscribe(
      (res: any) => {
        loading.dismiss();
        this.promoData = res.data.map((item: any) => item.attributes)
        console.log('Find promoData:', this.promoData)
      },
      (err) => {
        loading.dismiss();
        console.error('Error fetching current store data:', err);
      }
    )
  }
  
  async copyToClipboard(event: Event, promoText: string) {
    event.preventDefault();
    const textarea = document.createElement('textarea');
    textarea.value = promoText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    // console.log('Đã copy thành công:', promoText);
    const alert = await this.alertController.create({
      header: 'Đã lưu mã khuyến mãi',
      subHeader: promoText,
      buttons: ['OK']
    });

    await alert.present();
  }
}
