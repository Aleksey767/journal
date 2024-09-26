import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JournalComponent } from "./components/journal/journal.component";
import { PairTableComponent } from "./components/pair-table/pair-table.component"; 
import { StudentListComponent } from './components/student-list/student-list.component';
import { CommonModule } from '@angular/common';
import {GradesComponent} from "./components/grades/grades.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JournalComponent, PairTableComponent, CommonModule,GradesComponent,StudentListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] 
})
export class AppComponent {
  pairs: { teamA: string; teamB: string }[] = [];
  activeTab: string = 'journal';

  constructor() { }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  isActive(tab: string): boolean {
    return this.activeTab === tab;
  }

  onPairsGenerated(pairs: { teamA: string; teamB: string }[]) {
    this.pairs = pairs;
  }
}
