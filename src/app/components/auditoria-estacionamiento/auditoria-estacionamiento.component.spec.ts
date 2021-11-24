import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditoriaEstacionamientoComponent } from './auditoria-estacionamiento.component';

describe('AuditoriaEstacionamientoComponent', () => {
  let component: AuditoriaEstacionamientoComponent;
  let fixture: ComponentFixture<AuditoriaEstacionamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditoriaEstacionamientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditoriaEstacionamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
