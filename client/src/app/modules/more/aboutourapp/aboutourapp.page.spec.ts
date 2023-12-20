import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutourappPage } from './aboutourapp.page';

describe('AboutourappPage', () => {
  let component: AboutourappPage;
  let fixture: ComponentFixture<AboutourappPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AboutourappPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
