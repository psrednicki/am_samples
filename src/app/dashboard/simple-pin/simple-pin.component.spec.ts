import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplePinComponent } from './simple-pin.component';

describe('SimplePinComponent', () => {
  let component: SimplePinComponent;
  let fixture: ComponentFixture<SimplePinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplePinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplePinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
