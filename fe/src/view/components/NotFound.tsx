import React from "react";
import emptyBox from "../../assets/icons/emptyBox.svg";

interface NotFoundProps {
  children: React.ReactNode;
  Icon?: React.ExoticComponent<any>;
}

export const NotFound = ({children, Icon}: NotFoundProps) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex justify-center items-center flex-col">
        {Icon && <Icon />}
        {!Icon && <img src={emptyBox} />}
        <h2 className="text-primary mt-1 text-center flex-1">{children}</h2>
      </div>
    </div>
  );
};
