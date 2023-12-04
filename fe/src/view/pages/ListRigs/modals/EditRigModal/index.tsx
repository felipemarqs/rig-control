import { Controller } from "react-hook-form";
import { Modal } from "../../../../components/Modal";
import { useEditRigModal } from "./useEditRigModal";
import { Input } from "../../../../components/Input";
import { UF } from "../../../../../app/entities/Rig";
import { Select } from "../../../../components/Select";
import { Button } from "../../../../components/Button";

export const EditRigModal = () => {
  const {
    isEditRigModalOpen,
    handleCloseEditRigModal,
    rigBeingEdited,
    control,
    errors,
    register,
    isActiveOptions,
    handleSubmit,
    isLoading,
  } = useEditRigModal();

  return (
    <Modal
      title="Editar Sonda"
      open={isEditRigModalOpen}
      onClose={handleCloseEditRigModal}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex-1">
            <Input
              className=" bg-gray-200 w-full rounded-lg border-2 text-black border-white focus:border-white   hover:bg-gray-100 hover:border-3"
              placeholder="Nome da Sonda"
              labelStyles="text-black"
              error={errors.name?.message}
              {...register("name")}
            />
          </div>

          <div className="flex gap-2 justify-between">
            <div className="flex-1">
              <Controller
                control={control}
                defaultValue={rigBeingEdited?.state!}
                name="state"
                render={({ field: { onChange, value } }) => (
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
                name="isActive"
                render={({ field: { onChange, value } }) => (
                  <Select
                    value={value}
                    placeholder="Estado"
                    onChange={onChange}
                    options={isActiveOptions}
                  />
                )}
              />
            </div>
          </div>

          <Button type="submit" isLoading={isLoading}>
            Atualizar
          </Button>
        </div>
      </form>
    </Modal>
  );
};
