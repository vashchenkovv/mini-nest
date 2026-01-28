import { META_MINI_GUARDS } from "../constansts";
import { container } from "../container";
import { Type } from "../types";
import { ExecutionContext } from "./execution-context";
import type { Request, Response } from 'express';

const getGuards = (handler: Function, controllerClass:  Function, globalGuards: Type[] = []) => {
  const controllerGuards = Reflect.getMetadata(META_MINI_GUARDS, controllerClass) ?? [];
  const routeGuards =  Reflect.getMetadata(META_MINI_GUARDS, handler) ?? [];
  return [...routeGuards, ...controllerGuards, ...globalGuards];
}

export async function runGuards(
    controllerClass: Type,
    handler: Function,
    req: Request,
    res: Response,
    globalGuards: Type[]
): Promise<boolean | string> {
    const guards = getGuards(handler, controllerClass, globalGuards);

    for (const GuardCtor of guards) {
        const guardInstance = container.resolve<any>(GuardCtor);
        const ctx = new ExecutionContext(controllerClass, handler, req, res);
        const can = await Promise.resolve(guardInstance.canActivate(ctx));
        if (!can) return GuardCtor.name;
    }

    return true;
}