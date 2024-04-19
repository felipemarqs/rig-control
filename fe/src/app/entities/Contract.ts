import {Rig} from "./Rig";

export interface Contract {
  id: string;
  name: string;
  rigs: Array<Rig>;
  logoImagePath?: string;
}
