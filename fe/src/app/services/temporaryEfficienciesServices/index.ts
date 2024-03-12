import {create} from "./create";
import {getAll} from "./getAll";
import {getById} from "./getById";
import {getByUserId} from "./getByUserId";
import {remove} from "./remove";

export const temporaryEfficienciesServices = {
  create: create,
  getAll: getAll,
  getById: getById,
  getByUserId: getByUserId,
  remove: remove,
};
