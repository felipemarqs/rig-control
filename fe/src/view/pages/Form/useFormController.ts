import {Dayjs} from "dayjs";
import {useCallback, useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {parse, differenceInMinutes} from "date-fns";
import {useAuth} from "../../../app/hooks/useAuth";
import {efficiencyMappers} from "../../../app/services/mappers/efficiencyMappers";
import {useMutation} from "@tanstack/react-query";
import {efficienciesService} from "../../../app/services/efficienciesService";
import {customColorToast} from "../../../app/utils/customColorToast";
import {AxiosError} from "axios";
import {treatAxiosError} from "../../../app/utils/treatAxiosError";
import {useNavigate} from "react-router-dom";

export const useFormController = () => {
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

  const {user} = useAuth();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [remainingMinutes, setRemainingMinutes] = useState<number>();
  const [periods, setPeriods] = useState<Periods>([
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

  const isFormValid = remainingMinutes === 0 && date;

  return {
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
  };
};
