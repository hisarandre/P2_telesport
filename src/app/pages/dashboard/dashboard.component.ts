import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';
import { PieChart } from '../../core/models/PieChart';
import { StatCardComponent } from '../../components/stat-card/stat-card.component';
import { PieChartComponent } from '../../components/pie-chart/pie-chart.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StatCardComponent, PieChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public chartData$: Observable<PieChart[]> = of([]);
  public countriesCount$: Observable<number> = of(0);
  public totalJOs$: Observable<number> = of(0);

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.initData();
  }

  initData(){
    this.chartData$ = this.olympicService.getChartData();
    this.countriesCount$ = this.olympicService.getCountriesCount();
    this.totalJOs$ = this.olympicService.getTotalJOs();
  }
}

