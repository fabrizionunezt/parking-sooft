import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIngresoVehiculoComponent } from './form-ingreso-vehiculo.component';

describe('FormIngresoVehiculoComponent', () => {
  let component: FormIngresoVehiculoComponent;
  let fixture: ComponentFixture<FormIngresoVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormIngresoVehiculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormIngresoVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
