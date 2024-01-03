import { StoreService } from 'src/app/services/store.service';
import { Component, OnInit } from '@angular/core';
import { ProductItem } from '../../../shared/models/ProductItem';
import { Router } from '@angular/router';

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

  ) {
  }

  ngOnInit(): void {
    this.getProductRender();

  }

  navigateToProductDetail(product: any) {
    this.router.navigate(['product-detail/', product.id]);
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

  getProductRender() {
    this.productService.getProducts().subscribe(
      (res: any) => {
        this.productData = res?.data[0]?.attributes;
        console.log("find store", this.productData)
      },
      (err: any) => {
        console.error('Error fetching current store data:', err);
      }
    );
  }
}
