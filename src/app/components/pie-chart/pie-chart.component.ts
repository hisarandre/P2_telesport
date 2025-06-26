import { Component, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChart } from '../../core/models/PieChart';
import { Router } from '@angular/router';
import { LucideAngularModule, Medal  } from 'lucide-angular';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [NgxChartsModule, LucideAngularModule,],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {
  @Input() data!: PieChart[];

  public showChartLabels: boolean = true;
  readonly medal = Medal ;

  constructor(private router: Router) {}

  onSelect(data: PieChart) : void {
      if (data?.extra?.id) {
        this.router.navigate(['/detail', data.extra.id]);
      }
    }
}
