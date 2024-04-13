import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CortesCajaComponent } from './cortes-caja.component';

describe('CortesCajaComponent', () => {
  let component: CortesCajaComponent;
  let fixture: ComponentFixture<CortesCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CortesCajaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CortesCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
