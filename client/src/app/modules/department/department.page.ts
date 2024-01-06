import { StoreService } from 'src/app/services/store.service';
import { Component, OnInit } from '@angular/core';
import { Tag } from '../../shared/models/Tag';

@Component({
  selector: 'app-department',
  templateUrl: './department.page.html',
  styleUrls: ['./department.page.scss'],
})
export class DepartmentPage implements OnInit {
  tags?:Tag[];
  productTag: any;
  constructor(
    private StoreService : StoreService
    ) { 
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
