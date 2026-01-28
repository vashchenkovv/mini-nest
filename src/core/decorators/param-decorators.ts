import { META_MINI_PARAMS, META_MINI_ARRG_PIPE } from "../constansts";
import { ArgumentMetadata } from "../interfaces";

export const Param = (sourceName: string, ...pipes: any[]) => {
    return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
        const params: ArgumentMetadata[] = Reflect.getOwnMetadata(META_MINI_PARAMS, target.constructor, propertyKey) || [];
        const metatypes = Reflect.getMetadata('design:paramtypes', target.constructor, propertyKey) ?? [];
        params.push({
            index: parameterIndex,
            type: 'param',
            metatype: metatypes[parameterIndex] ?? null,
            data: sourceName,
            name: propertyKey,
        });
        Reflect.defineMetadata(META_MINI_PARAMS, params, target.constructor, propertyKey);

        if (pipes?.length) {
            const paramPipes: Record<number, any[]> = Reflect.getOwnMetadata(META_MINI_ARRG_PIPE, target.constructor, propertyKey) || {};
            if (!paramPipes[parameterIndex]) paramPipes[parameterIndex] = [];
            paramPipes[parameterIndex].push(...pipes);
            Reflect.defineMetadata(META_MINI_ARRG_PIPE, paramPipes, target.constructor, propertyKey);
        }
    }
}

export const Query = (sourceName: string, ...pipes: any[]) => {
    return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
        const params: ArgumentMetadata[] = Reflect.getOwnMetadata(META_MINI_PARAMS, target.constructor, propertyKey) || [];
        const metatypes = Reflect.getMetadata('design:paramtypes', target.constructor, propertyKey) ?? [];
        params.push({
            index: parameterIndex,
            type: 'query',
            metatype: metatypes[parameterIndex] ?? null,
            data: sourceName,
            name: propertyKey,
        });
        Reflect.defineMetadata(META_MINI_PARAMS, params, target.constructor, propertyKey);

        if (pipes?.length) {
            const paramPipes: Record<number, any[]> = Reflect.getOwnMetadata(META_MINI_ARRG_PIPE, target.constructor, propertyKey) || {};
            if (!paramPipes[parameterIndex]) paramPipes[parameterIndex] = [];
            paramPipes[parameterIndex].push(...pipes);
            Reflect.defineMetadata(META_MINI_ARRG_PIPE, paramPipes, target.constructor, propertyKey);
        }
    }
}

export const Body = (...pipes: any[]) => {
    return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
        const params: ArgumentMetadata[] = Reflect.getOwnMetadata(META_MINI_PARAMS, target.constructor, propertyKey) || [];
        const metatypes = Reflect.getMetadata('design:paramtypes', target.constructor, propertyKey) ?? [];
        params.push({
            index: parameterIndex,
            type: 'body',
            metatype: metatypes[parameterIndex] ?? null,
            name: propertyKey,
        });
        Reflect.defineMetadata(META_MINI_PARAMS, params, target.constructor, propertyKey);

        if (pipes?.length) {
            const paramPipes: Record<number, any[]> = Reflect.getOwnMetadata(META_MINI_ARRG_PIPE, target.constructor, propertyKey) || {};
            if (!paramPipes[parameterIndex]) paramPipes[parameterIndex] = [];
            paramPipes[parameterIndex].push(...pipes);
            Reflect.defineMetadata(META_MINI_ARRG_PIPE, paramPipes, target.constructor, propertyKey);
        }
    }
}