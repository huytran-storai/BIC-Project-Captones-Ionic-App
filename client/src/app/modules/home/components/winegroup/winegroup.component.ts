import { Component, OnInit } from '@angular/core';
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
  constructor(private StoreService: StoreService) {
    this.tags = StoreService.getAllTags();
  }

  ngOnInit() {
    this.getTagsProduct()
   }

  getTagsProduct(){
    this.StoreService.getProductTag().subscribe(
      (res: any) => {
        this.productTag = res.data.map((item: any) => item.attributes);
        console.log("Product tags:", this.productTag)
      },
      (err: any) => {
        console.error('Error fetching current store data:', err);
      }
    );
  }
}
