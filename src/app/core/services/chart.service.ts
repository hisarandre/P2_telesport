import {Injectable} from '@angular/core';
import {Participation} from '../models/Participation';
import {PieChart} from '../models/PieChart';
import {LineChart, LineChartSeries} from '../models/LineChart';
import {Olympic} from "../models/Olympic";
import {OlympicService} from "./olympic.service";

@Injectable({
  providedIn: 'root',
})
export class ChartService {

  constructor(
    private olympicService: OlympicService,
  ) {
  }

  transformToPieChartData(data: Olympic[]): PieChart[] {
    return data.map(item => ({
      name: item.country,
      value: this.olympicService.getMedalsCount(item),
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
