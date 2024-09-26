import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

interface Activity {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
  ],
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent {
 
  activities: Activity[] = [
    { id: 1, name: 'Denis', description: 'Complete documentation' },
    { id: 2, name: 'Oleg', description: 'Review pull requests' },
    { id: 3, name: 'Vladislav', description: 'Team meeting' },
  ];

 
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];

 
  name: string = '';
  description: string = '';
  nextId: number = 4;

  add() {
    if (this.name.trim() && this.description.trim()) {
      const newActivity: Activity = {
        id: this.nextId++,
        name: this.name,
        description: this.description
      };
      this.activities.push(newActivity);
      this.name = '';  
      this.description = '';  
    } else {
      alert('Please enter both name and description.');  
    }
  }

  deleteActivity(id: number) {
    this.activities = this.activities.filter(activity => activity.id !== id);
  }
}
