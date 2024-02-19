import {ResponsivePie} from "@nivo/pie";
import {useRepairPeriodsPieChart} from "./useRepairPeriodsPieChart";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const RepairPeriodsPieChart = () => {
  const {chartData} = useRepairPeriodsPieChart();
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
            fill: "#679d4d",
          },
        },
        tooltip: {
          container: {
            color: "#1c7b7b",
          },
        },
      }}
      colors={{datum: "data.color"}}
      margin={{top: 40, right: 80, bottom: 80, left: 80}}
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
      arcLinkLabelsTextColor={"#679d4d"}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{from: "color"}}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 85,
          itemHeight: 18,
          itemTextColor: "#999",
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
