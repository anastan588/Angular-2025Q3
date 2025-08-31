import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
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

@Component({
  selector: 'app-add-dashboard-dialog',
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
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
  ) {
    this.dashboardForm = new FormGroup({
      id: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern(/^[a-zA-Z0-9_-]+$/),
      ]),
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      icon: new FormControl('', Validators.required),
    });
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
