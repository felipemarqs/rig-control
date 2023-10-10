import {Button} from "../../components/Button";
import {Header} from "../../components/Header";
import {Input} from "../../components/Input";
import {useUpdateUser} from "./useUpdateUser";

export const UpdateUser = () => {
  const {errors, register, handleSubmit, isLoading} = useUpdateUser();

  return (
    <div className="w-full h-full overflow-y-scroll">
      <Header title="CADASTRO" subtitle="Cadastro de usuários" />

      <div className="w-full h-full ">
        <form className="p-4" onSubmit={handleSubmit}>
          <div className="w-full p-4 bg-gray-300 rounded-lg flex flex-col gap-2 lg:w-1/2 lg:mx-auto">
            <div className="w-full">
              <Input
                className=" bg-white w-full rounded-lg border-2 text-black border-white focus:border-white   hover:bg-gray-100 hover:border-3"
                placeholder="Nome"
                labelStyles="text-black"
                error={errors.name?.message}
                {...register("name")}
              />
            </div>

            <div className="w-full">
              <Input
                className=" bg-white w-full rounded-lg border-2 text-black border-white focus:border-white   hover:bg-gray-100 hover:border-3"
                placeholder="Email"
                type="email"
                labelStyles="text-black"
                error={errors.email?.message}
                {...register("email")}
              />
            </div>

            <div className="w-full">
              <Input
                className=" bg-white w-full rounded-lg border-2 text-black border-white focus:border-white   hover:bg-gray-100 hover:border-3"
                placeholder="Senha"
                type="password"
                labelStyles="text-black"
                error={errors.password?.message}
                {...register("password")}
              />
            </div>

            <div className="w-full">
              <div className="flex gap-1"></div>
            </div>
            <Button type="submit" isLoading={isLoading}>
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
