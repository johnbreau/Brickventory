import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryLegoGroupSetsComponent } from './query-lego-group-sets.component';

describe('QueryLegoGroupCollectionComponent', () => {
  let component: QueryLegoGroupSetsComponent;
  let fixture: ComponentFixture<QueryLegoGroupSetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryLegoGroupSetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryLegoGroupSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
