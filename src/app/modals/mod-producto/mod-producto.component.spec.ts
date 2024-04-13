import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ModProductoComponent } from './mod-producto.component';

describe('ModProductoComponent', () => {
  let component: ModProductoComponent;
  let fixture: ComponentFixture<ModProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
});


