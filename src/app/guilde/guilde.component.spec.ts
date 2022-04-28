import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildeComponent } from './guilde.component';

describe('GuildeComponent', () => {
  let component: GuildeComponent;
  let fixture: ComponentFixture<GuildeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuildeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuildeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
