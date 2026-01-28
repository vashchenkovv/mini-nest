import { PipeTransform } from "./interfaces";

export type Type<T = any> = {
  new (...args: any[]): T;
};

export type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

export type Paramtype = 'body' | 'query' | 'param' | 'header' | 'cookie' | 'file' | 'files';

export type PipesType = Type<PipeTransform> | InstanceType<Type<PipeTransform>>;