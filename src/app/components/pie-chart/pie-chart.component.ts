import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {PieChart} from '../../core/models/PieChart';
import {LucideAngularModule, LucideIconData, Medal} from 'lucide-angular';

@Component({
    selector: 'app-pie-chart',
    standalone: true,
    imports: [NgxChartsModule, LucideAngularModule,],
    templateUrl: './pie-chart.component.html',
    styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {
    @Input() pieChartData: PieChart[] = [];
    @Output() onSelect = new EventEmitter<PieChart>();

    showChartLabels: boolean = true;
    medal: LucideIconData = Medal;

    constructor() {
    }

    onSelectChart(data: PieChart): void {
        this.onSelect.emit(data);
    }
}
