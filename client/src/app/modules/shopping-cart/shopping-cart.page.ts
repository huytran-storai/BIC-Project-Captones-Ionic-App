import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
// import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
  
})

export class ShoppingCartPage implements OnInit {
  constructor(private location: Location) { }

  ngOnInit() { 
  }
  productquantity = 1;
  inc(){
      this.productquantity += 1
    
  }
  dec(){
    if(this.productquantity > 1){
      this.productquantity -= 1
    }
  }
  ngModel(){

  }
 
  refreshPage() {
    
    this.location.replaceState('/home');
    window.location.reload();
  }
  
}