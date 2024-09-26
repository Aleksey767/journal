import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-score-input-dialog',
  templateUrl: './score-input-dialog-component.component.html',
  styleUrl: './score-input-dialog-component.component.scss',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class ScoreInputDialogComponent {
  score: number = 0;

  constructor(public dialogRef: MatDialogRef<ScoreInputDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close(this.score);
  }

  
}