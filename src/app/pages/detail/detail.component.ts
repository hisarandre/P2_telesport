import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {OlympicService} from 'src/app/core/services/olympic.service';
import {ChartService} from 'src/app/core/services/chart.service';
import {Olympic} from '../../core/models/Olympic';
import {Participation} from '../../core/models/Participation';
import {LineChart} from '../../core/models/LineChart';
import {StatCardComponent} from '../../components/stat-card/stat-card.component';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {LineChartComponent} from '../../components/line-chart/line-chart.component';
import {ArrowLeft, LucideAngularModule} from 'lucide-angular';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule,
    StatCardComponent,
    LineChartComponent,
  ],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  chartData$: Observable<LineChart[]> = of([]);
  countryData$: Observable<Olympic | null> = of(null);
  entriesCount$: Observable<number> = of(0);
  medalsCount$: Observable<number> = of(0);
  athletesCount$: Observable<number> = of(0);

  countryId!: number;

  ArrowLeft = ArrowLeft;

  constructor(
    private olympicService: OlympicService,
    private chartService: ChartService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.countryId = Number(this.route.snapshot.params["id"]);

    this.countryData$ = this.olympicService.getCountryById(this.countryId).pipe(
      tap(country => {
        if (!country) {
          console.error('Country not found');
          this.router.navigate(['/']);
        }
      }),
      catchError((error) => {
        console.error('Error loading country data:', error);
        this.router.navigate(['/']);
        return of(null);
      })
    );

    this.chartData$ = this.countryData$.pipe(
      map(country => {
        if (!country?.participations) return [];
        return this.chartService.transformToLineChartData({
          country: country.country,
          participations: [...country.participations].sort((a, b) => a.year - b.year),
          id: country.id
        });
      })
    );

    this.entriesCount$ = this.countryData$.pipe(
      map(country => country?.participations?.length || 0)
    );

    this.medalsCount$ = this.countryData$.pipe(
      map(country =>
        country?.participations?.reduce((sum: number, participation: Participation) =>
          sum + (participation.medalsCount || 0), 0
        ) || 0
      )
    );

    this.athletesCount$ = this.countryData$.pipe(
      map(country =>
        country?.participations?.reduce((sum: number, participation: Participation) =>
          sum + (participation.athleteCount || 0), 0
        ) || 0
      )
    );
  }
}
