import { META_MINI_PIPES } from "../constansts";

export const usePipes = (...pipes: any[]) => {
    return (target: any, key?: string | symbol, descriptor?: any) => {
        const resource = descriptor ? descriptor.value : key ? target[key] : target;
        Reflect.defineMetadata(META_MINI_PIPES, pipes, resource);
    }
}