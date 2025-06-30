import {Component, Input, OnInit} from '@angular/core';
import {Color, NgxChartsModule, ScaleType} from '@swimlane/ngx-charts';
import {LineChart, LineChartSeries} from '../../core/models/LineChart';
import {LucideAngularModule, Medal} from 'lucide-angular';
import {Participation} from "../../core/models/Participation";

@Component({
    selector: 'app-line-chart',
    standalone: true,
    imports: [NgxChartsModule, LucideAngularModule],
    templateUrl: './line-chart.component.html',
    styleUrl: './line-chart.component.scss'
})

export class LineChartComponent implements OnInit {
    @Input() country!: string;
    @Input() participations!: Participation[];

    medal = Medal;

    lineChartData: LineChart[] = [];
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

    ngOnInit(): void {
        this.lineChartData = this.transformToLineChartData(this.country, this.participations);
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
