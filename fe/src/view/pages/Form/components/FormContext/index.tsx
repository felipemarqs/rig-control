import {createContext, useCallback, useEffect, useState} from "react";
import {useAuth} from "../../../../../app/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import {efficiencyMappers} from "../../../../../app/services/mappers/efficiencyMappers";
import {customColorToast} from "../../../../../app/utils/customColorToast";
import {useMutation} from "@tanstack/react-query";
import {efficienciesService} from "../../../../../app/services/efficienciesService";
import {AxiosError} from "axios";
import {treatAxiosError} from "../../../../../app/utils/treatAxiosError";
import {Dayjs} from "dayjs";
import {parse, differenceInMinutes} from "date-fns";

interface FormContextValue {
  date: Date | undefined;
  remainingMinutes: number | undefined;
  periods: Periods;
  isLoading: boolean;
  userRig: any; // Não tenho certeza do tipo exato, então usei `any` por enquanto
  handleDateChange(date: Date): void;
  handleStartHourChange(
    time: Dayjs | null,
    timeString: string,
    id: string
  ): void;
  handleDeletePeriod(id: string): void;
  handleEndHourChange(time: Dayjs | null, timeString: string, id: string): void;
  addPeriod(): void;
  handlePeriodType(id: string, type: string): void;
  handlePeriodClassification(id: string, classification: string): void;
  handleFluidRatio(id: string, ratio: string | never): void;
  handleEquipmentRatio(id: string, ratio: string | never): void;
  handleDescription(id: string, text: string): void;
  handleSubmit(periods: Periods): Promise<void>;
  cleanFields(id: string): void;
  isFormValid: boolean;
  isPending: boolean;
  handleMixTankCheckBox(): void;
  isMixTankSelected: boolean;
  handleMixTankOperatorsCheckBox(): void;
  isMixTankOperatorsSelected: boolean;
  isMixTankMonthSelected: boolean;
  handleMixTankMonthCheckBox(): void;
  isFuelGeneratorSelected: boolean;
  handleFuelGeneratorCheckBox(): void;
  handleMobilizationCheckbox(): void;
  isMobilizationSelected: boolean;
  isDemobilizationSelected: boolean;
  handleDemobilizationCheckbox(): void;
  isTankMixMobilizationSelected: boolean;
  isTankMixDemobilizationSelected: boolean;
  handleTankMixMobilizationCheckbox(): void;
  handleTankMixDemobilizationCheckbox(): void;
}

type Periods = {
  id: string;
  startHour: string;
  endHour: string;
  type: string;
  classification: string;
  fluidRatio: string;
  equipmentRatio: string;
  description: string;
}[];

export const FormContext = createContext({} as FormContextValue);

export const FormProvider = ({children}: {children: React.ReactNode}) => {
  const {user} = useAuth();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [remainingMinutes, setRemainingMinutes] = useState<number>();
  const [periods, setPeriods] = useState([
    {
      id: uuidv4(),
      startHour: "00:00",
      endHour: "00:00",
      type: "",
      classification: "",
      fluidRatio: "",
      equipmentRatio: "",
      description: "",
    },
  ]);

  const {isLoading, mutateAsync} = useMutation(efficienciesService.create);

  const handleSubmit = async (periods: Periods) => {
    const {toPersistenceObj} = efficiencyMappers.toPersistance({
      rigId: user?.rigs[0].rig.id,
      date: date ?? new Date(),
      availableHours: 24,
      periods: periods,
    });

    try {
      await mutateAsync(toPersistenceObj);
      customColorToast("Dados Enviados com Sucesso!", "#1c7b7b", "success");

      setPeriods([
        {
          id: uuidv4(),
          startHour: "00:00",
          endHour: "00:00",
          type: "",
          classification: "",
          fluidRatio: "",
          equipmentRatio: "",
          description: "",
        },
      ]);

      navigate("/dashboard", {replace: true});
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
    }
  };

  /*  <[{id:string, startHour:string,endHour:string,type: 'WORKING' | 'REPAIR' | '', classification: string}]> */
  const handleStartHourChange = (
    time: Dayjs | null,
    timeString: string,
    id: string
  ) => {
    console.log(time);
    const newPeriods = periods.map((period) => {
      return period.id === id ? {...period, startHour: timeString} : period;
    });

    setPeriods(newPeriods);
  };

  const handleEndHourChange = (
    time: Dayjs | null,
    timeString: string,
    id: string
  ) => {
    console.log(time);
    const newPeriods = periods.map((period) => {
      return period.id === id ? {...period, endHour: timeString} : period;
    });

    setPeriods(newPeriods);
  };

  const handlePeriodType = (id: string, type: string) => {
    const newPeriods = periods.map((period) => {
      return period.id === id
        ? {...period, type: type, classification: ""}
        : period;
    });

    setPeriods(newPeriods);
  };

  const handlePeriodClassification = (id: string, classification: string) => {
    const newPeriods = periods.map((period) => {
      return period.id === id
        ? {...period, classification: classification}
        : period;
    });

    setPeriods(newPeriods);
  };

  const handleFluidRatio = (id: string, ratio: string | never) => {
    const newPeriods = periods.map((period) => {
      return period.id === id ? {...period, fluidRatio: ratio} : period;
    });

    setPeriods(newPeriods);
  };

  const handleEquipmentRatio = (id: string, ratio: string | never) => {
    const newPeriods = periods.map((period) => {
      return period.id === id ? {...period, equipmentRatio: ratio} : period;
    });

    setPeriods(newPeriods);
  };

  const addPeriod = () => {
    setPeriods([
      ...periods,
      {
        id: uuidv4(),
        startHour: periods[periods.length - 1].endHour,
        endHour: "00:00",
        type: "",
        classification: "",
        fluidRatio: "",
        equipmentRatio: "",
        description: "",
      },
    ]);
  };

  const cleanFields = (id: string) => {
    const newPeriods = periods.map((period) => {
      return period.id === id
        ? {
            ...period,
            type: "",
            classification: "",
            fluidRatio: "",
            equipmentRatio: "",
            description: "",
          }
        : period;
    });

    setPeriods(newPeriods);
  };

  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  const handleDeletePeriod = (id: string) => {
    const newPeriods = periods.filter((period) => period.id !== id);

    setPeriods(newPeriods);
  };

  const handleDescription = (id: string, text: string) => {
    const newPeriods = periods.map((period) => {
      return period.id === id ? {...period, description: text} : period;
    });

    setPeriods(newPeriods);
  };

  const calculateTotalMinutes = useCallback(() => {
    let totalMinutes = 0;

    periods.forEach((period) => {
      const horaInicial = parse(period.startHour, "HH:mm", new Date());
      const horaFinal = parse(period.endHour, "HH:mm", new Date());
      const diferencaMinutos = differenceInMinutes(horaFinal, horaInicial);
      totalMinutes += diferencaMinutos;
    });

    return 1439 - totalMinutes;
  }, [periods]);

  useEffect(() => {
    const newMinutes = calculateTotalMinutes();
    setRemainingMinutes(newMinutes);
  }, [periods]);

  const isFormValid = Boolean(remainingMinutes === 0 && date);
  const isPending = remainingMinutes !== 0;

  const userRig = user?.rigs[0].rig;

  //Configurações de formulário adicionais

  //SPT 88

  const [isMixTankSelected, setIsMixTankSelected] = useState(false);

  const handleMixTankCheckBox = () => {
    setIsMixTankSelected((prevState) => !prevState);
  };

  const [isMixTankMonthSelected, setIsMixTankMonthSelected] = useState(false);

  const handleMixTankMonthCheckBox = () => {
    setIsMixTankMonthSelected((prevState) => !prevState);
  };

  const [isMixTankOperatorsSelected, setIsMixTankOperatorsSelected] =
    useState(false);

  const handleMixTankOperatorsCheckBox = () => {
    setIsMixTankOperatorsSelected((prevState) => !prevState);
  };

  const [isTankMixMobilizationSelected, setIsTankMixMobilizationSelected] =
    useState(false);

  const handleTankMixMobilizationCheckbox = useCallback(() => {
    setIsTankMixMobilizationSelected((prevState) => !prevState);
  }, []);

  const [isTankMixDemobilizationSelected, setIsTankMixDemobilizationSelected] =
    useState(false);

  const handleTankMixDemobilizationCheckbox = useCallback(() => {
    setIsTankMixDemobilizationSelected((prevState) => !prevState);
  }, []);

  const [isFuelGeneratorSelected, setIsFuelGeneratorSelected] = useState(false);

  const handleFuelGeneratorCheckBox = () => {
    setIsFuelGeneratorSelected((prevState) => !prevState);
  };

  const [isMobilizationSelected, setIsMobilizationSelected] = useState(false);

  const handleMobilizationCheckbox = useCallback(() => {
    setIsMobilizationSelected((prevState) => !prevState);
  }, []);

  const [isDemobilizationSelected, setIsDemobilizationSelected] =
    useState(false);

  const handleDemobilizationCheckbox = useCallback(() => {
    setIsDemobilizationSelected((prevState) => !prevState);
  }, []);

  console.log({
    isTankMixMobilizationSelected,
    isTankMixDemobilizationSelected,
    isMobilizationSelected,
    isDemobilizationSelected,
    isFuelGeneratorSelected,
    isMixTankOperatorsSelected,
    isMixTankMonthSelected,
    isMixTankSelected,
  });

  return (
    <FormContext.Provider
      value={{
        date,
        handleDateChange,
        handleStartHourChange,
        handleDeletePeriod,
        handleEndHourChange,
        addPeriod,
        periods,
        handlePeriodType,
        handlePeriodClassification,
        handleFluidRatio,
        handleEquipmentRatio,
        remainingMinutes,
        isFormValid,
        handleDescription,
        handleSubmit,
        cleanFields,
        isLoading,
        userRig,
        isPending,
        handleMixTankCheckBox,
        isMixTankSelected,
        handleMixTankOperatorsCheckBox,
        isMixTankOperatorsSelected,
        isMixTankMonthSelected,
        handleMixTankMonthCheckBox,
        isFuelGeneratorSelected,
        handleFuelGeneratorCheckBox,
        handleMobilizationCheckbox,
        isMobilizationSelected,
        isDemobilizationSelected,
        handleDemobilizationCheckbox,
        isTankMixMobilizationSelected,
        isTankMixDemobilizationSelected,
        handleTankMixMobilizationCheckbox,
        handleTankMixDemobilizationCheckbox,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
