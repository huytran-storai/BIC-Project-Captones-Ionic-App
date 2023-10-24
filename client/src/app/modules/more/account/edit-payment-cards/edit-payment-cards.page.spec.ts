import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPaymentCardsPage } from './edit-payment-cards.page';

describe('EditPaymentCardsPage', () => {
  let component: EditPaymentCardsPage;
  let fixture: ComponentFixture<EditPaymentCardsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditPaymentCardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
