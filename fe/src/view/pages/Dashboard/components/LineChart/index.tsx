import {ResponsiveLine} from "@nivo/line";
import {useLineChart} from "./useLineChart";
import {useNavigate} from "react-router-dom";

export const LineChart = () => {
  const {data} = useLineChart();
  const navigate = useNavigate();
  return (
    <div className="w-full h-full">
      <header className="bg-primary-500 text-white p-2 rounded-t-lg justify-center flex">
        <span className="text-white font-semibold">
          Eficiência Diária da Sonda
        </span>
      </header>
      <div className="w-full h-full">
        <ResponsiveLine
          data={data}
          margin={{top: 50, right: 50, bottom: 80, left: 60}}
          animate={true}
          enableSlices={"x"}
          yScale={{
            type: "linear",
            stacked: true,
            min: 0,
            max: 100,
          }}
          pointLabel={(e) => {
            //if (e.y === 100) return "";
            return e.y + "%";
          }}
          enableArea={true}
          // @ts-ignore
          onClick={(e) => navigate(`/details/${e.points[0].data.id}`)}
          lineWidth={3}
          curve="linear"
          enablePointLabel={true}
          colors={["#1c7b7b", "#774dd7"]}
          enableGridX={false}
          pointSize={12}
          pointColor="white"
          pointBorderWidth={2}
          pointBorderColor={{from: "serieColor"}}
          yFormat=" >-.2f"
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
          useMesh={true}
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
      </div>
    </div>
  );
};
