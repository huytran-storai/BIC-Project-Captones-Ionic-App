import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-tabmenu',
  templateUrl: './tabmenu.component.html',
  styleUrls: ['./tabmenu.component.scss'],
})
export class TabmenuComponent  implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {}
  //Refeshpage
  // refreshPage() {
  //   this.location.replaceState('/home');
  //   window.location.reload();
  // }
}
