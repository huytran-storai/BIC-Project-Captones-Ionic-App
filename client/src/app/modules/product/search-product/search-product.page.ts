import { StoreService } from 'src/app/services/store.service';
import { Component, OnInit } from '@angular/core';
import { ProductItem } from '../../../shared/models/ProductItem';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.page.html',
  styleUrls: ['./search-product.page.scss'],
})
export class SearchProductPage implements OnInit {
  searchTerm = '';
  items: ProductItem[] = [];
  isModalOpen = false;
  selectedProduct: any;
  public productData: any;

  constructor(
    private StoreService: StoreService,
    private router: Router,
    private productService: StoreService,
    private loadingController: LoadingController

  ) {
  }

  ngOnInit(): void {
    this.getProductRender();

  }

  navigateToProductDetail(product: any) {
    this.router.navigate(['product-detail/', product.ProductName,product.ProductId]);
  }

  search(event: any): void {
    const term = event.target.value;
    this.searchTerm = term;
    this.updateSearchResults();
  }

  updateSearchResults(): void {
    if (this.searchTerm) {
      this.items = this.StoreService.getAllProductsBySearchTerm(this.searchTerm);
    }
    else {
      this.items = []
    }
  }

  async getProductRender() {
    const loading = await this.loadingController.create({ 
      cssClass: 'loading',
    })
    await loading.present();
    this.productService.getProducts().subscribe(
      (res: any) => {
        loading.dismiss();
        this.productData = res.data.map((item: any) => item.attributes);
        console.log("Render data in search", this.productData)
      },
      (err: any) => {
        loading.dismiss();
        console.error('Error fetching current store data:', err);
      }
    );
  }
}
