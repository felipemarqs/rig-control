import {Controller} from "react-hook-form";
import {useEditConfigModal} from "./useEditConfigModal";
import {InputCurrency} from "../../../../components/InputCurrency";
import {Button} from "../../../../components/Button";
import {Input} from "../../../../components/Input";
import {ConfigModal} from "../../components/ConfigModal";
import {TaxInput} from "../../../../components/TaxInput";

export const EditConfigModal = () => {
  const {
    isEditConfigModalOpen,
    handleCloseEditConfigModal,
    handleSubmit,
    control,
    errors,
    isLoading,
    register,
  } = useEditConfigModal();

  return (
    <ConfigModal
      title="Configuração Sonda"
      open={isEditConfigModalOpen}
      onClose={handleCloseEditConfigModal}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <div className="w-full">
            <TaxInput title="Taxa Hora Indisp." label="R$">
              <Controller
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

            <TaxInput title="Taxa Hora Indisp." label="R$">
              <Controller
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

            <TaxInput title="Taxa DTM < 20" label="R$">
              <Controller
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

            <TaxInput title="Taxa 20 < DTM >= 50" label="R$">
              <Controller
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

            <TaxInput title="Taxa DTM > 50" label="R$">
              <Controller
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

            <TaxInput title="DTM (hora)" label="R$">
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

            <TaxInput title="Taxa Equip. < 20" label="R$">
              <Controller
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

            <TaxInput title="Taxa 20 < Equip. >= 50" label="R$">
              <Controller
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

            <TaxInput title="Equip. > 50" label="R$">
              <Controller
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

            <TaxInput title="Taxa Fluid. < 20" label="R$">
              <Controller
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

            <TaxInput title="Taxa 20 < Fluid. >= 50" label="R$">
              <Controller
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

            <TaxInput title="Fluid. > 50" label="R$">
              <Controller
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

            <TaxInput title="Mobilização" label="R$">
              <Controller
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

            <TaxInput title="Desmobilização" label="R$">
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

            <TaxInput title="Taxa de Transporte" label="R$">
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

            <div className="flex items-center justify-between gap-2 h-10 border m-1 ">
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

          <div className="w-full">
            <TaxInput title=" Loc Caminhão + Carreta / Mensal" label="R$">
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

            <TaxInput title="Taxa Loc Caminhão + Tanque / Mensal" label="R$">
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

            <TaxInput title="Taxa Km Caminhão / km" label="R$">
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

            <TaxInput title="Taxa BOP 7 1/16 x 5000 PSI / hora" label="R$">
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

            <TaxInput title="Taxa combustível gerador / diária" label="R$">
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

            <TaxInput title="Taxa de Trailer Extra" label="R$">
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

            <TaxInput title="Taxa de Power Swivel" label="R$">
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

            <TaxInput title="Taxa de Caminhão Sugador / diária" label="R$">
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

            <TaxInput title="Taxa de Locação de Munck" label="R$">
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

            <TaxInput title="Taxa Loc. Tanque Mix / mensal" label="R$">
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

            <TaxInput title="Taxa Loc. Tanque Mix / Hora" label="R$">
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

            <TaxInput title="Taxa de Mobilização Tanque Mix" label="R$">
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

            <TaxInput title="Taxa de Desmobilização Tanque Mix" label="R$">
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

            <TaxInput title="Taxa de DTM Tanque Mix" label="R$">
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

            <TaxInput title="Taxa de Operadores Tanque Mix / Diária" label="R$">
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

            <TaxInput title="Taxa Árvore de Natal" label="R$">
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

        <Button type="submit" isLoading={isLoading}>
          Enviar
        </Button>
      </form>
    </ConfigModal>
  );
};
