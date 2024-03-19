import {create} from "./create";
import {getAll} from "./getAll";
import {getAverage} from "./getAverage";
import {getById} from "./getById";
import {getRigsAverage} from "./getRigsAverage";
import {remove} from "./remove";
import {update} from "./update";

export const efficienciesService = {
  create: create,
  getAll: getAll,
  remove: remove,
  update: update,
  getById: getById,
  getAverage: getAverage,
  getRigsAverage: getRigsAverage,
};
