import {useForm} from "react-hook-form";
import {useListRigs} from "../../ListRigsContext/useListRigs";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {UF} from "../../../../../app/entities/Rig";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {rigsService} from "../../../../../app/services/rigsService";
import {treatAxiosError} from "../../../../../app/utils/treatAxiosError";
import {AxiosError} from "axios";
import {customColorToast} from "../../../../../app/utils/customColorToast";

const schema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  state: z.string().nonempty("Estado é obrigatório"),
  isActive: z.string(),
});

type FormData = z.infer<typeof schema>;

const isActiveOptions = [
  {
    value: "",
    label: "Desativada",
  },
  {
    value: "true",
    label: "Ativada",
  },
];

export const useEditRigModal = () => {
  const {rigBeingEdited, isEditRigModalOpen, handleCloseEditRigModal} =
    useListRigs();

  const queryClient = useQueryClient();

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    control,
    reset,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: rigBeingEdited ? rigBeingEdited.name : "",
      state: rigBeingEdited ? rigBeingEdited.state : UF.BA,
      isActive: rigBeingEdited ? rigBeingEdited.isActive.toString() : "",
    },
  });

  const {isPending: isLoading, mutateAsync} = useMutation({
    mutationFn: rigsService.update,
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        id: rigBeingEdited?.id!,
        name: data.name,
        isActive: Boolean(data.isActive),
        state: data.state as UF,
      });

      customColorToast("Sonda editada com Sucesso!", "#1c7b7b", "success");
      reset();
      handleCloseEditRigModal();

      queryClient.invalidateQueries({queryKey: ["rigs"]});
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
      console.log(error);
    }
  });

  return {
    rigBeingEdited,
    isEditRigModalOpen,
    handleCloseEditRigModal,
    register,
    control,
    reset,
    errors,
    isActiveOptions,
    handleSubmit,
    isLoading,
  };
};
