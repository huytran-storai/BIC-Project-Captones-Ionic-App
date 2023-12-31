import { StoreService } from 'src/app/services/store.service';
import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { modalController } from '@ionic/core';
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
  departments: string[] = [`Wine`, `Beer`, `Whiskey`, `Spririts & Liqueur`];
  departmentShow: string[] = [];
  selectedDepartment: any = {}; 
  showMoreDepartment = false;

  brands: string[] = [`Chimay (1)`, `Corona`, `Dom Perignon`, `14 hands`, `Mad River `, `Bombay` , `Danzka`];
  brandShow: string[] = [];
  selectedBrand: any = {}; 
  showMoreBrand = false;

  lifestyles: string[] = [`Gluten free (1)`, `Vegan`, `Organic`, `Low-Alcohol`, `Non-alcoholic`, `Natural Wine `, `Biodynamic Wine` , `Fair Trade Wine`];
  lifestyleShow: string[] = [];
  selectedLifestyle: any = {}; 
  showMoreLifestyles = false;

  constructor(private route: ActivatedRoute, private StoreService: StoreService,private router: Router) { 
    this.departments.forEach(department => {
      this.selectedDepartment[department] = false; 
    });
    this.departmentShow = this.departments.slice(0, 3);
    
    this.brands.forEach(brand => {
      this.selectedBrand[brand] = false
    });
    this.brandShow = this.brands.slice(0, 3);

    this.lifestyles.forEach(lifestyle => {
      this.selectedLifestyle[lifestyle] = false
    });
    this.lifestyleShow = this.lifestyles.slice(0, 3);
  }

  toggleShowMoreDepartment() {
    this.showMoreDepartment = !this.showMoreDepartment;
    if (this.showMoreDepartment) {
      this.departmentShow = this.departments; 
    } else {
      this.departmentShow = this.departments.slice(0, 3);
    }
  }

  toggleShowMoreBrand() {
    this.showMoreBrand = !this.showMoreBrand;
    if (this.showMoreBrand) {
      this.brandShow = this.brands; 
    } else {
      this.brandShow = this.brands.slice(0, 3);
    }
  }

  toggleShowMoreLifestyle() {
    this.showMoreLifestyles = !this.showMoreLifestyles;
    if (this.showMoreLifestyles) {
      this.lifestyleShow = this.lifestyles; 
    } else {
      this.lifestyleShow = this.lifestyles.slice(0, 3);
    }
  }

  toggleReset(){
    this.selectedBrand = {};
    this.selectedDepartment = {};
    this.selectedLifestyle = {};
  }

  toggleApply(){
    this.router.navigate(['/filter-result']); 
    modalController.dismiss()
  }

  areAnyCheckboxesSelected(): boolean {
    const brandValues = Object.values(this.selectedBrand);
    const lifestyleValues = Object.values(this.selectedLifestyle);
    const departmentValues = Object.values(this.selectedDepartment);
    return brandValues.concat(lifestyleValues,departmentValues).some(value => value === true);
  }
  

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

  addProduct(items: any){
    let cartDataNull = localStorage.getItem('localCart');
    if(cartDataNull == null) {
      let storeDataGet:any =[]
      storeDataGet.push(items)
      localStorage.setItem('localCart', JSON.stringify(storeDataGet));
    } else {
      var productId = items.id;
      let index:number = -1;
      this.itemCart = JSON.parse(localStorage.getItem('localCart') || '[]');
      for(let i = 0 ; i < this.itemCart.length; i++){
        if(parseInt(productId) === parseInt(this.itemCart[i].id)){
          this.itemCart[i].productQuantityAddDefault += items.productQuantityAddDefault
          index = i;
          break; 
        }
      }
      if(index == -1){
        this.itemCart.push(items)
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
        this.products = this.StoreService.getAllProducts();
      } else {
        this.products = this.StoreService.getAllProductsByTagName(this.tagName);
      }
    });
  }
}
