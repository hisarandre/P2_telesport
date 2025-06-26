import { Component, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LineChart } from '../../core/models/LineChart';
import { Router } from '@angular/router';
import { LucideAngularModule, Medal  } from 'lucide-angular';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [NgxChartsModule, LucideAngularModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent {
    @Input() data!: LineChart[];

    readonly medal = Medal ;

    xAxis: boolean = true;
    yAxis: boolean = true;
    showXAxisLabel: boolean = true;
    xAxisLabel: string = 'Dates';
    timeline: boolean = true;


  colorScheme: Color = {
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#0F766E']
  };
}
