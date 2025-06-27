import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Participation} from '../models/Participation';
import {PieChart} from '../models/PieChart';
import {LineChart, LineChartSeries} from '../models/LineChart';
import {Olympic} from "../models/Olympic";

@Injectable({
  providedIn: 'root',
})
export class ChartService {

  constructor(private http: HttpClient) {
  }

  transformToPieChartData(data: Olympic[]): PieChart[] {
    return data.map(item => ({
      name: item.country,
      value: Olympic.getMedalsCount(item),
      extra: {id: item.id}
    }));
  }

  transformToLineChartData(country: string, participations: Participation[]): LineChart[] {
    const series: LineChartSeries[] = participations.map((participation: Participation): LineChartSeries => ({
      name: participation.year.toString(),
      value: participation.medalsCount
    }));

    return [{
      series: series,
      name: country
    }];
  }
}
