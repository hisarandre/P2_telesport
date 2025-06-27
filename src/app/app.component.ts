import {Component, OnInit} from '@angular/core';
import {take} from 'rxjs';
import {OlympicService} from './core/services/olympic.service';
import {RouterModule} from '@angular/router';
import {SpinnerComponent} from "./components/spinner/spinner.component";
import {ErrorMessageComponent} from "./components/error-message/error-message.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    SpinnerComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  public isLoading = true;
  public hasError = false;
  errorMessage: string = '';

  constructor(private olympicService: OlympicService) {
  }

  ngOnInit(): void {
    this.olympicService.loadInitialData().pipe(take(1)).subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }
}
