import {useCallback, useState} from "react";
import {UF} from "../../../app/entities/Rig";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  state: z.string().nonempty("Estado é obrigatório"),
  availableHourTax: z.union([z.string().nonempty("Obrigatório"), z.number()]),
  dtmBt20And50Tax: z.union([z.string().nonempty("Obrigatório"), z.number()]),
  dtmHourTax: z.union([z.string().nonempty("Obrigatório"), z.number()]),
  dtmGt50Tax: z.union([z.string().nonempty("Obrigatório"), z.number()]),
  dtmLt20Tax: z.union([z.string().nonempty("Saldo é obrigatório"), z.number()]),
  equipmentRatioBt20And50Tax: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),
  equipmentRatioGt50Tax: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),
  equipmentRatioLt20Tax: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),
  fluidRatioBt20And50Tax: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),
  fluidRatioGt50Tax: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),
  fluidRatioLt20Tax: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),
  glossHourTax: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),

  mobilization: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),
  readjustment: z.union([
    z.string().nonempty("Saldo é obrigatório"),
    z.number(),
  ]),
});

type FormData = z.infer<typeof schema>;

export const useCreateRig = () => {
  const [selectedUF, setSelectedUF] = useState<UF>(UF.BA);

  const handleUfChange = useCallback((value: UF) => {
    setSelectedUF(value);
  }, []);

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    control,
    reset,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return {register, control, errors};
};
