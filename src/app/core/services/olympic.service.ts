import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, tap, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Olympic} from '../models/Olympic';

export interface OlympicMedals {
  country: string;
  medalsCount: number;
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private readonly olympics$: BehaviorSubject<Olympic[]> = new BehaviorSubject<Olympic[]>([]);

  constructor(
    private http: HttpClient,
  ) {
  }

  loadInitialData(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((data: Olympic[]) => this.olympics$.next(data || [])),
      catchError((error: HttpErrorResponse) => {
        console.error('Error loading Olympic data:', error);
        const message = this.getErrorMessage(error.status)

        this.olympics$.next([]);
        return throwError(() => new Error(message));
      })
    );
  }

  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  getCountryById(id: number): Observable<Olympic | null> {
    return this.olympics$.pipe(
      map(olympics => olympics.find(olympic => olympic.id === id) || null),
      catchError(() => of(null))
    );
  }

  getMedalsByCountries(): Observable<OlympicMedals[]> {
    return this.olympics$.pipe(
      map((olympics: Olympic[]) => {
        if (!olympics?.length) return [];

        return olympics.map((olympic: Olympic) => ({
          country: olympic.country,
          medalsCount: Olympic.getMedalsCount(olympic),
          id: olympic.id
        }));
      }),
      catchError(() => of([]))
    );
  }

  getJOsCount(olympics: Olympic[]): number {
    return this.getAllYears(olympics).length
  }

  getCountriesCount(olympics: Olympic[]): number {
    return olympics.length;
  }

  getAllYears(olympics: Olympic[]): number[] {
    return [...new Set(
      olympics.flatMap(c =>
        c.participations?.map(p => p.year) || []
      )
    )].sort((a, b) => a - b);
  }

  private getErrorMessage(status: number): string {
    switch (status) {
      case 0:
        return 'No internet connection';
      case 404:
        return 'Data not found';
      case 500:
        return 'Server error';
      case 403:
        return 'Access denied';
      default:
        return 'Failed to load data';
    }
  }
}
