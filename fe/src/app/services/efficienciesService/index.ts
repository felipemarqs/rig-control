import {create} from "./create";
import {getAll} from "./getAll";
import {getAverage} from "./getAverage";
import {getById} from "./getById";
import {remove} from "./remove";

export const efficienciesService = {
  create: create,
  getAll: getAll,
  getById: getById,
  remove: remove,
  getAverage: getAverage,
};
