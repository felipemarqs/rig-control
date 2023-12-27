import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {treatAxiosError} from "../../../app/utils/treatAxiosError";
import {AxiosError} from "axios";
import {customColorToast} from "../../../app/utils/customColorToast";
import {useNavigate} from "react-router-dom";
import {usersService} from "../../../app/services/usersService";
import {AccessLevel} from "../../../app/entities/AccessLevel";
import {useAuth} from "../../../app/hooks/useAuth";
import {useContracts} from "../../../app/hooks/contracts/useContracts";
import {useContractRigs} from "../../../app/hooks/contracts/useContractRigs";
import {useEffect} from "react";

const schema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  email: z.string().nonempty("Email é obrigatório"),
  accessLevel: z.enum(["ADM", "USER", "VIEWER"]),
  rigId: z.string().nonempty("Sonda é obrigatório"),
  contractId: z.string().nonempty("Contrato é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export const useCreateUser = () => {
  const navigate = useNavigate();
  const {user} = useAuth();

  const isUserAdm = user?.accessLevel === "ADM";
  const {contracts, isFetchingContracts} = useContracts(isUserAdm);

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    control,
    reset,
    watch,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const selectedContract = watch("contractId");

  const {contractRigs, refetchContractRigs, isFetchingContractRigs} =
    useContractRigs(selectedContract);

  useEffect(() => {
    refetchContractRigs();
  }, [selectedContract]);

  const queryClient = useQueryClient();
  const {isLoading, mutateAsync} = useMutation(usersService.create);

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
        accessLevel: data.accessLevel as AccessLevel,
        password: "conterp",
      });

      customColorToast("Usuário cadastrado com Sucesso!", "#1c7b7b", "success");
      reset();

      queryClient.invalidateQueries({queryKey: ["users"]});
      navigate("/users");
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
      console.log(error);
      navigate("/dashboard");
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
    contractRigs,
    isFetchingContractRigs,
  };
};
