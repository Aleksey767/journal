import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LessonModalComponent } from '../lesson-modal/lesson-modal.component';
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
  pairs: { teamA: string; teamB: string }[] = [];
  @Output() pairsGenerated = new EventEmitter<{ teamA: string; teamB: string }[]>();


  constructor(private http: HttpClient, private modalService: NgbModal) { }
  openAddLessonModal() {
    const modalRef = this.modalService.open(LessonModalComponent);
    modalRef.result.then(
      result => {
        console.log('Modal closed with result:', result);
      },
      reason => {
        console.log('Modal dismissed with reason:', reason);
      }
    );
  }
  private shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  generatePairs() {
    const teamAStudents = this.teams[0]?.students || [];
    const teamBStudents = this.teams[1]?.students || [];

    if (teamAStudents.length === 0 || teamBStudents.length === 0) {
      console.error('Одна из команд пуста');
      return;
    }

    const shuffledTeamA = this.shuffleArray([...teamAStudents]);
    const shuffledTeamB = this.shuffleArray([...teamBStudents]);

    this.pairs = [];
    const maxPairs = Math.min(shuffledTeamA.length, shuffledTeamB.length);
    for (let i = 0; i < maxPairs; i++) {
      this.pairs.push({
        teamA: shuffledTeamA[i].name,
        teamB: shuffledTeamB[i].name
      });
    }

    this.pairsGenerated.emit(this.pairs);
  }

  formatDates() {
    this.formattedDates = this.lessons.map(lesson => {
      const date = new Date(lesson.date * 1000);
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
    this.http.get<Data>('http://13.60.83.249:8085/journalApp/api/v1/journal').subscribe({
      next: (data) => {
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
      error: (error) => {
        console.error('Loading journal - FAIL', error);
      },
      complete: () => {
        console.log('Loading journal - OK');
      }
    });
  }
}
