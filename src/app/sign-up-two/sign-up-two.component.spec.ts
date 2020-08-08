import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpTwoComponent } from './sign-up-two.component';

describe('SignUpTwoComponent', () => {
  let component: SignUpTwoComponent;
  let fixture: ComponentFixture<SignUpTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
