import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatBotComponent } from './chat-bot/chat-bot.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatBotComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ChatWithSqlRelationalDatabaseUsingAI';
}
