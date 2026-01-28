import { Method, Paramtype, Type } from "./types";
import type { Request, Response } from 'express';

export interface IMiniNestApp {
  listen: (port: number, callback?: () => void) => void,
  useGlobalGuards: (guards: Type[]) => void,
  useGlobalPipes: (pipes: Type[]) => void,
  useGlobalFilters: (filters: Type[]) => void,
}

export interface IRouteData {
  method: Method,
  path: string,
  handlerName: string;
}

export interface IExecutionContext {
  getClass(): Function;
  getHandler(): Function;
  switchToHttp(): {
    getRequest: () => Request;
    getResponse: () => Response;
  };
}

export interface CanActivate {
  canActivate(ctx: IExecutionContext): boolean | Promise<boolean> | undefined;
}

export interface ArgumentMetadata {
  readonly index: number;
  readonly type: Paramtype;
  readonly metatype?: Type;
  readonly data?: string;
  readonly name?: string | symbol;
}

export interface PipeTransform<T = any, R = any> {
  transform(value: T, metadata: ArgumentMetadata): R | Promise<R>;
}
