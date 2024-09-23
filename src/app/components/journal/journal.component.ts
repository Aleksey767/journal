import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LessonModalComponent } from '../lesson-modal/lesson-modal.component'; 
import { HttpClientModule } from '@angular/common/http';
import { AttendanceModalComponent } from '../attendance-modal/attendance-modal.component';
export interface Student {
  id: number;
  name: string;
}

export interface Team {
  id: number;
  name: string;
  students: Student[];
}

interface Lesson {
  date: number; 
  id: number;
}

interface AttendanceLog {
  isAttended: boolean; 
  id: number;
  lessonId: number;
  studentId: number;
}

interface Data {
  attendanceLogs: AttendanceLog[];
  lessons: Lesson[];
  teams: Team[];
}

@Component({
  selector: 'app-journal',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss']
})
export class JournalComponent implements OnInit {
  lessons: Lesson[] = [];
  formattedDates: string[] = [];
  teams: Team[] = [];
  attendanceLog: AttendanceLog[] = [];
  names: { [key: number]: string } = {};

  constructor(private http: HttpClient,private modalService: NgbModal) {}

  formatDates() {
    this.formattedDates = this.lessons.map(lesson => {
        const date = new Date(lesson.date*1000);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear(); 
        return `${day}.${month}.${year}`; 
    });
}

  checkAttendance(studentId: number, lessonId: number): string {
    const log = this.attendanceLog.find(
      (log) => log.studentId === studentId && log.lessonId === lessonId
    );
    return log && log.isAttended ? '+' : '-'; 
  }
  openAddAttendanceModal() {
    const modalRef = this.modalService.open(AttendanceModalComponent);
    modalRef.componentInstance.students = this.getStudents();
    modalRef.componentInstance.lessons = this.lessons;
  }
 

  getStudents(): { id: number; name: string }[] {
    return this.teams.flatMap(team => team.students.map(student => ({ id: student.id, name: student.name })));
  }

  ngOnInit(): void {
    this.http.get<Data>('http://13.60.83.249:8085/journalApp/api/v1/journal').subscribe(
    //  this.http.get<Data>('http://localhost:8080/api/v1/journal').subscribe(
      (data) => {
        this.attendanceLog = data.attendanceLogs; 
        this.lessons = data.lessons;
        this.teams = data.teams;

        this.teams.forEach((team: Team) => {
          team.students.forEach((student: Student) => {
            this.names[student.id] = student.name;
          });
        });

        this.formatDates();
      },
      (error) => {
        console.error('Ошибка при загрузке данных:', error);
      }
    );
  }
}
