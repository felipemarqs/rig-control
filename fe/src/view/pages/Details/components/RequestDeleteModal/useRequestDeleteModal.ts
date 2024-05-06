import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@tanstack/react-query";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {ToPersistenceDeletionRequest} from "../../../../../app/services/deletionRequestsServices/create";
import {deletionRequestsServices} from "../../../../../app/services/deletionRequestsServices";
import {customColorToast} from "../../../../../app/utils/customColorToast";
import {AxiosError} from "axios";
import {treatAxiosError} from "../../../../../app/utils/treatAxiosError";

const schema = z.object({
  reason: z.string().nonempty("Motivo é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export const useRequestDeleteModal = (efficiencyId: string) => {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    control,
    reset,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const {isPending: isLoadingDeletionRequest, mutateAsync} = useMutation({
    mutationKey: ["deletion-request"],
    mutationFn: async (data: ToPersistenceDeletionRequest) => {
      return await deletionRequestsServices.create(data);
    },
  });

  const handleSubmitDeletionRequest = hookFormHandleSubmit(async (data) => {
    //API Call
    try {
      await mutateAsync({
        efficiencyId,
        ...data,
      });

      reset();
      customColorToast("Pedido feito com sucesso!", "#1c7b7b", "success");
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
    }
  });

  return {
    register,
    isLoadingDeletionRequest,
    control,
    errors,
    handleSubmitDeletionRequest,
  };
};
