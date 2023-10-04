import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@tanstack/react-query";
import {useContracts} from "../../../app/hooks/useContracts";
import {useAuth} from "../../../app/hooks/useAuth";
import {treatAxiosError} from "../../../app/utils/treatAxiosError";
import {AxiosError} from "axios";
import {customColorToast} from "../../../app/utils/customColorToast";
import {contractsService} from "../../../app/services/contractsService";

const schema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export const useContract = () => {
  const {user} = useAuth();

  const isUserAdm = user?.accessLevel === "ADM";
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    control,
    reset,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const {contracts, isFetchingContracts} = useContracts(isUserAdm);

  const {isLoading, mutateAsync} = useMutation(contractsService.create);

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync(data);

      customColorToast(
        "Contrato cadastrado com Sucesso!",
        "#1c7b7b",
        "success"
      );
      reset();
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
    contracts,
    isFetchingContracts,
  };
};
