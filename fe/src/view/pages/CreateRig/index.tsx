import {Controller} from "react-hook-form";
import {UF} from "../../../app/entities/Rig";
import {Header} from "../../components/Header";
import {Input} from "../../components/Input";
import {InputCurrency} from "../../components/InputCurrency";
import {Select} from "../../components/Select";
import {TaxInput} from "../../components/TaxInput";
import {useCreateRig} from "./useCreateRig";
import {Button} from "../../components/Button";

export const CreateRig = () => {
  const {control, errors, register, handleSubmit, contracts, isLoading} =
    useCreateRig();
  return (
    <div className="w-full h-full overflow-y-scroll">
      <Header
        title="CADASTRO"
        subtitle="Cadastro de sondas e suas configurações"
      />

      <div className="w-full h-full ">
        <div className="grid grid-cols-12 auto-rows-[120px] gap-3"></div>
        <form className="p-4" onSubmit={handleSubmit}>
          <span className="p-4 text-black">Dados da Sonda</span>
          <div className="w-full p-4   flex flex-col gap-2 lg:flex-row">
            <div className="w-full">
              <Input
                className=" bg-white w-full rounded-lg border-2 text-black border-white focus:border-white   hover:bg-gray-100 hover:border-3"
                placeholder="Nome da Sonda"
                labelStyles="text-black"
                error={errors.name?.message}
                {...register("name")}
              />
            </div>
            <div className="w-full">
              <div className="flex gap-1">
                <div className="flex-1">
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
              </div>
            </div>
          </div>

          <div className="m-4  flex justify-center">
            <span className="m-4 text-black">
              Dados para previsão de cálculo da sonda
            </span>
          </div>

          <div className="grid grid-cols-12 auto-rows-[120px] gap-3">
            {/*Container dos Horários */}
            <div className=" col-span-12 lg:col-span-6 row-span-2 w-full p-4 rounded-lg border-2 bg-gray-300 flex flex-col lg:gap-2 ">
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
            <div className=" col-span-12 lg:col-span-6 row-span-2 w-full p-4 rounded-lg border-2 bg-gray-300 flex flex-col lg:gap-2 ">
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

            {/*Container de Equipamento */}
            <div className=" col-span-12 lg:col-span-6 row-span-2 w-full p-4 rounded-lg border-2 bg-gray-300 flex flex-col lg:gap-2 ">
              <span className="ml-4 text-black">
                Taxas de Movimentação de Equipamento
              </span>
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
            {/*Fim do Container de Equipamento */}

            {/*Container de Flúido */}
            <div className=" col-span-12 lg:col-span-6 row-span-2 w-full p-4 rounded-lg border-2 bg-gray-300 flex flex-col lg:gap-2 ">
              <span className="ml-4 text-black">
                Taxas de Movimentação de Flúidos
              </span>
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
            </div>
            {/*Fim do Container de Flúido */}

            <div className=" col-span-12 lg:col-span-6 row-span-2 w-full p-4 rounded-lg border-2 bg-gray-300 flex flex-col lg:gap-2 ">
              <span className="ml-4 text-black">Taxas de Mobilização</span>
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
              <div className="w-full">
                <TaxInput
                  title="Taxa Desmobilização"
                  label="R$"
                  styles="bg-white w-full px-4 rounded-lg border-2 h-[52px]"
                >
                  <Controller
                    defaultValue="0"
                    control={control}
                    name="demobilization"
                    render={({field: {onChange, value}}) => (
                      <InputCurrency
                        onChange={onChange}
                        value={value}
                        error={errors.demobilization?.message}
                      />
                    )}
                  />
                </TaxInput>
              </div>
              <div className="w-full">
                <TaxInput
                  title="Taxa de Transporte"
                  label="R$"
                  styles="bg-white w-full px-4 rounded-lg border-2 h-[52px]"
                >
                  <Controller
                    defaultValue="0"
                    control={control}
                    name="transportationTax"
                    render={({field: {onChange, value}}) => (
                      <InputCurrency
                        onChange={onChange}
                        value={value}
                        error={errors.transportationTax?.message}
                      />
                    )}
                  />
                </TaxInput>
              </div>
            </div>

            <div className=" col-span-12 lg:col-span-6 row-span-2 w-full p-4 rounded-lg border-2 bg-gray-300 flex flex-col lg:gap-2 ">
              <span className="ml-4 text-black">Taxas de Caminhão</span>

              <div className="w-full">
                <TaxInput
                  title="Taxa Loc Caminhão + Carreta / Mensal"
                  label="R$"
                  styles="bg-white w-full px-4 rounded-lg border-2 h-[52px]"
                >
                  <Controller
                    defaultValue="0"
                    control={control}
                    name="truckCartRentTax"
                    render={({field: {onChange, value}}) => (
                      <InputCurrency
                        onChange={onChange}
                        value={value}
                        error={errors.truckCartRentTax?.message}
                      />
                    )}
                  />
                </TaxInput>
              </div>

              <div className="w-full">
                <TaxInput
                  title="Taxa Loc Caminhão + Tanque / Mensal"
                  label="R$"
                  styles="bg-white w-full px-4 rounded-lg border-2 h-[52px]"
                >
                  <Controller
                    defaultValue="0"
                    control={control}
                    name="truckTankTax"
                    render={({field: {onChange, value}}) => (
                      <InputCurrency
                        onChange={onChange}
                        value={value}
                        error={errors.truckTankTax?.message}
                      />
                    )}
                  />
                </TaxInput>
              </div>

              <div className="w-full">
                <TaxInput
                  title="Taxa Km Caminhão / km"
                  label="R$"
                  styles="bg-white w-full px-4 rounded-lg border-2 h-[52px]"
                >
                  <Controller
                    defaultValue="0"
                    control={control}
                    name="truckKmTax"
                    render={({field: {onChange, value}}) => (
                      <InputCurrency
                        onChange={onChange}
                        value={value}
                        error={errors.truckKmTax?.message}
                      />
                    )}
                  />
                </TaxInput>
              </div>
            </div>

            <div className=" col-span-12 lg:col-span-6 row-span-4 w-full p-4 rounded-lg border-2 bg-gray-300 flex flex-col lg:gap-2 ">
              <span className="ml-4 text-black">Taxas de Equipamentos</span>
              <div className="w-full">
                <TaxInput
                  title="Taxa BOP 7 1/16 x 5000 PSI / hora"
                  label="R$"
                  styles="bg-white w-full px-4 rounded-lg border-2 h-[52px]"
                >
                  <Controller
                    defaultValue="0"
                    control={control}
                    name="bobRentTax"
                    render={({field: {onChange, value}}) => (
                      <InputCurrency
                        onChange={onChange}
                        value={value}
                        error={errors.bobRentTax?.message}
                      />
                    )}
                  />
                </TaxInput>
              </div>

              <div className="w-full">
                <TaxInput
                  title="Taxa combustível gerador / diária"
                  label="R$"
                  styles="bg-white w-full px-4 rounded-lg border-2 h-[52px]"
                >
                  <Controller
                    defaultValue="0"
                    control={control}
                    name="generatorFuelTax"
                    render={({field: {onChange, value}}) => (
                      <InputCurrency
                        onChange={onChange}
                        value={value}
                        error={errors.generatorFuelTax?.message}
                      />
                    )}
                  />
                </TaxInput>
              </div>

              <div className="w-full">
                <TaxInput
                  title="Taxa de Trailer Extra"
                  label="R$"
                  styles="bg-white w-full px-4 rounded-lg border-2 h-[52px]"
                >
                  <Controller
                    defaultValue="0"
                    control={control}
                    name="extraTrailerTax"
                    render={({field: {onChange, value}}) => (
                      <InputCurrency
                        onChange={onChange}
                        value={value}
                        error={errors.extraTrailerTax?.message}
                      />
                    )}
                  />
                </TaxInput>
              </div>

              <div className="w-full">
                <TaxInput
                  title="Taxa de Power Swivel"
                  label="R$"
                  styles="bg-white w-full px-4 rounded-lg border-2 h-[52px]"
                >
                  <Controller
                    defaultValue="0"
                    control={control}
                    name="powerSwivelTax"
                    render={({field: {onChange, value}}) => (
                      <InputCurrency
                        onChange={onChange}
                        value={value}
                        error={errors.powerSwivelTax?.message}
                      />
                    )}
                  />
                </TaxInput>
              </div>
              <div className="w-full">
                <TaxInput
                  title="Taxa de Caminhão Sugador / diária"
                  label="R$"
                  styles="bg-white w-full px-4 rounded-lg border-2 h-[52px]"
                >
                  <Controller
                    defaultValue="0"
                    control={control}
                    name="suckingTruckTax"
                    render={({field: {onChange, value}}) => (
                      <InputCurrency
                        onChange={onChange}
                        value={value}
                        error={errors.suckingTruckTax?.message}
                      />
                    )}
                  />
                </TaxInput>
              </div>

              <div className="w-full">
                <TaxInput
                  title="Taxa de Locação de Munck"
                  label="R$"
                  styles="bg-white w-full px-4 rounded-lg border-2 h-[52px]"
                >
                  <Controller
                    defaultValue="0"
                    control={control}
                    name="munckTax"
                    render={({field: {onChange, value}}) => (
                      <InputCurrency
                        onChange={onChange}
                        value={value}
                        error={errors.munckTax?.message}
                      />
                    )}
                  />
                </TaxInput>
              </div>

              <div className="w-full">
                <TaxInput
                  title="Taxa de Desmon. Árvore de Natal"
                  label="R$"
                  styles="bg-white w-full px-4 rounded-lg border-2 h-[52px]"
                >
                  <Controller
                    defaultValue="0"
                    control={control}
                    name="christmasTreeDisassemblyTax"
                    render={({field: {onChange, value}}) => (
                      <InputCurrency
                        onChange={onChange}
                        value={value}
                        error={errors.christmasTreeDisassemblyTax?.message}
                      />
                    )}
                  />
                </TaxInput>
              </div>
            </div>

            <div className=" col-span-12 lg:col-span-6 row-span-4 w-full p-4 rounded-lg border-2 bg-gray-300 flex flex-col lg:gap-2 ">
              <span className="ml-4 text-black">Taxas de Tanque Mix</span>
              <div className="w-full">
                <TaxInput
                  title="Taxa Loc. Tanque Mix / mensal"
                  label="R$"
                  styles="bg-white w-full px-4 rounded-lg border-2 h-[52px]"
                >
                  <Controller
                    defaultValue="0"
                    control={control}
                    name="mixTankMonthRentTax"
                    render={({field: {onChange, value}}) => (
                      <InputCurrency
                        onChange={onChange}
                        value={value}
                        error={errors.mixTankMonthRentTax?.message}
                      />
                    )}
                  />
                </TaxInput>
              </div>

              <div className="w-full">
                <TaxInput
                  title="Taxa Loc. Tanque Mix / Hora"
                  label="R$"
                  styles="bg-white w-full px-4 rounded-lg border-2 h-[52px]"
                >
                  <Controller
                    defaultValue="0"
                    control={control}
                    name="mixTankHourRentTax"
                    render={({field: {onChange, value}}) => (
                      <InputCurrency
                        onChange={onChange}
                        value={value}
                        error={errors.mixTankHourRentTax?.message}
                      />
                    )}
                  />
                </TaxInput>
              </div>

              <div className="w-full">
                <TaxInput
                  title="Taxa de Mobilização Tanque Mix"
                  label="R$"
                  styles="bg-white w-full px-4 rounded-lg border-2 h-[52px]"
                >
                  <Controller
                    defaultValue="0"
                    control={control}
                    name="mixTankMobilizationTax"
                    render={({field: {onChange, value}}) => (
                      <InputCurrency
                        onChange={onChange}
                        value={value}
                        error={errors.mixTankMobilizationTax?.message}
                      />
                    )}
                  />
                </TaxInput>
              </div>

              <div className="w-full">
                <TaxInput
                  title="Taxa de Desmobilização Tanque Mix"
                  label="R$"
                  styles="bg-white w-full px-4 rounded-lg border-2 h-[52px]"
                >
                  <Controller
                    defaultValue="0"
                    control={control}
                    name="mixTankDemobilizationTax"
                    render={({field: {onChange, value}}) => (
                      <InputCurrency
                        onChange={onChange}
                        value={value}
                        error={errors.mixTankDemobilizationTax?.message}
                      />
                    )}
                  />
                </TaxInput>
              </div>

              <div className="w-full">
                <TaxInput
                  title="Taxa de DTM Tanque Mix"
                  label="R$"
                  styles="bg-white w-full px-4 rounded-lg border-2 h-[52px]"
                >
                  <Controller
                    defaultValue="0"
                    control={control}
                    name="mixTankDtmTax"
                    render={({field: {onChange, value}}) => (
                      <InputCurrency
                        onChange={onChange}
                        value={value}
                        error={errors.mixTankDtmTax?.message}
                      />
                    )}
                  />
                </TaxInput>
              </div>

              <div className="w-full">
                <TaxInput
                  title="Taxa de Operadores Tanque Mix / Diária"
                  label="R$"
                  styles="bg-white w-full px-4 rounded-lg border-2 h-[52px]"
                >
                  <Controller
                    defaultValue="0"
                    control={control}
                    name="mixTankOperatorTax"
                    render={({field: {onChange, value}}) => (
                      <InputCurrency
                        onChange={onChange}
                        value={value}
                        error={errors.mixTankOperatorTax?.message}
                      />
                    )}
                  />
                </TaxInput>
              </div>
            </div>

            <div className=" col-span-12 lg:col-span-6 row-span-1 w-full p-4 rounded-lg border-2 bg-gray-300 flex flex-col lg:gap-2 ">
              <span className="ml-4 text-black">Taxa de Reajuste</span>
              <div className="w-full">
                <div className="flex items-center justify-between gap-2 bg-white w-full px-4 rounded-lg border-2 h-[52px] ">
                  <span className="text-gray-800  mr-10">Reajuste</span>

                  <div className="flex w-1/2 justify-end items-center gap-2  ">
                    <span className="text-gray-600 tracking-[-0.5px] text-lg">
                      x
                    </span>

                    <div className="w-1/2">
                      <Input
                        className="  bg-white h-[42px] hover:bg-gray-100 hover:border-3  text-gray-800 font-bold tracking-[-1px] "
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

            <div className=" col-span-12  row-span-1 w-full p-4 rounded-lg  flex flex-col lg:gap-2 lg:col-span-8 lg:col-start-3 ">
              <Button type="submit" isLoading={isLoading}>
                Enviar
              </Button>
            </div>
          </div>

          {/* 
    "availableHourTax": 919, ✅
    "glossHourTax": 735.20, ✅ 
    "dtmLt20Tax": 5514,✅ 
    "dtmBt20And50Tax": 5268,✅
    "dtmGt50Tax": 7024,✅
    "fluidRatioLt20Tax": 2000,✅
    "fluidRatioBt20And50Tax": 3000,✅
    "fluidRatioGt50Tax": 4000,✅
    "equipmentRatioLt20Tax": 1756,✅
    "equipmentRatioBt20And50Tax": 2634,✅
    "equipmentRatioGt50Tax": 4390,✅
    "readjustment": 1.5991,
    "mobilization": 0,✅
    "bobRentTax": 100,✅
    "demobilization": 50,✅
    "dtmHourTax": 5000,✅
    "extraTrailerTax": 200,✅
    "generatorFuelTax": 300,✅
    "mixTankDemobilizationTax": 150,✅
    "mixTankDtmTax": 500,✅
    "mixTankHourRentTax": 50,✅
    "mixTankMobilizationTax": 100,✅
    "mixTankMonthRentTax": 2000,✅
    "mixTankOperatorTax": 300,✅
    "powerSwivelTax": 100,✅
    "suckingTruckTax": 100,✅
    "transportationTax": 400,✅
    "truckCartRentTax": 250,✅
    "truckKmTax": 2✅
    truckTankTax ✅
    munckTax✅
             */}
        </form>
      </div>
    </div>
  );
};
