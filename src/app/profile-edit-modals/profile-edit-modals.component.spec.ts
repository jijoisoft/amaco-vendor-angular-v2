import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditModalsComponent } from './profile-edit-modals.component';

describe('ProfileEditModalsComponent', () => {
  let component: ProfileEditModalsComponent;
  let fixture: ComponentFixture<ProfileEditModalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileEditModalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
