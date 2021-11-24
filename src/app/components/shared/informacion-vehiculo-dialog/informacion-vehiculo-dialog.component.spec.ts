import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionVehiculoDialogComponent } from './informacion-vehiculo-dialog.component';

describe('InformacionVehiculoDialogComponent', () => {
  let component: InformacionVehiculoDialogComponent;
  let fixture: ComponentFixture<InformacionVehiculoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionVehiculoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionVehiculoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
