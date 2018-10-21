import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggableIconComponent } from './draggable-icon.component';

describe('DraggableIconComponent', () => {
  let component: DraggableIconComponent;
  let fixture: ComponentFixture<DraggableIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraggableIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraggableIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
