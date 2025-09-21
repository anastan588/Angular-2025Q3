import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDashboardDialog } from './add-dashboard-dialog';

describe('AddDashboardDialog', () => {
  let component: AddDashboardDialog;
  let fixture: ComponentFixture<AddDashboardDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDashboardDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDashboardDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
