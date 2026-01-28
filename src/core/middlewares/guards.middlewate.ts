import { NextFunction, Request, Response } from "express";
import { Type } from "../types";
import { runGuards } from "../utils";

export const GuardsMiddleware = (
    Ctrl: Type,
    handler: Function,
    globalGuards: Type[]
) => async (req: Request, res: Response, next: NextFunction) => {
    const guardResult = await runGuards(Ctrl, handler, req, res, globalGuards);
    if (typeof guardResult !== 'string') {
        return next();
    }
    res.status(403).json({ message: `Forbidden by ${guardResult}` });
}