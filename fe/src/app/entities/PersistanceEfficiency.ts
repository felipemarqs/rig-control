export interface PersistanceEfficiency {
  date: string | Date;
  availableHours: number;
  rigId: string | undefined;
  periods: {
    startHour: string;
    endHour: string;
    classification: string;
    description: string | undefined;
    type: string;
  }[];
  equipmentRatio: {ratio: string}[];
  fluidRatio: {ratio: string}[];
}
