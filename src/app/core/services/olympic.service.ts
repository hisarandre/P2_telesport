import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, tap, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Olympic} from '../models/Olympic';
import {Participation} from "../models/Participation";

@Injectable({
  providedIn: 'root',
})
export class OlympicService {

  private olympicUrl = './assets/mock/olympic.json';
  private readonly olympics$: BehaviorSubject<Olympic[]> = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) {
  }

  /**
   * Loads Olympic data from the local JSON file.
   * Updates the BehaviorSubject.
   * Handles HTTP errors.
   *
   * @returns Observable of the loaded Olympic array.
   */
  loadInitialData(): Observable<Olympic[]> {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((data: Olympic[]) => this.olympics$.next(data || [])),
      catchError((error: HttpErrorResponse) => {
        console.error('Error loading Olympic data:', error);

        let message = 'Failed to load data';

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

  /**
   * Returns an observable of the current Olympic dataset.
   *
   * @returns Observable of Olympic records.
   */
  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }

  /**
   * Finds an Olympic record by country ID.
   *
   * @param id - ID of the country to retrieve.
   * @returns Observable of the matching Olympic record, or null if not found.
   */
  getCountryById(id: number): Observable<Olympic | null> {
    return this.olympics$.pipe(
      map(olympics => olympics.find(olympic => olympic.id === id) || null),
      catchError(() => of(null))
    );
  }

  /**
   * Gets the number of distinct Olympic years across all countries.
   *
   * @param olympics - List of Olympic records.
   * @returns Number of unique Olympic years.
   */
  getJOsCount(olympics: Olympic[]): number {
    return this.getAllYears(olympics).length;
  }

  /**
   * Gets the number of countries that have participated in the Olympics.
   *
   * @param olympics - List of Olympic records.
   * @returns Number of countries.
   */
  getCountriesCount(olympics: Olympic[]): number {
    return olympics.length;
  }

  /**
   * Gets all unique Olympic years from the dataset.
   *
   * @param olympics - List of Olympic records.
   * @returns Sorted array of unique years.
   */
  getAllYears(olympics: Olympic[]): number[] {
    return [...new Set(
      olympics.flatMap(c =>
        c.participations?.map(p => p.year) || []
      )
    )].sort((a, b) => a - b);
  }

  /**
   * Gets the number of participations for a given country.
   *
   * @param olympic - Olympic record for a country.
   * @returns Number of participations.
   */
  getEntriesCount(olympic: Olympic): number {
    return olympic.participations?.length || 0;
  }

  /**
   * Calculates the total number of medals won by a country.
   *
   * @param olympic - Olympic record for a country.
   * @returns Total medal count.
   */
  getMedalsCount(olympic: Olympic): number {
    return olympic.participations?.reduce((sum: number, p: Participation) => sum + (p.medalsCount || 0), 0) || 0;
  }

  /**
   * Calculates the total number of athletes sent by a country.
   *
   * @param olympic - Olympic record for a country.
   * @returns Total athlete count.
   */
  getAthletesCount(olympic: Olympic): number {
    return olympic.participations?.reduce((sum: number, p: Participation) => sum + (p.athleteCount || 0), 0) || 0;
  }
}
