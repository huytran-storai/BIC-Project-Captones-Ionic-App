import { StoreService } from 'src/app/services/store.service';
import { Component, OnInit } from '@angular/core';
import { Tag } from '../../shared/models/Tag';
import { LoadingController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { modalController } from '@ionic/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-department',
  templateUrl: './department.page.html',
  styleUrls: ['./department.page.scss'],
})
export class DepartmentPage implements OnInit {
  brands: string[] = [
    `Chimay (1)`,
    `Corona`,
    `Dom Perignon`,
    `14 hands`,
    `Mad River `,
    `Bombay`,
    `Danzka`,
  ];
  brandShow: string[] = [];
  selectedBrand: { [key: string]: boolean } = {};
  showMoreBrand = false;
  lifestyles: string[] = [
    `Gluten free (1)`,
    `Vegan`,
    `Organic`,
    `Low-Alcohol`,
    `Non-alcoholic`,
    `Natural Wine `,
    `Biodynamic Wine`,
    `Fair Trade Wine`,
  ];
  lifestyleShow: string[] = [];
  selectedLifestyle: any = {};
  departments: string[] = [`Wine`, `Beer`, `Whiskey`, `Spirits & Liqueur`, `Vang/Champagne`];
  departmentShow: string[] = [];
  selectedDepartments: { [key: string]: boolean } = {};
  showMoreDepartment = false;
  tags?:Tag[];
  productTag: any;
  products: any;
  theBrands: any ;
  BrandDrink: any;
  constructor(
    private router: Router,
    private StoreService : StoreService,
    private loadingController: LoadingController,
    private modalController: ModalController,
    
    ) { 
    this.tags = StoreService.getAllTags();

    this.brands.forEach((brand) => {
      this.selectedBrand[brand] = false;
    });
    this.brandShow = this.brands.slice(0, 3);

    this.lifestyles.forEach((lifestyle) => {
      this.selectedLifestyle[lifestyle] = false;
    });
    this.lifestyleShow = this.lifestyles.slice(0, 3);
  }

  ngOnInit() {
    this.getTagsProduct()
    this.getBrand()
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
        this.productTag.forEach((tag: { DepartmentName: string | number; }) => {
          this.selectedDepartments[tag.DepartmentName] = false;
        });
        console.log("Product tags:", this.productTag)
        this.departmentShow = this.productTag.slice(0, 3);
      },
      (err: any) => {
        loading.dismiss();
        console.error('Error fetching current store data:', err);
      }
    );
  }

  logSelectedDepartments() {
    const selectedDepartments = Object.keys(this.selectedDepartments).filter(department => this.selectedDepartments[department]);
    const selectedBrand = Object.keys(this.selectedBrand).filter(aBrand => this.selectedBrand[aBrand]);
    const queryParams = { types: selectedDepartments.join(','), brands: selectedBrand.join(',') };
    console.log("queryParams", queryParams)
    this.router.navigate(['/filter-result'], { queryParams });
    this.modalController.dismiss(); 
  }

  // logSelectedDepartments() {
  //   const selectedDepartments = Object.keys(this.selectedDepartments).filter(department => this.selectedDepartments[department]);
  //   const selectedBrand = Object.keys(this.selectedBrand).filter(aBrand => this.selectedBrand[aBrand]);
  
  //   selectedDepartments.forEach(department => {
  //     const queryParams: any = { types: department, brands: selectedBrand.join(',') };
  //     console.log("queryParams", queryParams);
  //     this.router.navigate(['/filter-result'], { queryParams });
  //   });
  
  //   this.modalController.dismiss(); 
  // }
  
  
  

  // logSelectedDepartments() {
  //   const selectedDepartments = [];
  //   const selectedBrand = [];
  //   for (const department in this.selectedDepartments) {
  //     if (this.selectedDepartments[department]) {
  //       selectedDepartments.push(department);
  //     }
  //   }
  //   for (const brand in this.selectedBrand) {
  //     if (this.selectedBrand[brand]) {
  //       selectedBrand.push(brand);
  //     }
  //   }
  //   const queryParams = { types: selectedDepartments.join(','), brands: selectedBrand.join(',') };
  //   console.log("queryParams", queryParams)
  //   this.router.navigate(['/filter-result'], { queryParams });
  //   this.modalController.dismiss(); 
  // }
  
  

  chooseDringType: string[] = [];

  handleChange(depart: any) {
    console.log('Current value:', depart.DepartmentName);
    const index = this.chooseDringType.indexOf(depart.DepartmentName);
    if (index === -1) {
      this.chooseDringType.push(depart.DepartmentName); // Thêm giá trị mới vào mảng nếu nó chưa tồn tại
    } else {
      this.chooseDringType.splice(index, 1); // Xóa giá trị khỏi mảng nếu nó đã tồn tại
    }
    this.getBrand();
  }
  
  
  async getBrand() {
    const loading = await this.loadingController.create({ 
      cssClass: 'loading',
    });
    await loading.present();
    this.StoreService.getProducts().subscribe(
      (res: any) => {
        loading.dismiss();
        this.theBrands = res.data.filter((item: any) => this.chooseDringType.includes(item.attributes.DrinkType));
  
        const brandNames = this.theBrands.map(
          (tag: { attributes: { Brand: any } }) => tag.attributes.Brand
        );
        this.BrandDrink = [...new Set(brandNames)];
        this.theBrands.forEach((tag: { BrandName: string | number; }) => {
          this.selectedBrand[tag.BrandName] = false;
        });
      },
      (err: any) => {
        loading.dismiss();
        console.error('Error fetching current store data:', err);
      }
    );
  }
  

  // async getBrand() {
  //   const loading = await this.loadingController.create({ 
  //     cssClass: 'loading',
  //   });
  //   await loading.present();
  //   this.StoreService.getProducts().subscribe(
  //     (res: any) => {
  //       loading.dismiss();
  //       const brands = res.data.filter((item: any) => this.chooseDringType.includes(item.attributes.DrinkType));
  //               this.theBrands.forEach((tag: { BrandName: string | number; }) => {
  //         this.selectedBrand[tag.BrandName] = false;
  //       });
  //       // Sử dụng Set để loại bỏ các giá trị trùng lặp
  //       const uniqueBrands = [...new Set(brands.map((brand: any) => brand.BrandName))];
  //       this.theBrands = uniqueBrands.map((brandName: any) => brands.find((brand: any) => brand.BrandName === brandName));
  //       console.log("brandType:", this.theBrands);
  //     },
  //     (err: any) => {
  //       loading.dismiss();
  //       console.error('Error fetching current store data:', err);
  //     }
  //   );
  // }
  
  

  toggleShowMoreBrand() {
    this.showMoreBrand = !this.showMoreBrand;
    if (this.showMoreBrand) {
      this.brandShow = this.brands;
    } else {
      this.brandShow = this.brands.slice(0, 3);
    }
  }

  toggleShowMoreDepartment() {
    this.showMoreDepartment = !this.showMoreDepartment;
    if (this.showMoreDepartment) {
      this.departmentShow = this.departments;
    } else {
      this.departmentShow = this.departments.slice(0, 3);
    }
  }

  toggleReset() {
    this.selectedBrand = {};
    this.selectedDepartments = {};
    this.selectedLifestyle = {};
  }

  // toggleApply() {
  //   this.router.navigate(['filter-result']);
  //   modalController.dismiss();
  // }


  areAnyCheckboxesSelected(): boolean {
    const brandValues = Object.values(this.selectedBrand);
    const lifestyleValues = Object.values(this.selectedLifestyle);
    const departmentValues = Object.values(this.selectedDepartments);
    return brandValues
      .concat( departmentValues)
      .some((value) => value === true);
  }

}
