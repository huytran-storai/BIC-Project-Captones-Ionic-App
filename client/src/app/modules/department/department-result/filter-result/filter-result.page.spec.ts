import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterResultPage } from './filter-result.page';

describe('FilterResultPage', () => {
  let component: FilterResultPage;
  let fixture: ComponentFixture<FilterResultPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FilterResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
