import {Input} from "../../components/Input";
import {Button} from "../../components/Button";
import {useLoginController} from "./useLoginController";

export const Login = () => {
  const {handleSubmit, register, errors, isLoading} = useLoginController();
  return (
    //Container
    <div className="bg-secondaryAccent-500  w-[90%]  max-w-[1000px] h-full mb-12  rounded-2xl lg:w-[40%] text-center">
      {/* Image Container */}
      <div
        className="w-full h-[300px] flex flex-col justify-between bg-cover bg-center bg-sonda-mar rounded-2xl"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 70%, 0% 100%)",
        }}
      >
        <div className="h-24 w-24 bg-no-repeat bg-contain bg-center bg-logo "></div>
        <div className="h-8 w-full bg-primary"></div>
      </div>

      {/* End Image Container */}

      {/* Heading  */}

      <h1 className="font-bold text-white text-4xl">Login</h1>

      {/* Form Container */}
      <form
        className="mt-8 flex flex-col justify-around  gap-6 px-3 lg:px-12"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-6">
          <Input
            type="email"
            placeholder="E-mail"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            type="password"
            placeholder="Senha"
            {...register("password")}
            error={errors.password?.message}
          />
          <div className="w-1/2 mx-auto ">
            <Button type="submit" className="mt-2 w-full" isLoading={isLoading}>
              Fazer Login
            </Button>
          </div>
        </div>
      </form>

      {/* End Form Container */}
    </div>
  );
};
