import {createContext, useCallback, useEffect, useState} from "react";
import {useAuth} from "../../../../../app/hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import {efficiencyMappers} from "../../../../../app/services/mappers/efficiencyMappers";
import {customColorToast} from "../../../../../app/utils/customColorToast";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {efficienciesService} from "../../../../../app/services/efficienciesService";
import {AxiosError} from "axios";
import {treatAxiosError} from "../../../../../app/utils/treatAxiosError";
import {Dayjs} from "dayjs";
import {parse, differenceInMinutes} from "date-fns";

interface FormContextValue {
  date: Date | undefined;
  well: string;
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
  selectedRig: string;
  handleChangeRig(rigId: string): void;
  handleMixTankCheckBox(): void;
  handleMixTankOperatorsCheckBox(): void;
  handleFuelGeneratorCheckBox(): void;
  handleMobilizationCheckbox(): void;
  handleMixTankMonthCheckBox(): void;
  handleDemobilizationCheckbox(): void;
  handleTankMixMobilizationCheckbox(): void;
  handleTankMixDemobilizationCheckbox(): void;
  handleTankMixDTMCheckbox(): void;
  handleTruckCartCheckbox(): void;
  handleTruckTankCheckbox(): void;
  handleTransportationCheckbox(): void;
  handleMunckCheckbox(): void;
  handleTruckKmChange(number: number): void;
  handleExtraTrailerCheckbox(): void;
  handlePowerSwivelCheckbox(): void;
  handleMobilizationPlace(value: string): void;
  handleSuckingTruckCheckbox(): void;
  handleWellChange(value: string): void;
  isSuckingTruckSelected: boolean;
  usersRigs: {id: string; name: string}[];
  mobilizationPlace: string;
  isPowerSwivelSelected: boolean;
  isMixTankSelected: boolean;
  isMixTankOperatorsSelected: boolean;
  isMixTankMonthSelected: boolean;
  isFuelGeneratorSelected: boolean;
  isMobilizationSelected: boolean;
  isDemobilizationSelected: boolean;
  isTankMixMobilizationSelected: boolean;
  isTankMixDemobilizationSelected: boolean;
  isTankMixDTMSelected: boolean;
  bobRentHours: string;
  isTruckCartSelected: boolean;
  isTruckTankSelected: boolean;
  isMunckSelected: boolean;
  isTransportationSelected: boolean;
  truckKm: number;
  isExtraTrailerSelected: boolean;
  handleBobRentHours(time: Dayjs | null, timeString: string): void;
  handleChristmasTreeDisassemblyHours(
    time: Dayjs | null,
    timeString: string
  ): void;
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
  const isUserAdm = user?.accessLevel === "ADM";
  console.log("User", user);
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [well, setWell] = useState<string>("");
  const [selectedRig, setSelectedRig] = useState<string>(() => {
    return isUserAdm ? "" : user?.rigs[0].rig.id!;
  });
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
  const queryClient = useQueryClient();

  const handleSubmit = async (periods: Periods) => {
    const {toPersistenceObj} = efficiencyMappers.toPersistance({
      rigId: selectedRig,
      date: date ?? new Date(),
      well,
      availableHours: 24,
      periods: periods,
      isMixTankSelected,
      isMixTankOperatorsSelected,
      isMixTankMonthSelected,
      isFuelGeneratorSelected,
      isMobilizationSelected,
      isDemobilizationSelected,
      isTankMixMobilizationSelected,
      isTankMixDemobilizationSelected,
      isTankMixDTMSelected,
      bobRentHours,
      christmasTreeDisassemblyHours,
      isTruckCartSelected,
      isTruckTankSelected,
      isMunckSelected,
      isTransportationSelected,
      truckKm,
      isExtraTrailerSelected,
      isPowerSwivelSelected,
      mobilizationPlace,
      isSuckingTruckSelected,
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
      queryClient.invalidateQueries({queryKey: ["efficiencies", "average"]});

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

  const handleChangeRig = (rigId: string) => {
    setSelectedRig(rigId);
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

  const userRig = user?.rigs[0].rig!;

  const usersRigs =
    user?.rigs.map(({rig: {id, name}}) => {
      return {
        id,
        name,
      };
    }) || [];

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
    setMobilizationPlace("");
  }, []);

  const [isDemobilizationSelected, setIsDemobilizationSelected] =
    useState(false);

  const handleDemobilizationCheckbox = useCallback(() => {
    setIsDemobilizationSelected((prevState) => !prevState);
  }, []);

  const [isTankMixDTMSelected, setIsTankMixDTMSelected] = useState(false);

  const handleTankMixDTMCheckbox = useCallback(() => {
    setIsTankMixDTMSelected((prevState) => !prevState);
  }, []);

  const [bobRentHours, setBobRentHours] = useState<string>("");

  const handleBobRentHours = useCallback(
    (time: Dayjs | null, timeString: string) => {
      console.log(time);
      setBobRentHours(timeString);
    },
    []
  );

  const [christmasTreeDisassemblyHours, setChristmasTreeDisassemblyHours] =
    useState<string>("");

  const handleChristmasTreeDisassemblyHours = useCallback(
    (time: Dayjs | null, timeString: string) => {
      console.log(time);

      setChristmasTreeDisassemblyHours(timeString);
    },
    []
  );

  //===========================================

  // 3R - 76

  const [isTruckCartSelected, setIsTruckCartSelected] = useState(false);

  const handleTruckCartCheckbox = useCallback(() => {
    setIsTruckCartSelected((prevState) => !prevState);
  }, []);

  const [isTruckTankSelected, setIsTruckTankSelected] = useState(false);

  const handleTruckTankCheckbox = useCallback(() => {
    setIsTruckTankSelected((prevState) => !prevState);
  }, []);

  const [isMunckSelected, setIsMunckSelected] = useState(false);

  const handleMunckCheckbox = useCallback(() => {
    setIsMunckSelected((prevState) => !prevState);
  }, []);

  const [isTransportationSelected, setIsTransportationSelected] =
    useState(false);

  const handleTransportationCheckbox = useCallback(() => {
    setIsTransportationSelected((prevState) => !prevState);
  }, []);

  const [truckKm, setTruckKm] = useState(0);

  const handleTruckKmChange = (number: number) => {
    setTruckKm(number);
  };

  const [isExtraTrailerSelected, setIsExtraTrailerSelected] = useState(false);

  const handleExtraTrailerCheckbox = useCallback(() => {
    setIsExtraTrailerSelected((prevState) => !prevState);
  }, []);

  const [isPowerSwivelSelected, setIsPowerSwivelSelected] = useState(false);

  const handlePowerSwivelCheckbox = useCallback(() => {
    setIsPowerSwivelSelected((prevState) => !prevState);
  }, []);

  const [mobilizationPlace, setMobilizationPlace] = useState("");

  const handleMobilizationPlace = (value: string) => {
    setMobilizationPlace(value);
  };

  const [isSuckingTruckSelected, setIsSuckingTruckSelected] = useState(false);

  const handleSuckingTruckCheckbox = useCallback(() => {
    setIsSuckingTruckSelected((prevState) => !prevState);
  }, []);

  const handleWellChange = useCallback((value: any) => {
    setWell(value);
  }, []);

  return (
    <FormContext.Provider
      value={{
        date,
        handleChangeRig,
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
        usersRigs,
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
        handleTankMixDTMCheckbox,
        isTankMixDTMSelected,
        bobRentHours,
        handleBobRentHours,
        handleChristmasTreeDisassemblyHours,
        isTruckCartSelected,
        handleTruckCartCheckbox,
        isTruckTankSelected,
        handleTruckTankCheckbox,
        isMunckSelected,
        handleMunckCheckbox,
        isTransportationSelected,
        handleTransportationCheckbox,
        handleTruckKmChange,
        truckKm,
        handleExtraTrailerCheckbox,
        isExtraTrailerSelected,
        isPowerSwivelSelected,
        handlePowerSwivelCheckbox,
        mobilizationPlace,
        handleMobilizationPlace,
        isSuckingTruckSelected,
        handleSuckingTruckCheckbox,
        well,
        handleWellChange,
        selectedRig,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
