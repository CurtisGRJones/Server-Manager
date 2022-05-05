import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Err500Component } from './err500.component';

describe('Err500Component', () => {
  let component: Err500Component;
  let fixture: ComponentFixture<Err500Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Err500Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Err500Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
