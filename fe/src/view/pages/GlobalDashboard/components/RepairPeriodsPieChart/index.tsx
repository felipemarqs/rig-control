import { ResponsivePie } from "@nivo/pie";
import { useRepairPeriodsPieChart } from "./useRepairPeriodsPieChart";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const RepairPeriodsPieChart = () => {
  const { chartData } = useRepairPeriodsPieChart();
  return (
    <ResponsivePie
      data={chartData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: "#679d4d",
            },
          },
          legend: {
            text: {
              fill: "#679d4d",
            },
          },
          ticks: {
            line: {
              stroke: "#679d4d",
              strokeWidth: 1,
            },
            text: {
              fill: "#679d4d",
            },
          },
        },
        legends: {
          text: {
            fill: "#fff",
            fontSize: 14,
            fontStyle: "italic",
          },
        },
        tooltip: {
          container: {
            color: "#1c7b7b",
          },
        },
      }}
      colors={{ datum: "data.color" }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      sortByValue={true}
      innerRadius={0.45}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      //onClick={(event) => handleChartClick(event.id as string)}
      enableArcLinkLabels={true}
      arcLinkLabelsTextColor={"#1c7b7b"}
      arcLinkLabelsThickness={3}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      valueFormat={(value) => `${value} Hrs`}
      legends={[
        {
          anchor: "bottom",
          direction: "column",
          justify: false,
          translateX: 280,
          translateY: 56,
          itemsSpacing: 10,
          itemWidth: 85,
          itemHeight: 24,
          itemTextColor: "#000",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#1c7b7b",
              },
            },
          ],
        },
      ]}
    />
  );
};
