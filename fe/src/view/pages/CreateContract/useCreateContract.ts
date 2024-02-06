import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {treatAxiosError} from "../../../app/utils/treatAxiosError";
import {AxiosError} from "axios";
import {customColorToast} from "../../../app/utils/customColorToast";
import {contractsService} from "../../../app/services/contractsService";
import {useNavigate} from "react-router-dom";

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export const useCreateContract = () => {
  const navigate = useNavigate();

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    control,
    reset,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();
  const {isPending: isLoading, mutateAsync} = useMutation({
    mutationFn: contractsService.create,
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync(data);

      customColorToast(
        "Contrato cadastrado com Sucesso!",
        "#1c7b7b",
        "success"
      );
      reset();

      queryClient.invalidateQueries({queryKey: ["contracts"]});
      navigate("/contracts");
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
      console.log(error);
    }
  });

  return {
    register,
    control,
    errors,
    handleSubmit,
    isLoading,
  };
};
