import { StoreService } from 'src/app/services/store.service';
import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  setOpen(product: any) {
    this.selectedProduct = product;
    this.isModalOpen = true;
    // console.log(this.selectedProduct);
  }
  
  setClose(isOpen:boolean) {
    this.selectedProduct = null;
    this.isModalOpen = isOpen;
  }

  constructor(private route: ActivatedRoute, private StoreService: StoreService) { }

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
