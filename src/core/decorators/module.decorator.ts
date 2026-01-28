import { META_MINI_MODULE } from "../constansts";

export function Module(metadata: { controllers?: any[], prividers?: any[], imports?: any[] }) {
    return function (target: any) {
        Reflect.defineMetadata(META_MINI_MODULE, metadata, target);
    }
}