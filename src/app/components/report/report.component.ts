import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report',
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
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {
  email: string = '';
  telegramChatId: string = '';

  sendEmail() {
    if (this.email) { 
      console.log(`Email отправлен на: ${this.email}`);
      alert(`Email отправлен на: ${this.email}`);
      this.email = '';  
    } else {
      alert('Пожалуйста, введите email.');
    }
  }

  sendTelegramChatId() {
    if (this.telegramChatId) { 
      console.log(`Telegram Chat ID отправлен: ${this.telegramChatId}`);
      alert(`Telegram Chat ID отправлен: ${this.telegramChatId}`);
      this.telegramChatId = ''; 
    } else {
      alert('Пожалуйста, введите Telegram Chat ID.');
    }
  }
}
