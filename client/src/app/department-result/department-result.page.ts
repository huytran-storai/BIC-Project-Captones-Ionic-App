import { StoreService } from 'src/app/services/store.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-department-result',
  templateUrl: './department-result.page.html',
  styleUrls: ['./department-result.page.scss'],
})
export class DepartmentResultPage implements OnInit {
  tagName!: string;
  products: any[] = [];

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
