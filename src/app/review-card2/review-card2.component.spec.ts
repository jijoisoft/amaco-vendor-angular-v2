import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCard2Component } from './review-card2.component';

describe('ReviewCard2Component', () => {
  let component: ReviewCard2Component;
  let fixture: ComponentFixture<ReviewCard2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewCard2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewCard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
