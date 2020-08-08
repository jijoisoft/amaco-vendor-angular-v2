import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsSummaryComponent } from './reviews-summary.component';

describe('ReviewsSummaryComponent', () => {
  let component: ReviewsSummaryComponent;
  let fixture: ComponentFixture<ReviewsSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewsSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
