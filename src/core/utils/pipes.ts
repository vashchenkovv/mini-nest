import { META_MINI_PIPES, META_MINI_ARRG_PIPE } from "../constansts";
import { container } from "../container";
import { ArgumentMetadata, PipeTransform } from "../interfaces";
import { PipesType } from "../types";
import { isClass } from "./is-class";

const getPipes = (handler: Function, controllerClass: Object, globalPipes: PipesType[] = [], meta: ArgumentMetadata,) => {
  const controllerPipes = Reflect.getMetadata(META_MINI_PIPES, controllerClass) ?? [];
  const routePipes = Reflect.getMetadata(META_MINI_PIPES, handler) ?? [];
  const argPipes: Record<number, any[]> = Reflect.getMetadata(META_MINI_ARRG_PIPE, handler) ?? {};
  return [...(argPipes[meta.index] ?? []), ...routePipes, ...controllerPipes, ...globalPipes];
}

export async function runPipes(
  controllerCls: Function,
  handler: Function,
  value: unknown,
  meta: ArgumentMetadata,
  globalPipes: PipesType[] = [],
) {
  const pipes = getPipes(handler, controllerCls, globalPipes, meta);
  let transformed = value;

  for (const PipeCtor of pipes) {
    const pipeInstance = isClass(PipeCtor) ? container.resolve<PipeTransform>(PipeCtor) : PipeCtor;
    transformed = await Promise.resolve(
      pipeInstance.transform(transformed, meta)
    );
  }

  return transformed;
}