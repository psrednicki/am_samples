import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentPositionComponent } from './current-position.component';

describe('CurrentPositionComponent', () => {
  let component: CurrentPositionComponent;
  let fixture: ComponentFixture<CurrentPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
