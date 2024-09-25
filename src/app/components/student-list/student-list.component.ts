import { Component, Input } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss',
  imports: [CdkDropListGroup, CdkDropList, CdkDrag, MatDialogModule, CommonModule] // Importing DragDropModule
})



export class StudentListComponent {
    teamA = ['student1', 'student2', 'student3', 'student7'];
    teamB = ['student4', 'student5', 'student6'];



  constructor(public dialogRef: MatDialogRef<StudentListComponent>) {}

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
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
