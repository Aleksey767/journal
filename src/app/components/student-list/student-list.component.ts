import { Component, Input } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';


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
      { name: 'Charlie', scores: {} },
      { name: 'David', scores: {} }
    ];

    scoreColumns: string[] = []

    constructor(public dialogRef: MatDialogRef<StudentListComponent>) {}

  

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
        this.scoreColumns.push(formattedDate);
        this.updateScores(formattedDate);
  }

  updateScores(scoreKey: string) {
    this.teamA.forEach(participant => {
      participant.scores[scoreKey] = Math.floor(Math.random() * 100);
    });
    this.teamB.forEach(participant => {
      participant.scores[scoreKey] = Math.floor(Math.random() * 100);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}







// import { Component } from '@angular/core';
// import { MatDialogRef } from '@angular/material/dialog';
// import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
// import { MatDialogModule } from '@angular/material/dialog';




// @Component({
//   selector: 'app-student-list',
//   standalone: true,
//   imports: [MatDialogModule],
//   templateUrl: './student-list.component.html',
//   styleUrl: './student-list.component.scss'
// })
// export class StudentListComponent {
//   teamA = ['Студент 1', 'Студент 2', 'Студент 3'];
//   teamB = ['Студент 4', 'Студент 5', 'Студент 6'];

//   constructor(public dialogRef: MatDialogRef<StudentListComponent>) {}

//   drop(event: CdkDragDrop<string[]>) {
//     if (event.previousContainer === event.container) {
//       moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
//     } else {
//       transferArrayItem(event.previousContainer.data,
//                         event.container.data,
//                         event.previousIndex,
//                         event.currentIndex);
//     }
//   }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }
