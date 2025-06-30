import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {OlympicService} from 'src/app/core/services/olympic.service';
import {ChartService} from 'src/app/core/services/chart.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {StatCardComponent} from '../../components/stat-card/stat-card.component';
import {LineChartComponent} from '../../components/line-chart/line-chart.component';
import {ArrowLeft, LucideAngularModule, LucideIconData} from 'lucide-angular';
import {CommonModule} from '@angular/common';
import {LineChart} from "../../core/models/LineChart";
import {SpinnerComponent} from "../../components/spinner/spinner.component";
import {ErrorMessageComponent} from "../../components/error-message/error-message.component";

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule,
    StatCardComponent,
    LineChartComponent,
    SpinnerComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();

  ArrowLeft: LucideIconData = ArrowLeft;
  countryId!: number;
  countryName: string = '';
  medalsCount: number = 0;
  entriesCount: number = 0;
  athletesCount: number = 0;
  chartData: LineChart[] = [];

  isLoading: boolean = true;
  hasError: boolean = false;
  errorMessage: string = '';

  constructor(
    private olympicService: OlympicService,
    private chartService: ChartService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.countryId = Number(this.route.snapshot.params["id"]);
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadData(): void {
    this.isLoading = true;
    this.hasError = false;

    const olympicSubscription = this.olympicService
      .getCountryById(this.countryId)
      .subscribe({
        next: (data) => {
          if (data) {
            this.countryName = data.country;
            this.chartData = this.chartService.transformToLineChartData(data.country, data.participations);
            this.medalsCount = this.olympicService.getMedalsCount(data);
            this.entriesCount = this.olympicService.getEntriesCount(data);
            this.athletesCount = this.olympicService.getAthletesCount(data);
          } else {
            this.router.navigate(['/404']);
          }

          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading data', err);
          this.hasError = true;
          this.errorMessage = 'Failed to load data';
          this.isLoading = false;
        },
      });

    this.subscriptions.add(olympicSubscription);
  }
}
