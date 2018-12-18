import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryMyCollectionComponent } from './query-my-collection.component';

describe('QueryMyCollectionComponent', () => {
  let component: QueryMyCollectionComponent;
  let fixture: ComponentFixture<QueryMyCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryMyCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryMyCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
