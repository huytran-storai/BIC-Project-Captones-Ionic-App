import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Tag } from 'src/app/shared/models/Tag';
import { register } from 'swiper/element/bundle';
register();
@Component({
  selector: 'app-winegroup',
  templateUrl: './winegroup.component.html',
  styleUrls: ['./winegroup.component.scss'],
})
export class WinegroupComponent implements OnInit {
  tags?: Tag[];
  constructor(StoreService: StoreService) {
    this.tags = StoreService.getAllTags();
  }

  ngOnInit() { }

}
