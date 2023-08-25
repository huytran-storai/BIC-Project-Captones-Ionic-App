import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepartmentResultPage } from './department-result.page';

describe('DepartmentResultPage', () => {
  let component: DepartmentResultPage;
  let fixture: ComponentFixture<DepartmentResultPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DepartmentResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
