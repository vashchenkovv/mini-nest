import { META_MINI_GUARDS } from "../constansts";
import { Type } from "../types";

export const UseGuards = (...guards: Type[]) => {
    return (target: any, key?: string,  descriptor?: any) => {
        const resource = descriptor ? descriptor.value : key ? target[key] : target;
        Reflect.defineMetadata(META_MINI_GUARDS, guards, resource);
    }
}