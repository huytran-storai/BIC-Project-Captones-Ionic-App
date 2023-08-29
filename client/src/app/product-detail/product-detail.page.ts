import { StoreService } from './../services/store.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  productId!:string;
  product: any;
  constructor(
    private route:ActivatedRoute,
    private StoreService: StoreService,
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params['productId'];
      this.product= this.StoreService.getProductById(this.productId);
      console.log("check =====> ",this.product);
    })
  }

}
