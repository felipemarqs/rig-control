import {ResponsivePie} from "@nivo/pie";
import {usePeriodsDetailsPieChart} from "./usePeriodsDetailsPieChart";

export const PeriodsDetailsPieChart = () => {
  const {chartData} = usePeriodsDetailsPieChart();
  return (
    <div className="w-full h-full">
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
          labels: {
            text: {
              fontSize: 14,

              fill: "#679d4d",
            },
          },
          legends: {
            text: {
              fill: "#fff",
              fontSize: 12,
              fontStyle: "italic",
            },
          },
          tooltip: {
            container: {
              color: "#1c7b7b",
            },
          },
        }}
        colors={{datum: "data.color"}}
        margin={{top: 10, right: 10, bottom: 100, left: 10}}
        sortByValue={true}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        //onClick={(event) => handleChartClick(event.id as string)}
        enableArcLinkLabels={false}
        arcLinkLabelsTextColor={"#1c7b7b"}
        arcLinkLabelsThickness={3}
        arcLinkLabelsColor={{from: "color"}}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor="#fff"
        valueFormat={(value) => `${value} Hrs`}
        legends={[
          {
            anchor: "bottom",
            direction: "column",
            justify: false,
            translateX: 150,
            translateY: 40,
            itemsSpacing: 10,
            itemWidth: 85,
            itemHeight: 24,
            itemTextColor: "#343A40",
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
    </div>
  );
};
