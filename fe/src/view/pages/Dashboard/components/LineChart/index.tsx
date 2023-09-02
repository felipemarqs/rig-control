import { ResponsiveLine } from "@nivo/line";
import { useLineChart } from "./useLineChart";

export const LineChart = () => {
  const { data } = useLineChart();

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 30, right: 50, bottom: 30, left: 60 }}
      animate={true}
      enableSlices={"x"}
      yScale={{
        type: "linear",
        stacked: true,
        min: 0,
        max: 24,
      }}
      pointLabel={(e) => {
        //if (e.y === 100) return "";
        return e.y + "Hrs";
      }}
      lineWidth={3}
      curve="linear"
      colors={["#1c7b7b", "#774dd7"]}
      enableGridX={false}
      pointSize={12}
      pointColor="white"
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      layers={[
        "grid",
        "markers",
        "areas",
        "lines",
        "slices",
        "axes",
        "points",
        "legends",
      ]}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: "#1c7b7b",
            },
          },
          legend: {
            text: {
              fill: "#1c7b7b",
            },
          },
          ticks: {
            line: {
              stroke: "#1c7b7b",
              strokeWidth: 1,
            },
            text: {
              fill: "#1c7b7b",
            },
          },
        },
        crosshair: {
          line: {
            strokeWidth: 2,
            stroke: "#774dd7",
            strokeOpacity: 1,
          },
        },
        legends: {
          text: {
            fill: "#1c7b7b",
          },
        },
        tooltip: {
          container: {
            color: "#1c7b7b",
          },
        },
      }}
    />
  );
};
