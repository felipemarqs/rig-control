import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {authService} from "../../../app/services/authService";
import {useMutation} from "@tanstack/react-query";
import {SigninParams} from "../../../app/services/authService/signin";
import {toast} from "react-hot-toast";
import {customColorToast} from "../../../app/utils/customColorToast";
import {AxiosError} from "axios";
import {treatAxiosError} from "../../../app/utils/treatAxiosError";

const schema = z.object({
  email: z
    .string()
    .nonempty("E-mail é obrigatório.")
    .email("Informe um E-mail válido."),
  password: z
    .string()
    .nonempty("Senha é obrigatória.")
    .min(3, "A senha deve conter pelo menos 3 dígitos"),
});

type FormData = z.infer<typeof schema>;

/* type FormData = {
  email: string;
  password: string;
};*/

export const useLoginController = () => {
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const {isLoading, mutateAsync} = useMutation({
    mutationKey: ["signin"],
    mutationFn: async (data: SigninParams) => {
      return await authService.signin(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    //API Call
    try {
      const {accessToken} = await mutateAsync(data);
      customColorToast("Logado com sucesso!", "#1c7b7b", "success");
      console.log(accessToken);
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
    }
  });

  return {
    handleSubmit,
    register,
    errors,
    isLoading,
  };
};
