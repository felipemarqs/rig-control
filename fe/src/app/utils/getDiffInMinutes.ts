import {differenceInMinutes} from "date-fns";

export const getDiffInMinutes = (horaFinal: Date, horaInicial: Date) => {
  const isoEndDate = horaFinal.toISOString().split("T")[0];
  const isoHour = horaFinal.toISOString().split("T")[1];

  let endDate = horaFinal;
  if (isoHour === "02:59:00.000Z") {
    endDate = new Date(`${isoEndDate}T03:00:00.000Z`);
  }

  return differenceInMinutes(endDate, horaInicial);
};
