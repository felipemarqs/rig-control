// Definição do tipo para cada entrada de dados
type DataEntry = {
  month: string;
  avg: number;
};

// Função para converter o mês para o nome em português e calcular a média em porcentagem do dia
export const convertMonthToName = (data: DataEntry[]): DataEntry[] => {
  // Mapeia os nomes dos meses em português para os respectivos números de mês
  const monthNames: Record<string, string> = {
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

  // Mapeia cada entrada de dados para um novo formato
  const outputData = data.map(({month, avg}) => {
    // Extrai o número do mês da entrada (no formato "YYYY-MM")
    const monthNumber = month.split("-")[1];

    // Usa o número do mês para recuperar o nome correspondente em português
    const monthName = monthNames[monthNumber];

    // Calcula a média em porcentagem do dia (24 horas) e converte para duas casas decimais
    const avgPercentage = Number(((avg * 100) / 24).toFixed(2));

    // Retorna os dados com o mês convertido para nome em português e a média em porcentagem
    return {
      month: monthName,
      avg: avgPercentage,
    };
  });

  // Retorna os dados convertidos
  return outputData;
};
