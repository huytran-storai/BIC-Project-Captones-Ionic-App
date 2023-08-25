import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/shared/models/Store';
import { StoreService } from 'src/app/services/store.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent  implements OnInit {

  stores: Store[] = [];

  constructor(private StoreService: StoreService) { 
    this.stores = StoreService.getAll();
  }

  ngOnInit(): void {

  }

}
