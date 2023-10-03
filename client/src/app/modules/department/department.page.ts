import { StoreService } from 'src/app/services/store.service';
import { Component, OnInit } from '@angular/core';
import { Tag } from '../../shared/models/Tag';

@Component({
  selector: 'app-department',
  templateUrl: './department.page.html',
  styleUrls: ['./department.page.scss'],
})
export class DepartmentPage implements OnInit {
  tags?:Tag[];
  constructor(StoreService:StoreService) { 
    this.tags = StoreService.getAllTags();
  }

  ngOnInit() {
  }

}
