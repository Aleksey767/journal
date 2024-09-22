import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
 
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
  attended: boolean;
  id: number;
  lessonId: number;
  studentId: number;
}

interface Data {
  attendanceLog: AttendanceLog[];
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

  constructor(private http: HttpClient) {}
 
  formatDates() {
    this.formattedDates = this.lessons.map(lesson => {
      const date = new Date(lesson.date);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      return `${day}.${month}`;
    });
  }
 
  checkAttendance(studentId: number, lessonId: number): string {
    const log = this.attendanceLog.find(
      (log) => log.studentId === studentId && log.lessonId === lessonId
    );
    return log && log.attended ? '+' : '-';
  }
 
  getStudentsByTeamId(teamId: number): Student[] {
    const team = this.teams.find(t => t.id === teamId);
    return team ? team.students : [];
  }

  ngOnInit(): void {
    this.http.get<Data>('example.json').subscribe(
      (data) => { 
        this.attendanceLog = data.attendanceLog;
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
