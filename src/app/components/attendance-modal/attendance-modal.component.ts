import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-attendance-modal',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  templateUrl: './attendance-modal.component.html',
})
export class AttendanceModalComponent {
  @Input() students: { id: number; name: string }[] = [];
  @Input() lessons: { id: number; date: number }[] = [];

  selectedStudentId: number | null = null;
  selectedLessonId: number | null = null;

  constructor(public activeModal: NgbActiveModal, private http: HttpClient) { }

  formatDate(date: number): string {
    const d = new Date(date * 1000);
    return `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()}`;
  }

  addAttendance() {
    if (this.selectedStudentId && this.selectedLessonId) {
      const attendanceLog = {
        studentId: this.selectedStudentId,
        lessonId: this.selectedLessonId,
        attended: true,
      };
      this.http.post('http://13.60.83.249:8085/journalApp/api/v1/attendancelog', attendanceLog).subscribe({
        next: () => {
          this.activeModal.close('Attendance added');
          location.reload();
        },
        error: (error) => {
          console.error('Adding attendance - OK', error);
        },
        complete: () => {
          console.log('Adding attendance - FAIL');
        }
      });
    }
  }
}