import {Participation} from "./Participation";

export class Olympic {
  constructor(
    public id: number,
    public country: string,
    public participations: Participation[]
  ) {
  }

  static getSortedParticipations(olympic: Olympic): Participation[] {
    return [...(olympic.participations || [])].sort((a, b) => a.year - b.year);
  }

  static getEntriesCount(olympic: Olympic): number {
    return olympic.participations?.length || 0;
  }

  static getMedalsCount(olympic: Olympic): number {
    return olympic.participations?.reduce((sum: number, p: any) => sum + (p.medalsCount || 0), 0) || 0;
  }

  static getAthletesCount(olympic: Olympic): number {
    return olympic.participations?.reduce((sum: number, p: any) => sum + (p.athleteCount || 0), 0) || 0;
  }

}
