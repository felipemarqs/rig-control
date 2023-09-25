import {Controller} from "react-hook-form";
import {UF} from "../../../app/entities/Rig";
import {Header} from "../../components/Header";
import {Input} from "../../components/Input";
import {InputCurrency} from "../../components/InputCurrency";
import {Select} from "../../components/Select";
import {TaxInput} from "../../components/TaxInput";
import {useCreateRig} from "./useCreateRig";

export const CreateRig = () => {
  const {control, errors, register} = useCreateRig();
  return (
    <div className="w-full h-full overflow-y-scroll">
      <Header
        title="CADASTRO"
        subtitle="Cadastro de sondas e suas configurações"
      />

      <div className="w-full h-full ">
        <div className="grid grid-cols-12 auto-rows-[120px] gap-3"></div>
        <form className="p-4">
          <span className="p-4 text-black">Dados da Sonda</span>
          <div className="w-full p-4   flex flex-col gap-2 lg:flex-row">
            <div className="w-full">
              <Input
                className=" bg-white w-full rounded-lg border-2 text-black border-white focus:border-white   hover:bg-gray-100 hover:border-3"
                placeholder="Nome da Sonda"
                labelStyles="text-black"
                {...register("name")}
              />
            </div>
            <div className="w-full">
              <Controller
                control={control}
                defaultValue={UF.BA}
                name="state"
                render={({field: {onChange, value}}) => (
                  <Select
                    value={value}
                    placeholder="Estado"
                    onChange={onChange}
                    options={Object.values(UF).map((uf) => ({
                      value: uf,
                      label: uf,
                    }))}
                  />
                )}
              />
            </div>
          </div>

          <div className="m-4  flex justify-center">
            <span className="m-4 text-black">
              Dados para previsão de cálculo da sonda
            </span>
          </div>

          <div className="grid grid-cols-12 auto-rows-[120px] gap-3">
            {/*Container dos Horários */}
            <div className="col-span-6 row-span-2 w-full p-4 rounded-lg border-2 bg-gray-300 flex flex-col lg:gap-2 ">
              <span className="ml-4 text-black">Taxas dos Horários</span>
              <div className="w-full">
                <TaxInput
                  title="Taxa Hora Disp."
                  label="R$"
                  styles="bg-white w-full px-4 rounded-lg border-2 h-[52px]"
                >
                  <Controller
                    defaultValue="0"
                    control={control}
                    name="availableHourTax"
                    render={({field: {onChange, value}}) => (
                      <InputCurrency
                        onChange={onChange}
                        value={value}
                        error={errors.availableHourTax?.message}
                      />
                    )}
                  />
                </TaxInput>
              </div>
              <div className="w-full">
                <TaxInput
                  title="Taxa Hora Indisp."
                  label="R$"
                  styles="bg-white w-full px-4 rounded-lg border-2 h-[52px]"
                >
                  <Controller
                    defaultValue="0"
                    control={control}
                    name="glossHourTax"
                    render={({field: {onChange, value}}) => (
                      <InputCurrency
                        onChange={onChange}
                        value={value}
                        error={errors.glossHourTax?.message}
                      />
                    )}
                  />
                </TaxInput>
              </div>

              <div className="w-full">
                <TaxInput
                  title="Taxa Hora DTM."
                  label="R$"
                  styles="bg-white w-full px-4 rounded-lg border-2 h-[52px]"
                >
                  <Controller
                    defaultValue="0"
                    control={control}
                    name="dtmHourTax"
                    render={({field: {onChange, value}}) => (
                      <InputCurrency
                        onChange={onChange}
                        value={value}
                        error={errors.dtmHourTax?.message}
                      />
                    )}
                  />
                </TaxInput>
              </div>
            </div>
            {/*Fim do Container dos Horários */}

            {/*Container de DTMs */}
            <div className="col-span-6 row-span-2 w-full p-4 rounded-lg border-2 bg-gray-300 flex flex-col lg:gap-2 ">
              <span className="ml-4 text-black">Taxas de DTM</span>
              <div className="w-full">
                <TaxInput
                  title="Taxa DTM < 20"
                  label="R$"
                  styles="bg-white w-full px-4 rounded-lg border-2 h-[52px]"
                >
                  <Controller
                    defaultValue="0"
                    control={control}
                    name="dtmLt20Tax"
                    render={({field: {onChange, value}}) => (
                      <InputCurrency
                        onChange={onChange}
                        value={value}
                        error={errors.dtmLt20Tax?.message}
                      />
                    )}
                  />
                </TaxInput>
              </div>
              <div className="w-full">
                <TaxInput
                  title="Taxa 20 < DTM >= 50"
                  label="R$"
                  styles="bg-white w-full px-4 rounded-lg border-2 h-[52px]"
                >
                  <Controller
                    defaultValue="0"
                    control={control}
                    name="dtmBt20And50Tax"
                    render={({field: {onChange, value}}) => (
                      <InputCurrency
                        onChange={onChange}
                        value={value}
                        error={errors.dtmBt20And50Tax?.message}
                      />
                    )}
                  />
                </TaxInput>
              </div>
              <div className="w-full">
                <TaxInput
                  title="Taxa DTM > 50"
                  label="R$"
                  styles="bg-white w-full px-4 rounded-lg border-2 h-[52px]"
                >
                  <Controller
                    defaultValue="0"
                    control={control}
                    name="dtmGt50Tax"
                    render={({field: {onChange, value}}) => (
                      <InputCurrency
                        onChange={onChange}
                        value={value}
                        error={errors.dtmGt50Tax?.message}
                      />
                    )}
                  />
                </TaxInput>
              </div>
            </div>
            {/*Fim do container de DTMs */}
          </div>

          <div className="w-full px-4 pb-2   flex flex-col lg:gap-2 lg:flex-row">
            <div className="w-full">
              <TaxInput
                title="Taxa Equip. < 20"
                label="R$"
                styles="bg-white w-full px-4 rounded-lg border-2 h-[52px]"
              >
                <Controller
                  defaultValue="0"
                  control={control}
                  name="equipmentRatioLt20Tax"
                  render={({field: {onChange, value}}) => (
                    <InputCurrency
                      onChange={onChange}
                      value={value}
                      error={errors.equipmentRatioLt20Tax?.message}
                    />
                  )}
                />
              </TaxInput>
            </div>
          </div>

          <div className="w-full px-4  pb-2  flex flex-col lg:gap-2 lg:flex-row">
            <div className="w-full">
              <TaxInput
                title="Taxa 20 < Equip. >= 50"
                label="R$"
                styles="bg-white w-full px-4 rounded-lg border-2 h-[52px]"
              >
                <Controller
                  defaultValue="0"
                  control={control}
                  name="equipmentRatioBt20And50Tax"
                  render={({field: {onChange, value}}) => (
                    <InputCurrency
                      onChange={onChange}
                      value={value}
                      error={errors.equipmentRatioBt20And50Tax?.message}
                    />
                  )}
                />
              </TaxInput>
            </div>
            <div className="w-full">
              <TaxInput
                title="Taxa Equip. > 50"
                label="R$"
                styles="bg-white w-full px-4 rounded-lg border-2 h-[52px]"
              >
                <Controller
                  defaultValue="0"
                  control={control}
                  name="equipmentRatioGt50Tax"
                  render={({field: {onChange, value}}) => (
                    <InputCurrency
                      onChange={onChange}
                      value={value}
                      error={errors.equipmentRatioGt50Tax?.message}
                    />
                  )}
                />
              </TaxInput>
            </div>
          </div>

          <div className="w-full px-4 pb-2   flex flex-col lg:gap-2 lg:flex-row">
            <div className="w-full">
              <TaxInput
                title="Taxa Fluid. < 20"
                label="R$"
                styles="bg-white w-full px-4 rounded-lg border-2 h-[52px]"
              >
                <Controller
                  defaultValue="0"
                  control={control}
                  name="fluidRatioLt20Tax"
                  render={({field: {onChange, value}}) => (
                    <InputCurrency
                      onChange={onChange}
                      value={value}
                      error={errors.fluidRatioLt20Tax?.message}
                    />
                  )}
                />
              </TaxInput>
            </div>
            <div className="w-full">
              <TaxInput
                title="Taxa 20 < Fluid. >= 50"
                label="R$"
                styles="bg-white w-full px-4 rounded-lg border-2 h-[52px]"
              >
                <Controller
                  defaultValue="0"
                  control={control}
                  name="fluidRatioBt20And50Tax"
                  render={({field: {onChange, value}}) => (
                    <InputCurrency
                      onChange={onChange}
                      value={value}
                      error={errors.fluidRatioBt20And50Tax?.message}
                    />
                  )}
                />
              </TaxInput>
            </div>
          </div>

          <div className="w-full px-4 pb-2  flex flex-col lg:gap-2 lg:flex-row">
            <div className="w-full">
              <TaxInput
                title="Fluid. > 50"
                label="R$"
                styles="bg-white w-full px-4 rounded-lg border-2 h-[52px]"
              >
                <Controller
                  defaultValue="0"
                  control={control}
                  name="fluidRatioGt50Tax"
                  render={({field: {onChange, value}}) => (
                    <InputCurrency
                      onChange={onChange}
                      value={value}
                      error={errors.fluidRatioGt50Tax?.message}
                    />
                  )}
                />
              </TaxInput>
            </div>
            <div className="w-full">
              <TaxInput
                title="Taxa Mobilização"
                label="R$"
                styles="bg-white w-full px-4 rounded-lg border-2 h-[52px]"
              >
                <Controller
                  defaultValue="0"
                  control={control}
                  name="mobilization"
                  render={({field: {onChange, value}}) => (
                    <InputCurrency
                      onChange={onChange}
                      value={value}
                      error={errors.mobilization?.message}
                    />
                  )}
                />
              </TaxInput>
            </div>
          </div>

          <div className="w-full px-4 pb-2  flex flex-col lg:gap-2 lg:flex-row">
            <div className="w-1/2">
              <div className="flex items-center justify-between gap-2 bg-white w-full px-4 rounded-lg border-2 h-[52px] ">
                <span className="text-gray-800  mr-10">Reajuste</span>

                <div className="flex w-1/2 justify-end items-center gap-2  ">
                  <span className="text-gray-600 tracking-[-0.5px] text-lg">
                    x
                  </span>

                  <div className="w-1/2">
                    <Input
                      className="  bg-white hover:bg-gray-100 hover:border-3  text-gray-800 font-bold tracking-[-1px] "
                      type="number"
                      step=".00001"
                      placeholder=" "
                      {...register("readjustment")}
                      error={errors.readjustment?.message}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
