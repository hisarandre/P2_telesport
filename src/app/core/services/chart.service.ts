import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { Participation } from '../models/Participation';
import { PieChart } from '../models/PieChart';
import { LineChart, LineChartSeries } from '../models/LineChart';

export interface CountryMedals {
  country: string;
  totalMedals: number;
  id: number;
}

export interface CountryParticipation {
  country: string;
  participations: Participation[];
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class ChartService {

  constructor(private http: HttpClient) {}

    transformToPieChartData(data: CountryMedals[]): PieChart[] {
      return data.map(item => ({
        name: item.country,
        value: item.totalMedals,
        extra: { id: item.id }
      }));
    }

    transformToLineChartData(data: CountryParticipation): LineChart[] {
      if (!data) {
        return [];
      }

      const series: LineChartSeries[] = data.participations.map((participation: Participation): LineChartSeries => ({
        name: participation.year.toString(),
        value: participation.medalsCount
      }));

      return [{
        series: series,
        name: data.country
      }];
    }
}
