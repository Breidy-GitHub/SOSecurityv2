import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MisAlertasPage } from './mis-alertas.page';

describe('MisAlertasPage', () => {
  let component: MisAlertasPage;
  let fixture: ComponentFixture<MisAlertasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MisAlertasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
