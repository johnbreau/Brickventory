import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMyCollectionComponent } from './display-my-collection.component';

describe('DisplayMyCollectionComponent', () => {
  let component: DisplayMyCollectionComponent;
  let fixture: ComponentFixture<DisplayMyCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayMyCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayMyCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
