import {Controller} from "react-hook-form";
import {Button} from "../../components/Button";
import {Header} from "../../components/Header";
import {Input} from "../../components/Input";
import {useCreateUser} from "./useCreateUser";
import {AccessLevel} from "../../../app/entities/AccessLevel";
import {Select} from "../../components/Select";

export const CreateUser = () => {
  const {
    errors,
    register,
    handleSubmit,
    isLoading,
    control,
    contracts,
    contractRigs,
    isFetchingContractRigs,
  } = useCreateUser();

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
              <div className="flex gap-1">
                <div className="flex-1">
                  <Controller
                    control={control}
                    defaultValue={AccessLevel.USER}
                    name="accessLevel"
                    render={({field: {onChange, value}}) => (
                      <Select
                        value={value}
                        placeholder="Nível de Acesso"
                        onChange={onChange}
                        options={Object.values(AccessLevel).map(
                          (accessLevel) => ({
                            value: accessLevel,
                            label: accessLevel,
                          })
                        )}
                      />
                    )}
                  />
                </div>

                <div className="flex-1">
                  <Controller
                    control={control}
                    name="contractId"
                    render={({field: {onChange, value}}) => (
                      <Select
                        value={value}
                        error={errors.contractId?.message}
                        placeholder="Contrato"
                        onChange={onChange}
                        options={contracts.map(({id, name}) => ({
                          value: id,
                          label: name,
                        }))}
                      />
                    )}
                  />
                </div>
                <div className="flex-1">
                  <Controller
                    control={control}
                    name="rigId"
                    render={({field: {onChange, value}}) => (
                      <Select
                        value={value}
                        error={errors.rigId?.message}
                        placeholder="Sonda"
                        isLoading={isFetchingContractRigs}
                        onChange={onChange}
                        options={contractRigs.map(({id, name}) => ({
                          value: id,
                          label: name,
                        }))}
                      />
                    )}
                  />
                </div>
              </div>
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
