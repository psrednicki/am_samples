import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSpriteComponent } from './custom-sprite.component';

describe('CustomSpriteComponent', () => {
  let component: CustomSpriteComponent;
  let fixture: ComponentFixture<CustomSpriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomSpriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSpriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
