import { StoreService } from 'src/app/services/store.service';
import { Component, OnInit } from '@angular/core';
import { Tag } from '../../shared/models/Tag';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-department',
  templateUrl: './department.page.html',
  styleUrls: ['./department.page.scss'],
})
export class DepartmentPage implements OnInit {
  tags?:Tag[];
  productTag: any;
  constructor(
    private StoreService : StoreService,
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
