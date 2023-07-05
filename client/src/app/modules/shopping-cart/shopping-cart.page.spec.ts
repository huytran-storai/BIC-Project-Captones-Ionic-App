import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ShoppingCartPage } from './shopping-cart.page';

describe('ShoppingCartPage', () => {
  let component: ShoppingCartPage;
  let fixture: ComponentFixture<ShoppingCartPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShoppingCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
