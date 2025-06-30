import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap, throwError} from 'rxjs';
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

        let message = 'Failed to load data'

        if (error.status === 0) {
          message = 'Unable to connect to the server. Please check your internet connection.';
        } else if (error.status === 404) {
          message = 'Olympic data file not found.';
        }

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
      map(olympics => olympics.find(olympic => olympic.id === id) || null)
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

  getEntriesCount(olympic: Olympic): number {
    return olympic.participations?.length || 0;
  }

  getMedalsCount(olympic: Olympic): number {
    return olympic.participations?.reduce((sum: number, p: any) => sum + (p.medalsCount || 0), 0) || 0;
  }

  getAthletesCount(olympic: Olympic): number {
    return olympic.participations?.reduce((sum: number, p: any) => sum + (p.athleteCount || 0), 0) || 0;
  }
}
