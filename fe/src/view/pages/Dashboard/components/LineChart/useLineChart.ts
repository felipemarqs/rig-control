// Importações necessárias - useDashboard e Efficiency
import {useDashboard} from "../../DashboardContext/useDashboard";
import {Efficiency} from "../../entities/Efficiency";

// Definição da estrutura de saída para o gráfico de linha
interface OutputData {
  id: string;
  x: string;
  y: number;
}

// Hook responsável por formatar dados para o gráfico de linha
export const useLineChart = () => {
  // Obtém as eficiências e o usuário do contexto do Dashboard
  const {efficiencies} = useDashboard();

  // Inicializa a estrutura de dados para o gráfico de linha
  let data: [
    {
      id: string;
      color: string;
      data: OutputData[];
    }
  ] = [
    {
      id: "SPT", // Usando o nome da sonda como ID inicial
      color: "#1c7b7b",
      data: [],
    },
  ];

  // Função para formatar as eficiências para o gráfico de linha
  const formatEfficiencyToLineChart = (efficiencies: Efficiency[]) => {
    //Coloca o nome da sonda no ID para aparecer no Hover do gráfico
    data[0]["id"] = efficiencies[0].rig.name;
    // Itera sobre as eficiências para formatar os dados
    efficiencies.forEach(({availableHours, id, date}) => {
      // Formata a data no formato desejado para o gráfico de linha (dia/mês)
      const formattedDate = `${new Date(date)
        .getDate()
        .toString()
        .padStart(2, "0")}/${(new Date(date).getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;

      // Calcula a porcentagem de horas disponíveis
      const availableHoursPercentage = (availableHours * 100) / 24;

      // Adiciona os dados formatados ao array de dados do gráfico
      data[0].data.push({
        id: id,
        x: formattedDate,
        y: Number(availableHoursPercentage.toFixed(2)), // Ajusta para duas casas decimais
      });
    });
  };

  // Chama a função para formatar eficiências para o gráfico de linha
  formatEfficiencyToLineChart(efficiencies);

  console.log("Data in Line Chart: ", data);

  // Retorna os dados formatados para o gráfico de linha
  return {data};
};
