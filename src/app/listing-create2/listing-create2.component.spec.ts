import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingCreate2Component } from './listing-create2.component';

describe('ListingCreate2Component', () => {
  let component: ListingCreate2Component;
  let fixture: ComponentFixture<ListingCreate2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingCreate2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingCreate2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
