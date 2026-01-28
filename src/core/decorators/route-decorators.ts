import { META_MINI_ROUTES } from "../constansts";
import { IRouteData } from "../interfaces";
import { Method } from "../types";

export function Route(method: Method, path = '') {
  return function (target: any, key: string) {
    const routes: IRouteData[] = Reflect.getMetadata(META_MINI_ROUTES, target.constructor) ?? [];
    routes.push({ method, path, handlerName: key });
    Reflect.defineMetadata(META_MINI_ROUTES, routes, target.constructor);
  };
}

export const Get = (path = '') => Route('get', path);
export const Post = (path = '') => Route('post', path);
export const Put = (path = '') => Route('put', path);
export const Patch = (path = '') => Route('patch', path);
export const Delete = (path = '') => Route('delete', path);