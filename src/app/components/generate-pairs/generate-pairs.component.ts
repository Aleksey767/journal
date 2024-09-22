import { Component, Input,Output,EventEmitter  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student, Team } from '../journal/journal.component';

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
}
