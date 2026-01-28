import { IExecutionContext } from "../interfaces";
import type { Request, Response } from 'express';
import { Type } from "../types";

export class ExecutionContext implements IExecutionContext {
    constructor(
        private readonly targetClass: Type,
        private readonly targetHandler: Function,
        private readonly req: Request,
        private readonly res: Response,
    ) { }

    getClass(): Function {
        return this.targetClass;
    }

    getHandler(): Function {
        return this.targetHandler;
    }

    switchToHttp() {
        return {
            getRequest: () => this.req,
            getResponse: () => this.res,
        };
    }
}