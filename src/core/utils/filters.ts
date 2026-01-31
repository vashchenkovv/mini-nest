import { META_MINI_FILTERS } from "../constansts";
import { ExceptionFilter } from "../interfaces";
import { Type } from "../types";

export const getFilters = (handler: Function, controllerClass: Type, globalFilters: (ExceptionFilter | Function)[] = []) => {
  const controllerFilters = Reflect.getMetadata(META_MINI_FILTERS, controllerClass) ?? [];
  const routeFilters = Reflect.getMetadata(META_MINI_FILTERS, handler) ?? [];
  return [...routeFilters, ...controllerFilters, ...globalFilters];
}