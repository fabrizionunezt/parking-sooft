import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTermCondComponent } from './dialog-term-cond.component';

describe('DialogTermCondComponent', () => {
  let component: DialogTermCondComponent;
  let fixture: ComponentFixture<DialogTermCondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTermCondComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTermCondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
