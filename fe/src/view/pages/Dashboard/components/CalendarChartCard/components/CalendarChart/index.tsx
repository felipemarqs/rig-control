// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/calendar
import {ResponsiveCalendar} from "@nivo/calendar";
import {useCalendarChart} from "./useCalendarChart";
import {cn} from "@/lib/utils";
import {formatDate} from "@/app/utils/formatDate";

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
      maxValue={1}
      emptyColor="#eeeeee"
      colors={["#FACC15", "#FACC15", "#FACC15", "#1c7b7b"]}
      margin={{top: 0, right: 40, bottom: 0, left: 40}}
      yearSpacing={40}
      monthBorderColor="#ffffff"
      monthSpacing={0}
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      tooltip={(e) => {
        return (
          <div
            className={cn(
              "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 duration-75"
            )}
          >
            <div>
              <span>Dia: </span> {/* @ts-ignore */}
              <span> {formatDate(new Date(e.data.day))}</span>
            </div>

            <div>
              <span>Horas Disp.: </span> {/* @ts-ignore */}
              <span> {e.data.availableHours} Hrs</span>
            </div>

            <div>
              {/* @ts-ignore */}
              <span>Eficiência: </span> <span> {e.data.efficiency}</span>
            </div>
          </div>
        );
      }}
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
