import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingCreate3Component } from './listing-create3.component';

describe('ListingCreate3Component', () => {
  let component: ListingCreate3Component;
  let fixture: ComponentFixture<ListingCreate3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingCreate3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingCreate3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
