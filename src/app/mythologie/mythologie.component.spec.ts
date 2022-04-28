import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MythologieComponent } from './mythologie.component';

describe('MythologieComponent', () => {
  let component: MythologieComponent;
  let fixture: ComponentFixture<MythologieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MythologieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MythologieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
