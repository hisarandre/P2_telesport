import {Component, OnDestroy, OnInit} from '@angular/core';
import {OlympicService} from 'src/app/core/services/olympic.service';
import {StatCardComponent} from '../../components/stat-card/stat-card.component';
import {PieChartComponent} from '../../components/pie-chart/pie-chart.component';
import {CommonModule} from '@angular/common';
import {Subscription} from "rxjs";
import {ErrorMessageComponent} from "../../components/error-message/error-message.component";
import {SpinnerComponent} from "../../components/spinner/spinner.component";
import {Olympic} from "../../core/models/Olympic";
import {PieChart} from "../../core/models/PieChart";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StatCardComponent, PieChartComponent, ErrorMessageComponent, SpinnerComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();

  chartData: PieChart[] = [];
  countriesCount: number = 0;
  JOsCount: number = 0;
  isLoading: boolean = true;
  hasError: boolean = false;
  errorMessage: string = '';

  constructor(
    private olympicService: OlympicService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadData(): void {
    this.isLoading = true;
    this.hasError = false;

    const olympicSubscription = this.olympicService
      .getOlympics()
      .subscribe({
        next: (data: Olympic[]) => {
          if (data && data.length > 0) {
            this.chartData = this.transformToPieChartData(data);
            this.countriesCount = this.olympicService.getCountriesCount(data);
            this.JOsCount = this.olympicService.getJOsCount(data);
          }
          this.isLoading = false;
        },
        error: (err: Error) => {
          console.error('Error loading data', err);
          this.hasError = true;
          this.errorMessage = 'Failed to load data';
          this.isLoading = false;
        },
      });

    this.subscriptions.add(olympicSubscription);
  }

  transformToPieChartData(data: Olympic[]): PieChart[] {
    return data.map(item => ({
      name: item.country,
      value: this.olympicService.getMedalsCount(item),
      extra: {id: item.id}
    }));
  }

  handlePieChartSelection(data: PieChart): void {
    if (data?.extra?.id) {
      this.router.navigate(['/detail', data.extra.id]);
    }
  }
}
