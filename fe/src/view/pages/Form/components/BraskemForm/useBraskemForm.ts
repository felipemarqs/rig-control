import {useCallback, useState} from "react";
import {useForm} from "../FormContext/useForm";

export const useBraskemForm = () => {
  const [isMixTankSelected, setIsMixTankSelected] = useState(false);

  const handleMixTankCheckBox = () => {
    setIsMixTankSelected((prevState) => !prevState);
  };

  const [isMixTankMonthSelected, setIsMixTankMonthSelected] = useState(false);

  const handleMixTankMonthCheckBox = () => {
    setIsMixTankMonthSelected((prevState) => !prevState);
  };

  const [isMixTankOperatorsSelected, setIsMixTankOperatorsSelected] =
    useState(false);

  const handleMixTankOperatorsCheckBox = () => {
    setIsMixTankOperatorsSelected((prevState) => !prevState);
  };

  const [isTankMixMobilizationSelected, setIsTankMixMobilizationSelected] =
    useState(false);

  const handleTankMixMobilizationCheckbox = useCallback(() => {
    setIsTankMixMobilizationSelected((prevState) => !prevState);
  }, []);

  const [isTankMixDemobilizationSelected, setIsTankMixDemobilizationSelected] =
    useState(false);

  const handleTankMixDemobilizationCheckbox = useCallback(() => {
    setIsTankMixDemobilizationSelected((prevState) => !prevState);
  }, []);

  const [isFuelGeneratorSelected, setIsFuelGeneratorSelected] = useState(false);

  const handleFuelGeneratorCheckBox = () => {
    setIsFuelGeneratorSelected((prevState) => !prevState);
  };

  const [isMobilizationSelected, setIsMobilizationSelected] = useState(false);

  const handleMobilizationCheckbox = useCallback(() => {
    setIsMobilizationSelected((prevState) => !prevState);
  }, []);

  const [isDemobilizationSelected, setIsDemobilizationSelected] =
    useState(false);

  const handleDemobilizationCheckbox = useCallback(() => {
    setIsDemobilizationSelected((prevState) => !prevState);
  }, []);

  return {
    handleMixTankCheckBox,
    isMixTankSelected,
    handleMixTankOperatorsCheckBox,
    isMixTankOperatorsSelected,
    isMixTankMonthSelected,
    handleMixTankMonthCheckBox,
    isFuelGeneratorSelected,
    handleFuelGeneratorCheckBox,
    handleMobilizationCheckbox,
    isMobilizationSelected,
    isDemobilizationSelected,
    handleDemobilizationCheckbox,
    isTankMixMobilizationSelected,
    isTankMixDemobilizationSelected,
    handleTankMixMobilizationCheckbox,
    handleTankMixDemobilizationCheckbox,
  };
};
