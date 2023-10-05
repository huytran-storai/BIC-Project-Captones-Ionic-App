import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckOutOrderPage } from './checkout-order.page';

describe('CheckOutOrderPage', () => {
  let component: CheckOutOrderPage;
  let fixture: ComponentFixture<CheckOutOrderPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CheckOutOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
