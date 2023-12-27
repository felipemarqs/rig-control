type DataEntry = {
  month: string;
  avg: number;
};

export const convertMonthToName = (data: DataEntry[]): DataEntry[] => {
  const monthNames: {[key: string]: string} = {
    "01": "Janeiro",
    "02": "Fevereiro",
    "03": "Março",
    "04": "Abril",
    "05": "Maio",
    "06": "Junho",
    "07": "Julho",
    "08": "Agosto",
    "09": "Setembro",
    "10": "Outubro",
    "11": "Novembro",
    "12": "Dezembro",
  };

  const outputData = data.map(({month, avg}) => {
    const monthNumber = month.split("-")[1];

    return {
      month: monthNames[monthNumber],
      avg: Number(((avg * 100) / 24).toFixed(2)),
    };
  });

  return outputData;
};
