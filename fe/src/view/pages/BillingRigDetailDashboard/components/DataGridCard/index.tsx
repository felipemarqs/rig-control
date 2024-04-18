import {Button} from "@/components/ui/button";
import {useDataGridCard} from "./useDataGridCard";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {ArrowUpRight} from "lucide-react";
import {Link} from "react-router-dom";
import {Spinner} from "@/view/components/Spinner";

import {NotFound} from "@/view/components/NotFound";
import {ListBillingDataGrid} from "../ListBillingDataGrid";

export const DataGridCard = () => {
  const {isEmpty, isFetchingBilling} = useDataGridCard();
  return (
    <Card className="col-span-12 row-span-3 lg:col-span-5 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] overflow-y-auto">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Ocorrências</CardTitle>
          <CardDescription>
            Lista de Ocorrências do período selecionado
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link to="/">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-0 h-4/5 ">
        {isFetchingBilling && (
          <div className="h-full flex items-center justify-center">
            <Spinner />
          </div>
        )}
        {!isEmpty && !isFetchingBilling && (
          <div className="max-w-full">
            <ListBillingDataGrid />
          </div>
        )}

        {isEmpty && !isFetchingBilling && (
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
      </CardContent>
    </Card>
  );
};
