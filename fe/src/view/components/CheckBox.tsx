import * as RadixCheckbox from "@radix-ui/react-checkbox";

import {CheckCheckIcon} from "lucide-react";

interface CheckboxProps {
  checked: boolean;
  id: string;
  children: React.ReactNode;
  handleChecked?(): void;
}

export const Checkbox = ({
  checked,
  id,
  children,
  handleChecked,
}: CheckboxProps) => (
  <form>
    <div className="flex items-center">
      <RadixCheckbox.Root
        className=" hover:bg-gray-300 flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px_black]"
        checked={checked}
        id={id}
        onCheckedChange={handleChecked}
      >
        <RadixCheckbox.Indicator className="text-black">
          <CheckCheckIcon size={20} />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <label
        className="pl-[15px] text-[15px] leading-none text-white"
        htmlFor={id}
      >
        {children}
      </label>
    </div>
  </form>
);

export default Checkbox;
