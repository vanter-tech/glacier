import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuePayments } from './due-payments';

describe('DuePayments', () => {
  let component: DuePayments;
  let fixture: ComponentFixture<DuePayments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DuePayments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DuePayments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
