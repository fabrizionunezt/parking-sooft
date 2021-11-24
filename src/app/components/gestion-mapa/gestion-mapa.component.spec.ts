import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMapaComponent } from './gestion-mapa.component';

describe('GestionMapaComponent', () => {
  let component: GestionMapaComponent;
  let fixture: ComponentFixture<GestionMapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionMapaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
