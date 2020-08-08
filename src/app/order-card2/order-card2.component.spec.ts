import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCard2Component } from './order-card2.component';

describe('OrderCard2Component', () => {
  let component: OrderCard2Component;
  let fixture: ComponentFixture<OrderCard2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCard2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
