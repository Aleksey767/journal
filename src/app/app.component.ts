import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JournalComponent } from "./components/journal/journal.component";
import { PairTableComponent } from "./components/pair-table/pair-table.component"; 
import { StudentListComponent } from './components/student-list/student-list.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JournalComponent, PairTableComponent, StudentListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  pairs: { teamA: string; teamB: string }[] = [];

  constructor() {
  }



}