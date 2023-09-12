import { Transition } from "@headlessui/react";
import whiteLogo from '../../assets/images/white-logo.png'
import { Spinner } from "./Spinner";

interface PageLoaderProps {
  isLoading: boolean;
}

export const PageLoader = ({ isLoading }: PageLoaderProps) => {
  return (
    <Transition
      show={isLoading}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="bg-primary-500 fixed top-0 left-0 h-full w-full grid place-items-center">
        <div className="flex justify-center items-center gap-4 flex-col">
        <div className="h-52 w-52">
            <img alt="logo" src={whiteLogo}/>
        </div>
          <Spinner className="text-primary-500 fill-white h-10 w-10" />
        </div>
      </div>
    </Transition>
  );
};
