import { Component, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChart } from '../../core/models/PieChart';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {
  @Input() data!: PieChart[]  | null;
  public showChartLabels: boolean = true;

  onSelect(data: PieChart): void {
    console.log('on select');
  }
}
