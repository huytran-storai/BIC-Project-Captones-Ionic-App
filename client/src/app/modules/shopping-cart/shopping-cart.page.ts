import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
// import { FormsModule } from '@angular/forms';
interface arrayProductCart{
  id:number;
  nameProduct:string;
  productQuantity:number;
  priceProduct:number;
  optionsProduct:string;
  image:string;
  priceDetails:number
}
const arrayProduct: arrayProductCart[]=[
  {
    id:1,
    nameProduct:"Alberta Beef Sandwich Combo",
    productQuantity:1,
    priceProduct:13.00,
    optionsProduct:"Alberta Beef Sandwich Combo",
    image:"../../assets/beefsandwich.jpg",
    priceDetails:13.00,
  },
  {
    id:2,
    nameProduct:"Alberta Beef Sandwich Combo 2",
    productQuantity:1,
    priceProduct:14.00,
    optionsProduct:"Alberta Beef Sandwich Combo 2",
    image:"../../assets/beefsandwich.jpg",
    priceDetails:14.00,
  },
  {
    id:3,
    nameProduct:"Alberta Beef Sandwich Combo 3",
    productQuantity:1,
    priceProduct:15.00,
    optionsProduct:"Alberta Beef Sandwich Combo 3",
    image:"../../assets/beefsandwich.jpg",
    priceDetails:15.00,
  }
]
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
  
})

export class ShoppingCartPage implements OnInit {
  constructor(private location: Location) { }
 
  ngOnInit() { 
  }
  arrayProductPicked = arrayProduct;

// Choose Order Type
  pickupChecked: boolean = false;
  deliveryChecked: boolean = false;
  onCheckboxChange(type: 'pickup' | 'delivery') {
    if (type === 'pickup') {
      this.deliveryChecked = false;
    } else if (type === 'delivery') {
      this.pickupChecked = false;
    }
  }
  // Quantity Item
  
  numberOfItems = arrayProduct.length;

// increase or decrease quantity
  inc(prod: any){
      prod.productQuantity += 1
  }
  dec(prod: any){
    if(prod.productQuantity > 1){
      prod.productQuantity -= 1
    }
    
  }
// SubTotal
  subTotal(): number {
    let subTotal = 0;
    for (const product of this.arrayProductPicked) {
      subTotal +=  product.priceProduct * product.productQuantity;
    }
    return subTotal;
  }
// Tax
  tax = 0.65
// count array

  ngModel(){

  }
 
  refreshPage() {
    
    this.location.replaceState('/home');
    window.location.reload();
  }
  
}