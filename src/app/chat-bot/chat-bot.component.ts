import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatBotService } from './chat-bot.service';
import { v4 as uuidv4 } from 'uuid';
import { ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

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
  @ViewChild(MatTable) table!: MatTable<any>;
  message: string = '';
  aiResponse?: AIResponse;
  displayedColumns: string[] = [];
  dataSource: any[] = [];
  userId: string = '';

  constructor(private chatBotService: ChatBotService) { }

  ngOnInit() {
    this.userId = uuidv4();
  }

  onSubmit() {
    this.chatBotService.getData(this.message, this.userId).subscribe({
      next: (response: AIResponse) => {
        this.aiResponse = response;

        if(!this.aiResponse?.rowData.length) return;

        this.displayedColumns = this.aiResponse.rowData[0];
        const rows = this.aiResponse.rowData.slice(1);
        
        // Convert each row to object {columnName: value}
        const newData = rows.map(row => {
          const obj: any = {};
          this.displayedColumns.forEach((col, idx) => {
            obj[col] = row[idx];
          });
          return obj;
        });
        this.dataSource = [...newData];
        this.table?.renderRows();
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

