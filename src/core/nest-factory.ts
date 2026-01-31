import express, { Router, Express } from 'express';
import { Type } from './types';
import { ExceptionFilter, IMiniNestApp, IRouteData } from './interfaces';
import { container } from './container';
import { GuardsMiddleware } from './middlewares/guards.middlewate';
import { META_MINI_MODULE, META_MINI_PREFIX, META_MINI_ROUTES } from './constansts';
import { HandlerMiddleware } from './middlewares/handler.middlewate';
import { FiltersMiddleware } from './middlewares';

export class NestFactory {
    static create(modules: Type[]): IMiniNestApp {
        const app: Express = express();
        app.use(express.json());

        const router: Router = express.Router();
        app.use(router);

        const globalGuards: Type[] = [];
        const globalPipes: Type[] = [];
        const globalFilters: (ExceptionFilter | Function)[] = [];

        const registerModule = (module: Type) => {
            const meta = Reflect.getMetadata(META_MINI_MODULE, module);
            if (!meta) return;

            (meta.imports ?? []).forEach((subModule: Type) => {
                registerModule(subModule);
            });

            (meta.controllers ?? []).forEach((ctrl: Type) => {
                container.register(ctrl, ctrl);
                const prefix: string = Reflect.getMetadata(META_MINI_PREFIX, ctrl) ?? '';
                const routes: IRouteData[] = Reflect.getMetadata(META_MINI_ROUTES, ctrl) ?? [];

                const instance = container.resolve(ctrl) as InstanceType<typeof ctrl>;

                (routes ?? []).forEach(route => {
                    const handler = instance[route.handlerName] as (...args: any[]) => Promise<any>;
                    const handlerPath = route.path?.trim() ?? '';
                    const path = `/${prefix}/${handlerPath}`;
                    router[route.method](
                        path, 
                        GuardsMiddleware(ctrl, handler, globalGuards),
                        HandlerMiddleware(instance, handler, globalPipes),
                        FiltersMiddleware(ctrl, handler, globalFilters),
                    );
                });
            });
        }

        const listen = (port: number, callback?: () => void) => {
            (modules ?? []).forEach(module => {
                registerModule(module);
            });

            app.listen(port, callback);
        }

        return {
            listen,
            useGlobalGuards: (guards: Type | Type[]) => {
                Array.isArray(guards) ? globalGuards.push(...guards) : globalGuards.push(guards);
            },
            useGlobalPipes: (pipes: Type | Type[]) => {
                Array.isArray(pipes) ? globalPipes.push(...pipes) : globalPipes.push(pipes);
            },
            useGlobalFilters: (filters: (ExceptionFilter | Function)[]) => {
                Array.isArray(filters) ? globalFilters.push(...filters) : globalFilters.push(filters);
            },
        }
    }
}