import {Component, Input, OnInit} from '@angular/core';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {PieChart} from '../../core/models/PieChart';
import {Router} from '@angular/router';
import {LucideAngularModule, LucideIconData, Medal} from 'lucide-angular';
import {Olympic} from "../../core/models/Olympic";
import {OlympicService} from "../../core/services/olympic.service";

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [NgxChartsModule, LucideAngularModule,],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit {
  @Input() olympics!: Olympic[];

  showChartLabels: boolean = true;
  medal: LucideIconData = Medal;
  pieChartData: PieChart[] = [];

  constructor(
    private router: Router,
    private olympicService: OlympicService,
  ) {
  }

  ngOnInit(): void {
    this.pieChartData = this.transformToPieChartData(this.olympics);
  }

  onSelect(data: PieChart): void {
    if (data?.extra?.id) {
      this.router.navigate(['/detail', data.extra.id]);
    }
  }

  transformToPieChartData(data: Olympic[]): PieChart[] {
    return data.map(item => ({
      name: item.country,
      value: this.olympicService.getMedalsCount(item),
      extra: {id: item.id}
    }));
  }
}
