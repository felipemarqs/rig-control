import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {cn} from "@/lib/utils";
import {DatePickerInput} from "@/view/components/DatePickerInput";
import {FilterType} from "@/app/entities/FilterType";
import {Select} from "@/view/components/Select";
import {FilterIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useFiltersContext} from "@/app/hooks/useFiltersContext";
import {filterOptions} from "@/app/utils/filterOptions";
import {useRigs} from "@/app/hooks/rigs/useRigs";
import {months} from "@/app/utils/months";
import {years} from "@/app/utils/years";
import {useAuth} from "@/app/hooks/useAuth";

interface CustomFilterSheetProps {
  onApplyFilters(): void;
  isLoading: boolean;
}

export const CustomFilterSheet = ({
  isLoading,
  onApplyFilters,
}: CustomFilterSheetProps) => {
  const {isUserAdm, user} = useAuth();
  const {
    selectedRig,
    selectedStartDate,
    selectedEndDate,
    selectedPeriod,
    selectedYear,
    selectedFilterType,
    handleChangeRig,
    handleChangePeriod,
    handleStartDateChange,
    handleEndDateChange,
    handleToggleFilterType,
    handleYearChange,
  } = useFiltersContext();

  console.log("selected Rig", selectedRig);

  // Mapeamento das rigs do usuário para exibir apenas as autorizadas
  const userRigs = user?.rigs.map(({rig: {id, name}}) => ({id, name})) || [];

  const {rigs: responseRigs} = useRigs(isUserAdm);

  const rigs = isUserAdm ? responseRigs : userRigs;
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
              <Select
                placeholder="Tipo de Filtro"
                value={selectedFilterType}
                onChange={(value) =>
                  handleToggleFilterType(value as FilterType)
                }
                options={filterOptions}
              />

              <Select
                error={selectedRig ? "" : "Selecione uma sonda!"}
                placeholder="Sonda"
                value={selectedRig}
                onChange={(value) => handleChangeRig(value)}
                options={rigs.map(({id, name}) => ({
                  value: id ?? "",
                  label: name ?? "",
                }))}
              />

              {selectedFilterType === FilterType.PERIOD && (
                <>
                  <Select
                    error={""}
                    placeholder="Período"
                    value={selectedPeriod}
                    onChange={(value) => handleChangePeriod(value)}
                    options={months}
                  />

                  <Select
                    error={""}
                    placeholder="Ano"
                    value={selectedYear}
                    onChange={(value) => handleYearChange(value)}
                    options={years}
                  />
                </>
              )}

              {selectedFilterType === FilterType.CUSTOM && (
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
              )}

              <Button
                onClick={onApplyFilters}
                disabled={isLoading || !selectedRig}
                className={cn("", isLoading ? "cursor-not-allowed" : "")}
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
