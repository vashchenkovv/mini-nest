import { Type } from "../types";
import { ErrorRequestHandler } from "express";
import { NextFunction, Request, Response } from "express";

export const FiltersMiddleware = (ctrl: Type, handler: Function, filters: Type[]): ErrorRequestHandler  => {
    return async (err: any, req: Request, res: Response, next: NextFunction) => {
        res.status((err as Error & { status: number }).status || 500).json({ error: err.message || 'Server error' });
    }
}