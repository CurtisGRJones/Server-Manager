import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerUsageComponent } from './server-usage.component';

describe('ServerUsageComponent', () => {
  let component: ServerUsageComponent;
  let fixture: ComponentFixture<ServerUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerUsageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
