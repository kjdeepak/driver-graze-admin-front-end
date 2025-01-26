import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllDriversComponent } from './view-all-drivers.component';

describe('ViewAllDriversComponent', () => {
  let component: ViewAllDriversComponent;
  let fixture: ComponentFixture<ViewAllDriversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllDriversComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAllDriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
