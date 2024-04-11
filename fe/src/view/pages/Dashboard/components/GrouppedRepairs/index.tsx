import {useGrouppedRepairs} from "./useGrouppedRepairs";
import {cn} from "../../../../../app/utils/cn";

export const GrouppedRepairs = () => {
  const {repairGroupedData, handleSelectEquipment} = useGrouppedRepairs();

  return (
    <div
      className={cn(
        `max-h-full ${
          repairGroupedData.groupedData.length <= 3 ? "" : "overflow-y-scroll"
        }`
      )}
    >
      <header className="bg-primary text-white p-2 rounded-t-lg justify-center flex">
        <span className="text-white font-semibold">Reparos</span>
      </header>
      <div className="flex flex-col gap-2  ">
        {repairGroupedData.groupedData.map((data) => (
          <div
            className="p-4 bg-white rounded-sm flex flex-col justify-between border-y-2 gap-4 border-primary-100"
            key={data.equipment}
          >
            <div className="flex gap-2">
              <span className="text-primary"> Equipamento:</span>

              <span className="text-primary font-semibold italic">
                {data.equipment}
              </span>
            </div>

            <div className="flex gap-2">
              <span className="text-primary"> Tempo em Reparo:</span>

              <span className="text-primary font-semibold italic">
                {data.totalHours} Hrs
              </span>
              <div
                className="flex-1 flex justify-end"
                onClick={() => handleSelectEquipment(data.id)}
              >
                <span className="underline text-primary cursor-pointer font-semibold italic">
                  {" "}
                  Ver detalhes
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
