import {Button} from "@/components/ui/button";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {Pencil, Trash} from "lucide-react";
import {Link} from "react-router-dom";
import {Spinner} from "@/view/components/Spinner";
import {usePeriodsDataGrid} from "./usePeriodsDataGrid";
import {PeriodsDataGrid} from "./components/PeriodsDataGrid";
import {NotFound} from "@/view/components/NotFound";

export const PeriodsDataGridCard = () => {
  const {
    isFetchingEfficiency,
    efficiency,
    canUserEdit,
    openDeleteModal,
    handleUpdateEfficiency,
    isLoadingUpdateEfficiency,
    windowWidth,
    efficiencyId,
    openDetailModal,
  } = usePeriodsDataGrid();

  return (
    <Card className="col-span-12 row-span-3 lg:col-span-12 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] overflow-y-auto">
      <CardHeader className="flex flex-row items-center justify-between gap-4 ">
        <div className="grid gap-2">
          <CardTitle>Ocorrências</CardTitle>
          <CardDescription>
            <span> Lista de Ocorrências</span>{" "}
            <span className="hidden sm:inline"> do período selecionado</span>
          </CardDescription>
        </div>
        {efficiency && (
          <>
            <div className="flex justify-end  gap-10 lg:w-1/2 ">
              {canUserEdit && (
                <Button
                  size="sm"
                  className="gap-1"
                  onClick={openDeleteModal}
                  variant="destructive"
                >
                  <span className="hidden sm:inline"> Deletar Registro</span>
                  <Trash className="h-4 w-4" />
                </Button>
              )}

              {efficiency.isEditable && (
                <Button
                  asChild
                  size="sm"
                  className="flex justify-center items-center gap-1"
                >
                  <Link to={`/form/${efficiencyId}`}>
                    <span className="hidden sm:inline"> Editar Registro</span>
                    <Pencil className="h-4 w-4" />
                  </Link>
                </Button>
              )}

              {!efficiency.isEditable && canUserEdit && (
                <Button
                  size="sm"
                  className="flex justify-center items-center gap-2"
                  disabled={isLoadingUpdateEfficiency}
                  onClick={() => handleUpdateEfficiency()}
                >
                  <span className="hidden sm:inline">
                    {" "}
                    Tornar Registro Editável
                  </span>
                  <Pencil className="h-4 w-4" />
                </Button>
              )}
            </div>
          </>
        )}
      </CardHeader>
      <CardContent className="p-0 h-4/5 ">
        {isFetchingEfficiency && (
          <div className="h-full flex items-center justify-center">
            <Spinner />
          </div>
        )}

        {efficiency && !isFetchingEfficiency && (
          <div className="max-w-full">
            <PeriodsDataGrid
              data={efficiency}
              windowWidth={windowWidth}
              openDetailModal={openDetailModal}
            />
          </div>
        )}

        {!efficiency && !isFetchingEfficiency && (
          <div className="h-full flex items-center justify-center">
            <NotFound>
              {
                <p>
                  Sem dados para o <strong>período</strong> selecionado
                </p>
              }
            </NotFound>
          </div>
        )}
        {/*  

         */}
      </CardContent>
    </Card>
  );
};
