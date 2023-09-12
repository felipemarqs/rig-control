import {z} from "zod";
import {useBillingDashboard} from "../../BillingDashboardContext/useBillingDashboard";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {currencyStringToNumber} from "../../../../../app/utils/currencyStringToNumber";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {billingConfigService} from "../../../../../app/services/billingConfigServices";
import {customColorToast} from "../../../../../app/utils/customColorToast";
import {AxiosError} from "axios";
import {treatAxiosError} from "../../../../../app/utils/treatAxiosError";

const schema = z.object({
  availableHourTax: z.union([z.string().nonempty("Obrigatório"), z.number()]),
  dtmBt20And50Tax: z.union([z.string().nonempty("Obrigatório"), z.number()]),
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
  readjustment: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),
});

type FormData = z.infer<typeof schema>;

export const useEditConfigModal = () => {
  const {isEditConfigModalOpen, handleCloseEditConfigModal, configBeingEdited} =
    useBillingDashboard();

  const {isLoading, mutateAsync: mutateAsyncUpdateConfig} = useMutation(
    billingConfigService.update
  );

  const queryClient = useQueryClient();

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    control,
    formState: {errors},
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
    },
  });

  console.log(errors);
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
        readjustment:
          currencyStringToNumber(data.readjustment as string) ??
          (data.readjustment as number),
        rigId: configBeingEdited?.rig.id!,
      });

      queryClient.invalidateQueries({queryKey: ["configBillings"]});

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
