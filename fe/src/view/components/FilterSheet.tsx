import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";

import {cn} from "@/lib/utils";
import {FilterIcon} from "lucide-react";
import {useFiltersContext} from "@/app/hooks/useFiltersContext";
import {DatePickerInput} from "./DatePickerInput";

interface FilterSheetProps {
  onApplyFilters(): void;
  isLoading: boolean;
}

export const FilterSheet = ({onApplyFilters, isLoading}: FilterSheetProps) => {
  const {
    selectedStartDate,
    handleStartDateChange,
    selectedEndDate,
    handleEndDateChange,
  } = useFiltersContext();
  return (
    <Sheet>
      <SheetTrigger>
        {" "}
        <Button className="gap-2" variant="default">
          <FilterIcon /> <span className="hidden lg:inline">Filtros</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-card">
        <SheetHeader>
          <SheetDescription>
            <div className="grid gap-4">
              <>
                <div>
                  <DatePickerInput
                    placeholder="Data de Início"
                    error={""}
                    value={new Date(selectedStartDate)}
                    onChange={(value) => handleStartDateChange(value)}
                  />
                </div>

                <div>
                  <DatePickerInput
                    placeholder="Data de Fim"
                    error={""}
                    value={new Date(selectedEndDate)}
                    onChange={(value) => handleEndDateChange(value)}
                  />
                </div>
              </>

              <Button
                onClick={onApplyFilters}
                disabled={isLoading}
                className={cn(isLoading ? "cursor-not-allowed" : "")}
              >
                Aplicar Filtros
              </Button>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
