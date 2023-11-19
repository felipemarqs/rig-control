import { z } from "zod";
import { useBillingDashboard } from "../../BillingDashboardContext/useBillingDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { billingConfigService } from "../../../../../app/services/billingConfigServices";
import { customColorToast } from "../../../../../app/utils/customColorToast";
import { AxiosError } from "axios";
import { treatAxiosError } from "../../../../../app/utils/treatAxiosError";

const schema = z.object({
  availableHourTax: z.union([z.string().nonempty("Obrigatório"), z.number()]),
  dtmBt20And50Tax: z.union([z.string().nonempty("Obrigatório"), z.number()]),
  dtmHourTax: z.union([z.string().nonempty("Obrigatório"), z.number()]),
  dtmGt50Tax: z.union([z.string().nonempty("Obrigatório"), z.number()]),
  dtmLt20Tax: z.union([z.string().nonempty("Saldo é obrigatório"), z.number()]),
  equipmentRatioBt20And50Tax: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),
  equipmentRatioGt50Tax: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),
  equipmentRatioLt20Tax: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),
  fluidRatioBt20And50Tax: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),
  fluidRatioGt50Tax: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),
  fluidRatioLt20Tax: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),
  glossHourTax: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),

  mobilization: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),

  demobilization: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),
  bobRentTax: z.union([z.string().nonempty("Saldo é obrigatório"), z.number()]),
  generatorFuelTax: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),
  extraTrailerTax: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),
  powerSwivelTax: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),
  transportationTax: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),
  readjustment: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),
  suckingTruckTax: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),
  truckCartRentTax: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),
  truckTankTax: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),
  truckKmTax: z.union([z.string().nonempty("Saldo é obrigatório"), z.number()]),
  mixTankMonthRentTax: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),
  mixTankHourRentTax: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),
  mixTankMobilizationTax: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),
  mixTankDemobilizationTax: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),
  mixTankDtmTax: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),
  mixTankOperatorTax: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),
  christmasTreeDisassemblyTax: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),
  munckTax: z.union([z.string().nonempty("Saldo é obrigatório"), z.number()]),
});

type FormData = z.infer<typeof schema>;

export const useEditConfigModal = () => {
  const {
    isEditConfigModalOpen,
    handleCloseEditConfigModal,
    configBeingEdited,
  } = useBillingDashboard();

  const { isLoading, mutateAsync: mutateAsyncUpdateConfig } = useMutation(
    billingConfigService.update
  );

  const queryClient = useQueryClient();

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      availableHourTax: configBeingEdited?.availableHourTax,
      glossHourTax: configBeingEdited?.glossHourTax,
      dtmLt20Tax: configBeingEdited?.dtmLt20Tax,
      dtmBt20And50Tax: configBeingEdited?.dtmBt20And50Tax,
      dtmGt50Tax: configBeingEdited?.dtmGt50Tax,
      equipmentRatioLt20Tax: configBeingEdited?.equipmentRatioLt20Tax,
      equipmentRatioBt20And50Tax: configBeingEdited?.equipmentRatioBt20And50Tax,
      equipmentRatioGt50Tax: configBeingEdited?.equipmentRatioGt50Tax,
      fluidRatioLt20Tax: configBeingEdited?.fluidRatioLt20Tax,
      fluidRatioBt20And50Tax: configBeingEdited?.fluidRatioBt20And50Tax,
      fluidRatioGt50Tax: configBeingEdited?.fluidRatioGt50Tax,
      mobilization: configBeingEdited?.mobilization,
      readjustment: configBeingEdited?.readjustment,
      bobRentTax: configBeingEdited?.bobRentTax,
      dtmHourTax: configBeingEdited?.dtmHourTax,
      extraTrailerTax: configBeingEdited?.extraTrailerTax,
      generatorFuelTax: configBeingEdited?.generatorFuelTax,
      mixTankDemobilizationTax: configBeingEdited?.mixTankDemobilizationTax,
      mixTankDtmTax: configBeingEdited?.mixTankDtmTax,
      mixTankHourRentTax: configBeingEdited?.mixTankHourRentTax,
      mixTankMobilizationTax: configBeingEdited?.mixTankMobilizationTax,
      mixTankMonthRentTax: configBeingEdited?.mixTankHourRentTax,
      mixTankOperatorTax: configBeingEdited?.mixTankOperatorTax,
      munckTax: configBeingEdited?.munckTax,
      powerSwivelTax: configBeingEdited?.powerSwivelTax,
      suckingTruckTax: configBeingEdited?.suckingTruckTax,
      transportationTax: configBeingEdited?.transportationTax,
      truckCartRentTax: configBeingEdited?.truckCartRentTax,
      truckKmTax: configBeingEdited?.truckKmTax,
      truckTankTax: configBeingEdited?.truckTankTax,
      christmasTreeDisassemblyTax:
        configBeingEdited?.christmasTreeDisassemblyTax,
      demobilization: configBeingEdited?.demobilization,
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsyncUpdateConfig({
        id: configBeingEdited!.id,
        availableHourTax:
          currencyStringToNumber(data.availableHourTax as string) ??
          (data.availableHourTax as number),
        dtmBt20And50Tax:
          currencyStringToNumber(data.dtmBt20And50Tax as string) ??
          (data.dtmBt20And50Tax as number),
        dtmGt50Tax:
          currencyStringToNumber(data.dtmGt50Tax as string) ??
          (data.dtmGt50Tax as number),
        dtmLt20Tax:
          currencyStringToNumber(data.dtmLt20Tax as string) ??
          (data.dtmLt20Tax as number),
        equipmentRatioBt20And50Tax:
          currencyStringToNumber(data.equipmentRatioBt20And50Tax as string) ??
          (data.equipmentRatioBt20And50Tax as number),
        equipmentRatioGt50Tax:
          currencyStringToNumber(data.equipmentRatioGt50Tax as string) ??
          (data.equipmentRatioGt50Tax as number),
        equipmentRatioLt20Tax:
          currencyStringToNumber(data.equipmentRatioLt20Tax as string) ??
          (data.equipmentRatioLt20Tax as number),
        fluidRatioBt20And50Tax:
          currencyStringToNumber(data.fluidRatioBt20And50Tax as string) ??
          (data.fluidRatioBt20And50Tax as number),
        fluidRatioGt50Tax:
          currencyStringToNumber(data.fluidRatioGt50Tax as string) ??
          (data.fluidRatioGt50Tax as number),
        fluidRatioLt20Tax:
          currencyStringToNumber(data.fluidRatioLt20Tax as string) ??
          (data.fluidRatioLt20Tax as number),
        glossHourTax:
          currencyStringToNumber(data.glossHourTax as string) ??
          (data.glossHourTax as number),
        mobilization:
          currencyStringToNumber(data.mobilization as string) ??
          (data.mobilization as number),
        readjustment: Number(data.readjustment),
        bobRentTax:
          currencyStringToNumber(data.bobRentTax as string) ??
          (data.bobRentTax as number),
        demobilization:
          currencyStringToNumber(data.demobilization as string) ??
          (data.demobilization as number),
        dtmHourTax:
          currencyStringToNumber(data.dtmHourTax as string) ??
          (data.dtmHourTax as number),
        extraTrailerTax:
          currencyStringToNumber(data.extraTrailerTax as string) ??
          (data.extraTrailerTax as number),
        generatorFuelTax:
          currencyStringToNumber(data.generatorFuelTax as string) ??
          (data.generatorFuelTax as number),
        mixTankDemobilizationTax:
          currencyStringToNumber(data.mixTankDemobilizationTax as string) ??
          (data.mixTankDemobilizationTax as number),
        mixTankDtmTax:
          currencyStringToNumber(data.mixTankDtmTax as string) ??
          (data.mixTankDtmTax as number),
        mixTankHourRentTax:
          currencyStringToNumber(data.mixTankHourRentTax as string) ??
          (data.mixTankHourRentTax as number),
        mixTankMobilizationTax:
          currencyStringToNumber(data.mixTankMobilizationTax as string) ??
          (data.mixTankMobilizationTax as number),
        mixTankMonthRentTax:
          currencyStringToNumber(data.mixTankMonthRentTax as string) ??
          (data.mixTankMonthRentTax as number),
        mixTankOperatorTax:
          currencyStringToNumber(data.mixTankOperatorTax as string) ??
          (data.mixTankOperatorTax as number),
        munckTax:
          currencyStringToNumber(data.munckTax as string) ??
          (data.munckTax as number),
        powerSwivelTax:
          currencyStringToNumber(data.powerSwivelTax as string) ??
          (data.powerSwivelTax as number),
        suckingTruckTax:
          currencyStringToNumber(data.suckingTruckTax as string) ??
          (data.suckingTruckTax as number),
        transportationTax:
          currencyStringToNumber(data.transportationTax as string) ??
          (data.transportationTax as number),
        truckCartRentTax:
          currencyStringToNumber(data.truckCartRentTax as string) ??
          (data.truckCartRentTax as number),
        truckKmTax:
          currencyStringToNumber(data.truckKmTax as string) ??
          (data.truckKmTax as number),
        truckTankTax:
          currencyStringToNumber(data.truckTankTax as string) ??
          (data.truckTankTax as number),
        christmasTreeDisassemblyTax:
          currencyStringToNumber(data.christmasTreeDisassemblyTax as string) ??
          (data.christmasTreeDisassemblyTax as number),
        rigId: configBeingEdited?.rig.id!,
      });

      queryClient.invalidateQueries({ queryKey: ["configBillings"] });

      customColorToast(
        "Configuração editada com sucesso!",
        "#1c7b7b",
        "success"
      );
      handleCloseEditConfigModal();
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
    }
  });

  return {
    isEditConfigModalOpen,
    handleCloseEditConfigModal,
    handleSubmit,
    control,
    errors,
    register,
    isLoading,
  };
};
