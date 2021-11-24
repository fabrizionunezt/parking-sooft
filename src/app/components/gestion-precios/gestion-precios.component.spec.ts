import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPreciosComponent } from './gestion-precios.component';

describe('GestionPreciosComponent', () => {
  let component: GestionPreciosComponent;
  let fixture: ComponentFixture<GestionPreciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionPreciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionPreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
