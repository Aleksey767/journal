import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  standalone: true,
  selector: 'app-score-input-dialog',
  templateUrl: './score-input-dialog-component.component.html',
  styleUrl: './score-input-dialog-component.component.scss',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule, FormsModule, MatSelectModule]
})
export class ScoreInputDialogComponent {
  selectedScoreName: string = '';

  constructor(
    public dialogRef: MatDialogRef<ScoreInputDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { availableNames: string[] }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close(this.selectedScoreName);
  }
}