import { StoreService } from 'src/app/services/store.service';
import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-department-result',
  templateUrl: './department-result.page.html',
  styleUrls: ['./department-result.page.scss'],
})
export class DepartmentResultPage implements OnInit {
  tagName!: string;
  products: any[] = [];
  isModalOpen = false;
  selectedProduct: any;
  itemCart:any = []

  constructor(private route: ActivatedRoute, private StoreService: StoreService,private router: Router) { }

  navigateToProductDetail(product: any) {
    this.router.navigate(['product-detail/', product.id]); 
  }
  checkAdded(product: any): boolean {
    const productId = product.id;
    this.itemCart = JSON.parse(localStorage.getItem('localCart') || '[]');
    let isConditionTrue = false; 
  
    for (let i = 0; i < this.itemCart.length; i++) {
      if (parseInt(productId) === parseInt(this.itemCart[i].id)) {
        isConditionTrue = true;
        break;
      }
    }
  
    return isConditionTrue;   
  }

  addProduct(store: any){
    let cartDataNull = localStorage.getItem('localCart');
    if(cartDataNull == null) {
      let storeDataGet:any =[]
      storeDataGet.push(store)
      localStorage.setItem('localCart', JSON.stringify(storeDataGet));
    } else {
      var productId = store.id;
      let index:number = -1;
      this.itemCart = JSON.parse(localStorage.getItem('localCart') || '[]');
      for(let i = 0 ; i < this.itemCart.length; i++){
        if(parseInt(productId) === parseInt(this.itemCart[i].id)){
          this.itemCart[i].productQuantityAddDefault += store.productQuantityAddDefault
          index = i;
          break; 
        }
      }
      if(index == -1){
        this.itemCart.push(store)
        localStorage.setItem('localCart', JSON.stringify(this.itemCart))
      }
      else{
        localStorage.setItem('localCart', JSON.stringify(this.itemCart))
      }
    }
   
  }
  

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tagName = params['tagName'];
      if (this.tagName === "All") {
        this.products = this.StoreService.getAll();
      } else {
        this.products = this.StoreService.getAllStoreByTagName(this.tagName);
      }
    });
  }
}
