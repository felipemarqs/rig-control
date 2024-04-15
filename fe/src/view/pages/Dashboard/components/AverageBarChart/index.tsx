import {ResponsiveBar} from "@nivo/bar";
import {useAverageBarChart} from "./useAverageBarChart";

export const AverageBarChart = () => {
  const {data, selectedRig} = useAverageBarChart();

  return (
    <ResponsiveBar
      data={data}
      keys={["avg"]}
      indexBy="rig"
      layout="vertical"
      margin={{top: 0, right: 10, bottom: 150, left: 10}}
      padding={0.3}
      layers={[
        "grid",
        "axes",
        "bars",
        "markers",
        "legends",
        "annotations", // Adiciona uma camada de rótulos
      ]}
      valueScale={{type: "linear"}}
      indexScale={{type: "band", round: true}}
      colors={(params) => {
        return params.data.rigId === selectedRig ? "#38bcb2" : "#1c7b7b";
      }}
      borderRadius={5}
      enableGridX={false}
      enableGridY={false}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },

        {
          match: (bar) => bar.data.data.rigId === selectedRig,
          id: "highlight-color", // ID para referenciar o estilo de cor de destaque
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      axisLeft={null}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor="#fff"
      valueFormat={(value) => `${value} %`}
      role="application"
      ariaLabel=""
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in country: " + e.indexValue
      }
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
        labels: {
          text: {
            fill: "#fff",
          },
        },
      }}
    />
  );
};
