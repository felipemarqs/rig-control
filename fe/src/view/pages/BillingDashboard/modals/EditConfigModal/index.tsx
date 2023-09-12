import {Controller} from "react-hook-form";
import {Modal} from "../../../../components/Modal";
import {useEditConfigModal} from "./useEditConfigModal";
import {InputCurrency} from "../../../../components/InputCurrency";
import {Button} from "../../../../components/Button";
import {Input} from "../../../../components/Input";

interface TaxInputProps {
  title: string;
  children: React.ReactNode;
  label: string;
}
const TaxInput = ({title, children, label}: TaxInputProps) => {
  return (
    <div className="flex items-center justify-between gap-2 h-10 border m-1 ">
      <span className="text-gray-800">{title}</span>
      <div className="flex w-1/2 justify-end items-center gap-2  ">
        <span className="text-gray-600 tracking-[-0.5px] text-lg">{label}</span>
        {children}
      </div>
    </div>
  );
};

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
    <Modal
      title="Configuração Sonda"
      open={isEditConfigModalOpen}
      onClose={handleCloseEditConfigModal}
    >
      <form onSubmit={handleSubmit}>
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

        <div className="flex items-center justify-between gap-2 h-10 border m-1 ">
          <span className="text-gray-800  mr-10">Reajuste</span>

          <div className="flex w-1/2 justify-end items-center gap-2  ">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">x</span>

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

        <Button type="submit" isLoading={isLoading}>
          Enviar
        </Button>
      </form>
    </Modal>
  );
};
