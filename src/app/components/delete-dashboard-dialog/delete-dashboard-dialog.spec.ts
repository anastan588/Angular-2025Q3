import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDashboardDialog } from './delete-dashboard-dialog';

describe('DeleteDashboardDialog', () => {
  let component: DeleteDashboardDialog;
  let fixture: ComponentFixture<DeleteDashboardDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDashboardDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteDashboardDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
