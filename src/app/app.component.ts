import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GeneratePairsComponent } from "./components/generate-pairs/generate-pairs.component";
import { JournalComponent } from "./components/journal/journal.component";
import { PairTableComponent } from "./components/pair-table/pair-table.component"; 
import { Team } from './components/journal/journal.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GeneratePairsComponent, JournalComponent, PairTableComponent,HttpClientModule],


  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  teams: Team[] = [];
  pairs: { teamA: string; teamB: string }[] = [];

  constructor(private http: HttpClient) {
    this.loadTeams();
  }

  loadTeams() {
    this.http.get<{ teams: Team[] }>('http://13.60.83.249:8085/api/v1/journal').subscribe(
    //  this.http.get<{ teams: Team[] }>('http://localhost:8080/api/v1/journal').subscribe(
      (data) => {
        this.teams = data.teams;
      },
      (error) => {
        console.error('Ошибка при загрузке данных:', error);
      }
    );
  }
}