// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/calendar
import {ResponsiveCalendar} from "@nivo/calendar";
import {useCalendarChart} from "./useCalendarChart";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export const CalendarChart = () => {
  const {calendarRange, data, navigate} = useCalendarChart();

  return (
    <ResponsiveCalendar
      data={data}
      from={calendarRange.from}
      to={calendarRange.to}
      maxValue={24}
      emptyColor="#eeeeee"
      colors={["#FACC15", "#FACC15", "#FACC15", "#1c7b7b"]}
      margin={{top: 0, right: 40, bottom: 0, left: 40}}
      yearSpacing={40}
      monthBorderColor="#ffffff"
      monthSpacing={0}
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      // @ts-ignore
      onClick={(e) => navigate(`/details/${e.data.id}`)}
      legends={[
        {
          anchor: "bottom-right",
          direction: "row",
          translateY: 36,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: "right-to-left",
        },
      ]}
    />
  );
};
