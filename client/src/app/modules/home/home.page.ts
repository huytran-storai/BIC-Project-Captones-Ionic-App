import { Component, OnInit } from '@angular/core';
import { StoreInfo } from 'src/app/shared/models/StoreInfo';
import { UserService } from 'src/app/services/user.service';
import { StoreService } from 'src/app/services/store.service';
import { BlogsService } from 'src/app/services/blogs.service';
import { ProductItem } from 'src/app/shared/models/ProductItem';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public user: any;
  public blogsData: any;
  public productData: any;
  public currentStore: any;
  productLists: any;

  constructor(
    private userService: UserService,
    private storeService: StoreService,
    private blogsService: BlogsService,
    private productService: StoreService,

  ) { }

  ngOnInit() {
    // const storedUserData = localStorage.getItem('userData');
    // if (storedUserData) {
    //   this.user = JSON.parse(storedUserData);
    // } else {
    //   this.getUserData();
    // }
    this.getUserData();

    this.getCurrentStore();
    // this.getBlogsRender();
    // this.getProductRender();
    // this.getAllProducts();
    (function (d, m) {
      var kommunicateSettings = {
        appId: "1161fc142cdd17f8662859181b2c974bc",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
        automaticChatOpen: true,
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      (window as any).kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, (window as any).kommunicate || {});
  }

  getUserData() {
    this.userService.getUserData().subscribe(res => {
      this.user = res?.user;
      console.log("User data:", this.user);
      // localStorage.setItem('userData', JSON.stringify(this.user));
    });
  }
  

  getCurrentStore() {
    this.storeService.getCurrentStoreAddress().subscribe(
      (res: any) => {
        this.currentStore = res?.data[0]?.attributes;
        console.log("find store", this.currentStore)
      },
      (err) => {
        console.error('Error fetching current store data:', err);
      }
    );
  }



  // getProductRender() {
  //   this.productService.getProducts().subscribe(
  //     (res: any) => {
  //       this.productData = res.data.map((item: any) => item.attributes);
  //       console.log("Product lists:", this.productData)
  //     },
  //     (err: any) => {
  //       console.error('Error fetching current store data:', err);
  //     }
  //   );
  // }
}
