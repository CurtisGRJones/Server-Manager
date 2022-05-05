import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCornerMenuComponent } from './top-corner-menu.component';

describe('TopCornerMenuComponent', () => {
  let component: TopCornerMenuComponent;
  let fixture: ComponentFixture<TopCornerMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopCornerMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopCornerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
