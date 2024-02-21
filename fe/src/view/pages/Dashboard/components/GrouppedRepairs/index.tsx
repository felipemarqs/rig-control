import {useGrouppedRepairs} from "./useGrouppedRepairs";
import {cn} from "../../../../../app/utils/cn";

export const GrouppedRepairs = () => {
  const {repairGroupedData} = useGrouppedRepairs();

  return (
    <div
      className={cn(
        `max-h-full ${
          repairGroupedData.groupedData.length <= 3 ? "" : "overflow-y-scroll"
        }`
      )}
    >
      <header className="bg-primary-500 text-white p-2 rounded-t-lg justify-center flex">
        <span className="text-white font-semibold">Reparos</span>
      </header>
      <div className="flex flex-col gap-2  ">
        {repairGroupedData.groupedData.map((data) => (
          <div
            className="p-4 bg-white rounded-sm flex flex-col justify-between border-y-2 gap-4 border-primary-100"
            key={data.equipment}
          >
            <div className="flex gap-2">
              <span className="text-primary-500"> Equipamento:</span>

              <span className="text-primary-500 font-semibold italic">
                {data.equipment}
              </span>
            </div>

            <div className="flex gap-2">
              <span className="text-primary-500"> Tempo em Reparo:</span>

              <span className="text-primary-500 font-semibold italic">
                {data.totalHours} Hrs
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
    /*  <ResponsiveBar
      data={data}
      keys={["qty"]}
      indexBy="equipment"
      layout="horizontal"
      margin={{top: 50, right: 60, bottom: 20, left: 150}}
      padding={0.3}
      layers={[
        titleLayer,
        "grid",
        "axes",
        "bars",
        "markers",
        "legends",
        "annotations",
      ]}
      valueScale={{type: "linear"}}
      indexScale={{type: "band", round: true}}
      colors="#1c7b7b"
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
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: -40,
      }}
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
      ]}
      valueFormat={(value) => `${value}`}
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
    /> */
  );
};
