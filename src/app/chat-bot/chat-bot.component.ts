import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatBotService } from './chat-bot.service';

interface AIResponse {
  summary: string;
  query: string;
  rowData: any[];
  error: string;
}

@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    FormsModule
  ],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.css'
})
export class ChatBotComponent {
  message: string = '';
  aiResponse?: AIResponse;
  displayedColumns: string[] = [];
  dataSource: any[] = [];

  constructor(private chatBotService: ChatBotService) { }

  onSubmit() {
    this.chatBotService.getData(this.message).subscribe({
      next: (response: AIResponse) => {
        this.aiResponse = response;
        
        this.displayedColumns = [];
        this.dataSource = [];

        if (this.aiResponse?.rowData && Array.isArray(this.aiResponse.rowData) && this.aiResponse.rowData.length > 0) {
          this.displayedColumns = this.aiResponse.rowData[0].map((col: any) => col.toString());

          this.dataSource = this.aiResponse.rowData.slice(1).map((row: any[]) => {
            const rowData: { [key: string]: any } = {};
            this.displayedColumns.forEach((col, index) => {
              rowData[col] = row[index] === null ? 'NULL' : row[index];
            });
            return rowData;
          });
        }
      },
      error: (err) => {
        console.error('Error fetching data:', err);
        this.aiResponse = { summary: 'Error occurred', query: 'NA', rowData: [], error: err.message };
        this.displayedColumns = [];
        this.dataSource = [];
      }
    });
  }
}
