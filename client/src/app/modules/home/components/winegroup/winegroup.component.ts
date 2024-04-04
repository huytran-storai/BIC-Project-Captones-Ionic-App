import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { StoreService } from 'src/app/services/store.service';
import { Tag } from 'src/app/shared/models/Tag';
import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-winegroup',
  templateUrl: './winegroup.component.html',
  styleUrls: ['./winegroup.component.scss'],
})
export class WinegroupComponent implements OnInit {
  tags: Tag[];
  public productTag: any;
  constructor(
    private StoreService: StoreService,
    private loadingController: LoadingController,
    ) {
    this.tags = StoreService.getAllTags();
  }

  ngOnInit() {
    this.getTagsProduct()
   }

  async getTagsProduct(){
    const loading = await this.loadingController.create({ 
      cssClass: 'loading',
    })
    await loading.present();
    this.StoreService.getProductTag().subscribe(
      (res: any) => {
        loading.dismiss();
        this.productTag = res.data.map((item: any) => item.attributes);
        console.log("Product tags:", this.productTag)
      },
      (err: any) => {
        loading.dismiss();
        console.error('Error fetching current store data:', err);
      }
    );
  }
}
