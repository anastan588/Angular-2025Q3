import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AuthDialog } from '../auth-dialog/auth-dialog';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from 'src/app/services/data';
import { Router } from '@angular/router';
import { UniqueTitleValidator } from 'src/app/validators/uniqueTitleValidator';
import { DashBoardItem } from 'src/app/data/types';
import { UniqueIDValidator } from 'src/app/validators/uniqueIDValidator';
import { idCaseValidator } from 'src/app/validators/idCaseValidator';
import { titleCaseValidator } from 'src/app/validators/titleCaseValidator';
import { duplicateValidator } from 'src/app/validators/duplicateValidator';

@Component({
  selector: 'app-add-dashboard-dialog',
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './add-dashboard-dialog.html',
  styleUrl: './add-dashboard-dialog.scss',
})
export class AddDashboardDialog {
  dashboardForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddDashboardDialog>,
    private dataService: DataService,
    private router: Router,
    private uniqueTitleValidator: UniqueTitleValidator,
    private uniqueIDValidator: UniqueIDValidator,
    private caseIDValidator: idCaseValidator,
    private caseTitleValidator: titleCaseValidator,
    private duplicateValidator: duplicateValidator,
    @Inject(MAT_DIALOG_DATA)
    public data: { dashboards: DashBoardItem[] },
  ) {
    this.dashboardForm = new FormGroup(
      {
        id: new FormControl(
          '',
          [Validators.required, Validators.maxLength(30)],
          [
            this.caseIDValidator.validateID(),
            this.uniqueIDValidator.validateID(this.data.dashboards),
          ],
        ),
        title: new FormControl(
          '',
          [Validators.required, Validators.maxLength(50)],
          [
            this.caseTitleValidator.validateTitle(),
            this.uniqueTitleValidator.validateTitle(this.data.dashboards),
          ],
        ),
        icon: new FormControl('', Validators.required),
      },
      { validators: this.duplicateValidator.validateDuplicate('id', 'title') },
    );
  }

  get id() {
    return this.dashboardForm.get('id');
  }

  get title() {
    return this.dashboardForm.get('title');
  }

  get icon() {
    return this.dashboardForm.get('icon');
  }

  markIdAsTouched() {
    const control = this.dashboardForm.get('id');
    if (control?.errors) control?.markAsTouched();
  }

  markTitleAsTouched() {
    const control = this.dashboardForm.get('title');
    if (control?.errors) control?.markAsTouched();
  }

  markIconAsTouched() {
    const control = this.dashboardForm.get('icon');
    if (control?.errors) control?.markAsTouched();
  }

  onSubmit() {
    if (this.dashboardForm.valid) {
      const newDashboard = this.dashboardForm.value;
      this.dataService.createBoard(newDashboard).subscribe((dashboardItem) => {
        this.dataService.getDashBoards().subscribe();
        this.router.navigate([dashboardItem.title, dashboardItem.id]);
        this.dialogRef.close();
      });
    }
  }

  close(): void {
    console.log('close');
    this.dialogRef.close();
  }
}
