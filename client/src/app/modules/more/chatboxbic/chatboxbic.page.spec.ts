import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatboxbicPage } from './chatboxbic.page';

describe('ChatboxbicPage', () => {
  let component: ChatboxbicPage;
  let fixture: ComponentFixture<ChatboxbicPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChatboxbicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
