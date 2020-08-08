import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingCreate1Component } from './listing-create1.component';

describe('ListingCreate1Component', () => {
  let component: ListingCreate1Component;
  let fixture: ComponentFixture<ListingCreate1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingCreate1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingCreate1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
