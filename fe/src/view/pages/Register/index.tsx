import {Link} from "react-router-dom";
import {Input} from "../../components/Input";
import {Button} from "../../components/Button";

export const Register = () => {
  return (
    //Container
    <div className="bg-secondary-500 h-[95%] w-[90%]  max-w-[1000px] min-h-full mb-12 rounded-2xl lg:w-[40%] lg:h-4/5 text-center">
      {/* Image Container */}
      <div
        className="w-full h-[300px] flex flex-col justify-between bg-cover bg-center bg-sonda-mar rounded-2xl"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 70%, 0% 100%)",
        }}
      >
        <div className="h-24 w-24 bg-no-repeat bg-contain bg-center bg-logo "></div>
        <div className="h-8 w-full bg-primary-500"></div>
      </div>

      {/* End Image Container */}

      {/* Heading  */}

      <h1 className="font-bold text-white text-4xl">Register</h1>

      {/* Form Container */}
      <div>
        <form className="mt-12 flex flex-col  gap-6 px-3 lg:px-12">
          <Input type="email" placeholder="E-mail" name="email" />
          <Input type="password" placeholder="Senha" name="password" />

          <div className="w-1/2 mx-auto">
            <Button type="submit" className="mt-2">
              Criar conta
            </Button>
          </div>
        </form>

        {/* End Form Container */}

        {/* Link Container */}

        <p className="space-x-2 mt-20">
          <span className="text-primary-700 font-semibold tracking-[-0.5px]">
            Já tem uma conta?
          </span>
          <Link
            className="text-primary-800 font-semibold underline tracking-[-0.5px]"
            to="/login"
          >
            Entre aqui
          </Link>
        </p>
      </div>

      {/* End Link Container */}
    </div>
  );
};
