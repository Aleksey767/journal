import { Component } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ScoreInputDialogComponent } from '../../score-input-dialog-component/score-input-dialog-component.component';


interface Participant {
  name: string;
  scores: { [key: string]: number };
}

@Component({
  standalone: true,
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss',
  imports: [CdkDropListGroup, CdkDropList, CdkDrag, MatDialogModule, CommonModule]
})



export class StudentListComponent {
    teamA: Participant[] = [
      {name: 'Student1', scores: {}},
      {name: 'Student2', scores: {}}
    ];
    teamB: Participant[] = [
      { name: 'Student3', scores: {} },
      { name: 'Student4', scores: {} }
    ];

    scoreColumns: string[] = []

    constructor(public dialogRef: MatDialogRef<StudentListComponent>, private dialog: MatDialog) {}

  

  drop(event: CdkDragDrop<Participant[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  addScoreColumn() {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        if (!this.scoreColumns.includes(formattedDate)) {
          this.scoreColumns.push(formattedDate);
          this.updateScores(formattedDate);
      } else {
          console.log("Оценка за " + formattedDate + " уже существует!");
          this.updateScores(formattedDate);
      }
  }

  async updateScores(scoreKey: string) {
    const maxParticipants = Math.max(this.teamA.length, this.teamB.length);

    for (let i = 0; i < maxParticipants; i++) {
        if (i < this.teamA.length) {
            const dialogRef = this.dialog.open(ScoreInputDialogComponent);
            const score = await dialogRef.afterClosed().toPromise();
            if (score !== undefined) {
                // проверка на существование оценки
                if (!this.teamA[i].scores[scoreKey]) {
                    this.teamA[i].scores[scoreKey] = score;
                } else {
                    // this.teamA[i].scores[scoreKey] += score; // для суммирования
                    console.log("Оценка для " + `${this.teamA[i].name}` + " уже существует!");
                    this.teamA[i].scores[scoreKey] = score;
                }
            }
        }

        if (i < this.teamB.length) {
            const dialogRef = this.dialog.open(ScoreInputDialogComponent);
            const score = await dialogRef.afterClosed().toPromise();
            if (score !== undefined) {
                
                if (!this.teamB[i].scores[scoreKey]) {
                    this.teamB[i].scores[scoreKey] = score;
                } else {
                    // this.teamB[i].scores[scoreKey] += score;
                    console.log("Оценка для " + `${this.teamB[i].name}` + " уже существует!");
                    this.teamB[i].scores[scoreKey] = score;
                }
            }
        }
    }
}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
