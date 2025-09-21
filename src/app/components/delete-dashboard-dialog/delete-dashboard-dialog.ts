import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Data, Router } from '@angular/router';
import { DashBoardItem } from 'src/app/data/types';
import { DataService } from 'src/app/services/data';

@Component({
  selector: 'app-delete-dashboard-dialog',
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './delete-dashboard-dialog.html',
  styleUrl: './delete-dashboard-dialog.scss',
})
export class DeleteDashboardDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteDashboardDialog>,
    private dataService: DataService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA)
    public data: { dashboard: DashBoardItem; dashboards: Data },
  ) {}

  delete() {
    this.dataService
      .deleteDashBoardById(this.data.dashboard.id)
      .subscribe((dashboardItem) => {
        this.dataService.getDashBoards().subscribe();
        this.router.navigate([
          this.data.dashboards[0].title,
          this.data.dashboards[0].id,
        ]);
        this.dialogRef.close();
      });
  }

  close(): void {
    this.dialogRef.close();
  }
}
