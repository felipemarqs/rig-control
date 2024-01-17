import {Header} from "../../components/Header";
import {ReportContext, ReportProvider} from "./components/ReportContext";

export const Report = () => {
  return (
    <ReportProvider>
      <ReportContext.Consumer>
        {({rigs}) => (
          <div className="w-full h-full overflow-y-scroll">
            <Header title="RELATÓRIO" subtitle="Relatório por Períodos" />
            {rigs.map(({name}) => (
              <p>{name}</p>
            ))}
          </div>
        )}
      </ReportContext.Consumer>
    </ReportProvider>
  );
};
