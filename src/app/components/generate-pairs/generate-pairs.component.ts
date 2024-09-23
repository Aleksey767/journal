import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Team } from '../journal/journal.component'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LessonModalComponent } from '../lesson-modal/lesson-modal.component'; 
import { AttendanceModalComponent } from '../attendance-modal/attendance-modal.component'; 

@Component({
  selector: 'app-generate-pairs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './generate-pairs.component.html',
  styleUrls: ['./generate-pairs.component.scss']
})
export class GeneratePairsComponent {

  @Input() teams: Team[] = [];
  @Output() pairsGenerated = new EventEmitter<{ teamA: string; teamB: string }[]>();
  pairs: { teamA: string; teamB: string }[] = [];

  constructor(private modalService: NgbModal) { }

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

  private shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

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

  openAddAttendanceModal() {
    const modalRef = this.modalService.open(AttendanceModalComponent);
    modalRef.componentInstance.students = this.getStudents(); 
    modalRef.componentInstance.lessons = this.getLessons(); 
  }

  getStudents(): { id: number; name: string }[] {
    return this.teams.flatMap(team => team.students.map(student => ({ id: student.id, name: student.name })));
  }

  getLessons(): { id: number; date: number }[] {
    return [];
  }
}
