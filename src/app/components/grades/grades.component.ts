import { Component, input } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ScoreInputDialogComponent } from '../../score-input-dialog-component/score-input-dialog-component.component';
import { FormsModule } from '@angular/forms';

interface Participant {
  name: string;
  scores: { [key: string]: number };
}

@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [CdkDropListGroup, CdkDropList, CdkDrag, MatDialogModule, CommonModule, FormsModule],
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent {
  teamA: Participant[] = [
    { name: 'Student1', scores: {} },
    { name: 'Student2', scores: {} }
  ];
  teamB: Participant[] = [
    { name: 'Student3', scores: {} },
    { name: 'Student4', scores: {} }
  ];  //TODO - сюда должны подтягиваться оценки с бд

  scoreColumns = ['Score 1', 'Score 2', 'Score3']; //TODO - сюда должны подтягиваться даты с бд
  availableColumnNames = ['Score A', 'Score B', 'Score C']; // Значения для выбора в score input dialog
  

  constructor(private dialog: MatDialog) {}


  updateScore(participant: any, column: string) {
    const scoreValue = participant.scores[column];

    // Проверка на корректность введенного значения
    if (isNaN(scoreValue) || scoreValue === '') {
      console.error("Некорректное значение для " + `${participant.name}` + " в колонке " + `${column}: ${scoreValue}`);
      participant.scores[column] = ''; // Сбрасываем значение при ошибке
    } else {
      // Преобразуем значение в число (можно использовать parseFloat для нецелых чисел)
      participant.scores[column] = parseFloat(scoreValue);
      console.log("Оценка для " + `${participant.name}` + " в колонке " + `${column}` + " обновлена на: " + `${participant.scores[column]}`);
    }
  }

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
    const dialogRef = this.dialog.open(ScoreInputDialogComponent, {
      data: { availableNames: this.availableColumnNames }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!this.scoreColumns.includes(result)) {
          this.scoreColumns.push(result);
        } else {
          console.log("Оценка " + result + " уже существует!");
        }
      }
    });
  }
 
    
  
}
