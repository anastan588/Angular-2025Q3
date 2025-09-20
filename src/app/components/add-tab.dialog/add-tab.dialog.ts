import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Tab } from 'src/app/data/types';
import { TabService } from 'src/app/services/tab';

@Component({
  selector: 'app-add-tab.dialog',
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
  templateUrl: './add-tab.dialog.html',
  styleUrl: './add-tab.dialog.scss',
})
export class AddTabDialog {
  tabForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddTabDialog>,
    public tabService: TabService,
  ) {
    this.tabForm = new FormGroup({
      id: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
    });
  }
  get id() {
    return this.tabForm.get('id');
  }

  get title() {
    return this.tabForm.get('title');
  }

  markIdAsTouched() {
    const control = this.tabForm.get('id');
    if (control?.errors) control?.markAsTouched();
  }

  markTitleAsTouched() {
    const control = this.tabForm.get('title');
    if (control?.errors) control?.markAsTouched();
  }
  onSubmit() {
    if (this.tabForm.valid) {
      const formValue = this.tabForm.value;
      const newTab: Tab = {
        id: formValue.id,
        title: formValue.id,
        cards: [],
      };
      this.tabService.addNewTabToStore(newTab);
      this.dialogRef.close();
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
