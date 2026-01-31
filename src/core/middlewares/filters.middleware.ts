import { Type } from "../types";
import { ErrorRequestHandler } from "express";
import { NextFunction, Request, Response } from "express";
import { getFilters } from "../utils/filters";
import { ExceptionFilter } from "../interfaces";
import { ExecutionContext } from "../utils";
import { container } from "../container";

export const FiltersMiddleware = (ctrl: Type, handler: Function, globalFilters: (ExceptionFilter | Function)[] = []): ErrorRequestHandler  => {
    return async (err: any, req: Request, res: Response, next: NextFunction) => {
        const filters = getFilters(handler, ctrl, globalFilters);

        if (filters[0]) {
            const ctx = new ExecutionContext(ctrl, handler, req, res);
            const filter = typeof filters[0] === 'object' ?  filters[0] : container.resolve(filters[0]);
            filter.catch(err, ctx);
            return;
        }

        res.status((err as Error & { status: number }).status || 500).json({ error: err.message || 'Server error' });
    }
}