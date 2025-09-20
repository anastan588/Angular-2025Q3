import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { Data } from 'src/app/data/types';
import { TabService } from 'src/app/services/tab';
import { loadCurrentDashboard } from 'src/app/store/smarthome.selectors';
import { DashboardState } from 'src/app/store/smarthome.store';
import { UniqueTitleValidator } from 'src/app/validators/uniqueTitleValidator';

@Component({
  selector: 'app-edit-tab.dialog',
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
  templateUrl: './edit-tab.dialog.html',
  styleUrl: './edit-tab.dialog.scss',
})
export class EditTabDialog {
  tabTitleForm: FormGroup;
  dashBoard!: Data;
  constructor(
    public dialogRef: MatDialogRef<EditTabDialog>,
    private tabService: TabService,
    private uniqueTitleValidator: UniqueTitleValidator,
    @Inject(MAT_DIALOG_DATA)
    public data: { tabId: string, tabTitle: string },
    private store: Store<{ dashboard: DashboardState }>,
  ) {
    this.store.select(loadCurrentDashboard).subscribe((value) => {
      this.dashBoard = value;
    });
    this.tabTitleForm = new FormGroup({
      title: new FormControl(
        this.data.tabTitle,
        [Validators.required, Validators.maxLength(50)],
        [this.uniqueTitleValidator.validateTitle(this.dashBoard)],
      ),
    });
  }

  get title() {
    return this.tabTitleForm.get('title');
  }

  markTitleAsTouched() {
    const control = this.tabTitleForm.get('title');
    if (control?.errors) control?.markAsTouched();
  }

  onSubmit() {
    if (this.tabTitleForm.valid) {
      const newTabTitle = this.tabTitleForm.value;
      this.tabService.editTabTitleStore(this.data.tabId, newTabTitle.title);
      this.dialogRef.close();
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
