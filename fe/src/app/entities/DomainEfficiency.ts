export interface DomainEfficiency {
  rigId: string | undefined;
  date: string | Date;
  availableHours: number;
  periods: {
    id: string;
    startHour: string;
    endHour: string;
    classification: string;
    type: string;
    description?: string;
    fluidRatio: string;
    equipmentRatio: string;
  }[];
}
