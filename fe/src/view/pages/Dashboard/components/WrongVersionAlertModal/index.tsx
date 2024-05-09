import {Button} from "@/components/ui/button";
import {Modal} from "@/view/components/Modal";

export const WrongVersionAlertModal = () => {
  return (
    <Modal open title="Sua versão do aplicativo está desatualizada!">
      <div className="flex flex-col gap-10">
        <div>
          <span className="text-gray-700">
            Para garantir a melhor experiência possível, é necessário atualizar
            para a versão mais recente. Clique no botão abaixo para recarregar a
            página e aplicar as atualizações.
          </span>
        </div>
        <Button onClick={() => window.location.reload()}>
          Recarregar Página
        </Button>
      </div>
    </Modal>
  );
};
