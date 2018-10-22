import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPinComponent } from './custom-pin.component';

describe('CustomPinComponent', () => {
  let component: CustomPinComponent;
  let fixture: ComponentFixture<CustomPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomPinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
