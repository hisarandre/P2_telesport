import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  public isLoading = true;
  public error: string | null = null;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
      this.olympicService.loadInitialData().pipe(take(1)).subscribe({
        next: () => {
          this.isLoading = false;
        },
        error: (error) => {
          this.error = error.message;
          this.isLoading = false;
        }
      });
    }
}
