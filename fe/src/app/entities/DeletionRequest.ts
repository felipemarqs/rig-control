import {PersistanceEfficiency} from "./PersistanceEfficiency";
import {RequestStatus} from "./RequestStatus";
import {User} from "./User";

export type DeletionRequest = {
  id: string;
  user: Partial<User>;
  efficiency: Partial<PersistanceEfficiency>;
  reason: string;
  status: RequestStatus;
  createdAt: string;
};
