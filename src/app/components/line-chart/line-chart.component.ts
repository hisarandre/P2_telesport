import {Component, Input} from '@angular/core';
import {Color, NgxChartsModule, ScaleType} from '@swimlane/ngx-charts';
import {LineChart} from '../../core/models/LineChart';
import {LucideAngularModule, Medal} from 'lucide-angular';

@Component({
    selector: 'app-line-chart',
    standalone: true,
    imports: [NgxChartsModule, LucideAngularModule],
    templateUrl: './line-chart.component.html',
    styleUrl: './line-chart.component.scss'
})

export class LineChartComponent {
    @Input() country!: string;
    @Input() lineChartData!: LineChart[];

    medal = Medal;

    xAxis: boolean = true;
    yAxis: boolean = true;
    showXAxisLabel: boolean = true;
    xAxisLabel: string = 'Dates';
    colorScheme: Color = {
        name: 'customScheme',
        selectable: true,
        group: ScaleType.Ordinal,
        domain: ['#0F766E']
    };

}
