import { META_MINI_PREFIX } from "../constansts";

export function Controller(prefix = '') {
  return function (target: any) {
    Reflect.defineMetadata(META_MINI_PREFIX, prefix, target);
  };
}