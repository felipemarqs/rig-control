import {ResponsiveLine} from "@nivo/line";
import {useLineChart} from "./useLineChart";
import {useNavigate} from "react-router-dom";

export const LineChart = () => {
  const {data} = useLineChart();
  const navigate = useNavigate();
  console.log("Data Line CHart", data);
  return (
    <div className="w-full h-full">
      <ResponsiveLine
        data={data}
        margin={{top: 50, right: 50, bottom: 40, left: 50}}
        animate={true}
        enableSlices={"x"}
        yScale={{
          type: "linear",
          stacked: true,
          min: 0,
          max: 100,
        }}
        enablePointLabel={data[0].data.length > 31 ? false : true}
        pointLabel={(e) => {
          //if (e.y === 100) return "";
          return e.y + "%";
        }}
        enableArea={false}
        // @ts-ignore
        onClick={(e) => navigate(`/details/${e.points[0].data.id}`)}
        lineWidth={3}
        curve="cardinal"
        colors={["#1c7b7b", "#774dd7"]}
        enableGridX={true}
        enableGridY={false}
        pointSize={10}
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
        axisLeft={null}
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
  );
};
