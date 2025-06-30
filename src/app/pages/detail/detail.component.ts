import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {OlympicService} from 'src/app/core/services/olympic.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {StatCardComponent} from '../../components/stat-card/stat-card.component';
import {LineChartComponent} from '../../components/line-chart/line-chart.component';
import {ArrowLeft, LucideAngularModule, LucideIconData} from 'lucide-angular';
import {CommonModule} from '@angular/common';
import {LineChart} from "../../core/models/LineChart";
import {SpinnerComponent} from "../../components/spinner/spinner.component";
import {ErrorMessageComponent} from "../../components/error-message/error-message.component";
import {Participation} from "../../core/models/Participation";
import {Olympic} from "../../core/models/Olympic";

@Component({
    selector: 'app-detail',
    standalone: true,
    imports: [
        CommonModule,
        RouterLink,
        LucideAngularModule,
        StatCardComponent,
        LineChartComponent,
        SpinnerComponent,
        ErrorMessageComponent,
    ],
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription = new Subscription();

    ArrowLeft: LucideIconData = ArrowLeft;
    countryId!: number;
    country: string = '';
    participations: Participation[] = [];
    medalsCount: number = 0;
    entriesCount: number = 0;
    athletesCount: number = 0;
    chartData: LineChart[] = [];

    isLoading: boolean = true;
    hasError: boolean = false;
    errorMessage: string = '';

    constructor(
        private olympicService: OlympicService,
        private readonly route: ActivatedRoute,
        private readonly router: Router
    ) {
    }

    ngOnInit(): void {
        this.countryId = Number(this.route.snapshot.params["id"]);
        this.loadData();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    loadData(): void {
        this.isLoading = true;
        this.hasError = false;

        const olympicSubscription = this.olympicService
            .getCountryById(this.countryId)
            .subscribe({
                next: (data: Olympic | null) => {
                    if (data) {
                        this.country = data.country;
                        this.participations = data.participations;
                        this.medalsCount = this.olympicService.getMedalsCount(data);
                        this.entriesCount = this.olympicService.getEntriesCount(data);
                        this.athletesCount = this.olympicService.getAthletesCount(data);
                    } else {
                        this.router.navigate(['/404']);
                    }

                    this.isLoading = false;
                },
                error: (err: Error) => {
                    console.error('Error loading data', err);
                    this.hasError = true;
                    this.errorMessage = 'Failed to load data';
                    this.isLoading = false;
                },
            });

        this.subscriptions.add(olympicSubscription);
    }
}
