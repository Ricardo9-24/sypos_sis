import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioCajaComponent } from './inicio-caja.component';

describe('InicioCajaComponent', () => {
  let component: InicioCajaComponent;
  let fixture: ComponentFixture<InicioCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioCajaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
