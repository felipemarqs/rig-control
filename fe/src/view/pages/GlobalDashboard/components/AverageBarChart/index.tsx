import {ResponsiveBar} from "@nivo/bar";
import {useAverageBarChart} from "./useAverageBarChart";

export const AverageBarChart = () => {
  const {data, selectedRig} = useAverageBarChart();

  return (
    <div className="w-full h-full">
      <header className="bg-primary-500 text-white p-2 rounded-t-lg justify-center flex">
        <span className="text-white font-semibold">
          Eficiência Média das Sondas
        </span>
      </header>
      <div className="w-full h-full">
        <ResponsiveBar
          data={data}
          keys={["avg"]}
          indexBy="rig"
          layout="vertical"
          margin={{top: 50, right: 40, bottom: 80, left: 40}}
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
          /* legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]} */
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
      </div>
    </div>
  );
};
