import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAddressBookPage } from './edit-address-book.page';

describe('EditAddressBookPage', () => {
  let component: EditAddressBookPage;
  let fixture: ComponentFixture<EditAddressBookPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditAddressBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
