import { CanActivate, IExecutionContext, Injectable } from "../../core";

export const Role = (...args: string[]) => {
    return (target: any, key?: any, descriptor?: any) => {
        if (descriptor) {
            Reflect.defineMetadata('mini:roles', args, descriptor.value);
        } else {
            Reflect.defineMetadata('mini:roles', args, target);
        }
    }
}

@Injectable()
export class RolesGuard implements CanActivate {
    constructor() {}
    canActivate(ctx: IExecutionContext): boolean | Promise<boolean> | undefined {
        const classRoles = Reflect.getMetadata('mini:roles', ctx.getClass()) ?? [];
        const methodRoles = Reflect.getMetadata('mini:roles', ctx.getHandler()) ?? [];
        const roles = [...methodRoles, ...classRoles];
        if (!roles.length) return true
        const headers = ctx.switchToHttp().getRequest().headers;
        const role = headers['x-user-role'] as string;
        return !!role && roles.includes(role);
    }
}