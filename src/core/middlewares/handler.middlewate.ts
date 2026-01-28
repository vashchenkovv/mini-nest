import { Request, Response, NextFunction } from "express";
import { Type } from "../types";
import { META_MINI_PARAMS } from "../constansts";
import { ArgumentMetadata } from "../interfaces";
import { extractParams, runPipes } from "../utils";

export const HandlerMiddleware = (instance: Object, handler: Function, globalPipes: Type[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        let paramMeta: ArgumentMetadata[] = Reflect.getMetadata(META_MINI_PARAMS, instance.constructor, handler.name) ?? [];
        paramMeta = [...paramMeta].sort((a, b) => a.index - b.index);
        const args: any[] = [];

        for (const metadata of paramMeta) {
            const extracted = extractParams(req, metadata.type);
            const argument = metadata.data ? extracted[metadata.data] : extracted;

            try {
                args[metadata.index] = await runPipes(instance.constructor, handler, argument, metadata, globalPipes);
            } catch (error: any) {
                next(new Error(`Pipe error for: ${error.message}`));
                return;
            }
        }

        try {
            const result = await handler.apply(instance, args);
            return res.json(result);
        } catch (error: any) {
            next(error);
        }
    }
}