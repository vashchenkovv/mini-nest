import { META_MINI_FILTERS } from "../constansts";
import { ExceptionFilter } from "../interfaces";

export const UserFilters = (...filters: ExceptionFilter[]) => {
    return (target: any, key?: string, descriptor?: any) => {
        const resource = descriptor ? descriptor.value : key ? target[key] : target;
        Reflect.defineMetadata(META_MINI_FILTERS, filters, resource);
    }
}