import { Type } from "./types";

class Container {
    private readonly registered = new WeakMap<any, any>();
    private readonly singletons = new WeakMap<any, any>();

    register<T extends Type>(token: T, ref: T) {
        if (this.registered.has(token)) {
            throw new Error(`Token ${token.name} is already registered`);
        }

        this.registered.set(token, ref);
    }

    resolve<T>(token: Type<T>): T {
        if (this.singletons.has(token)) return this.singletons.get(token);
        const constructor = this.registered.get(token);

        if (!constructor) {
            throw new Error(`Token ${token.name} is not registered`);
        }

        const deps: any[] = Reflect.getMetadata("design:paramtypes", token) || [];
        const instance = new constructor(...deps.map(dep => {
            return this.resolve(dep);
        }));
        
        this.singletons.set(token, instance);
        return instance;
    }
}

export const container = new Container();