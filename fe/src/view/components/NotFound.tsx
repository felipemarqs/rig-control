import React from "react";
import emptyBox from "../../assets/icons/emptyBox.svg";

interface NotFoundProps {
  children: React.ReactNode;
}

export const NotFound = ({children}: NotFoundProps) => {
  return (
    <div className="w-full h-full flex justify-center items-center ">
      <div className="flex justify-center items-center flex-col">
        <img src={emptyBox} />
        <h2 className="text-primary-500 mt-1 flex-1">{children}</h2>
      </div>
    </div>
  );
};
