import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { PieChart } from '../models/PieChart';


@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private readonly olympics$: BehaviorSubject<Olympic[]> = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) {}

  loadInitialData(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((data: Olympic[]) => this.olympics$.next(data || [])),
      catchError((error: HttpErrorResponse) => {
        console.error('Error loading Olympic data:', error);

        let message = 'Failed to load Olympic data';

        if (error.status === 0) {
          message = 'No internet connection';
        } else if (error.status === 404) {
          message = 'Olympic data not found';
        }

        this.olympics$.next([]);
        return throwError(() => new Error(message));
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getChartData(): Observable<PieChart[]> {
      return this.olympics$.pipe(
        map((olympics: Olympic[]) => {
          if (!olympics?.length) return [];

          return olympics.map((country: Olympic): PieChart => ({
            id: country.id,
            name: country.country,
            value: country.participations?.reduce((sum, p) => sum + (p.medalsCount || 0), 0) || 0
          }));
        }),
        catchError(() => of([]))
      );
    }

  getCountriesCount(): Observable<number> {
      return this.olympics$.pipe(
        map((olympics: Olympic[]) => olympics?.length || 0),
        catchError(() => of(0))
      );
    }

    getTotalJOs(): Observable<number> {
      return this.olympics$.pipe(
        map((olympics: Olympic[]) => {
          if (!olympics?.length) return 0;

          const years = olympics.flatMap(country =>
            country.participations?.map(p => p.year) || []
          );
          return [...new Set(years)].length;
        }),
        catchError(() => of(0))
      );
    }

    getCountryById(id: number): Observable<Olympic | null> {
      return this.olympics$.pipe(
        map(olympics => olympics.find(c => c.id === id) || null),
        catchError(() => of(null))
      );
    }

}
