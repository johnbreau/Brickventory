import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToMyCollectionComponent } from './add-to-my-collection.component';

describe('AddToMyCollectionComponent', () => {
  let component: AddToMyCollectionComponent;
  let fixture: ComponentFixture<AddToMyCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToMyCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToMyCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
