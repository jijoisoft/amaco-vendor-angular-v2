import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingCreate4Component } from './listing-create4.component';

describe('ListingCreate4Component', () => {
  let component: ListingCreate4Component;
  let fixture: ComponentFixture<ListingCreate4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingCreate4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingCreate4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
