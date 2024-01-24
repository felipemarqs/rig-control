import {ptBR} from "date-fns/locale";
import {format} from "date-fns";
import {DayPicker} from "react-day-picker";
import {capitalizeFirstLetter} from "../../app/utils/captalizeFirstLetter";

interface DatePickerProps {
  value: Date;
  onChange(date: Date): void;
}

export function DatePicker({value, onChange}: DatePickerProps) {
  return (
    <DayPicker
      locale={ptBR}
      selected={value}
      mode="single"
      onSelect={(date) => onChange(date ?? new Date())}
      classNames={{
        caption: "flex items-center justify-between",
        nav: "flex gap-1",
        nav_button_previous:
          "text-primary-500 flex items-center justify-center !bg-transparent",
        nav_button_next:
          "text-primary-500 flex items-center justify-center !bg-transparent",
        head_cell: "uppercase text-xs text-primary-500 font-medium pt-1 pb-2",
        button:
          "text-primary-500 cursor-pointer w-10 h-10 hover:bg-primary-400 hover:text-white rounded-full",
        day_today: "bg-gray-100 font-bold text-primary-500",
        day_selected: "!bg-primary-500 text-white font-medium",
      }}
      formatters={{
        formatCaption: (date, options) => {
          return (
            <span className="text-primary-500 tracking-[-0.408px] font-medium">
              {capitalizeFirstLetter(format(date, "LLLL yyyy", options))}
            </span>
          );
        },
      }}
    ></DayPicker>
  );
}
