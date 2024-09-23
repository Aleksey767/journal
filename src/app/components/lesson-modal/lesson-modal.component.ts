import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lesson-modal',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  templateUrl: './lesson-modal.component.html',

})
export class LessonModalComponent {
  selectedDate!: string;

  constructor(public activeModal: NgbActiveModal, private http: HttpClient) {}

  addLesson() {
    const unixTimestamp = Math.floor(new Date(this.selectedDate).getTime() / 1000);
    const lessonData = { lessonDate: unixTimestamp };

    this.http.post('http://13.60.83.249:8085/journalApp/api/v1/lesson', lessonData).subscribe( 
      response => {
        console.log('Lesson added successfully', response);
        this.activeModal.close();
      },
      error => {
        console.error('Error adding lesson', error);
      }
    );
  }
}
