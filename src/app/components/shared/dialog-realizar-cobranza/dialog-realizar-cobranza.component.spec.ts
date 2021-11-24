import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRealizarCobranzaComponent } from './dialog-realizar-cobranza.component';

describe('DialogRealizarCobranzaComponent', () => {
  let component: DialogRealizarCobranzaComponent;
  let fixture: ComponentFixture<DialogRealizarCobranzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRealizarCobranzaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRealizarCobranzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
