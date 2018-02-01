import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLanderComponent } from './edit-lander.component';

describe('EditLanderComponent', () => {
  let component: EditLanderComponent;
  let fixture: ComponentFixture<EditLanderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLanderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLanderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
