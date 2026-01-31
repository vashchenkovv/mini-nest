import { ExceptionFilter, IExecutionContext, Injectable } from "../../core";

@Injectable()
export class AppExceptionFilter implements ExceptionFilter {
    catch(exception: Error, ctx: IExecutionContext) {
        const res = ctx.switchToHttp().getResponse();
        res.status((exception as Error & { status: number }).status || 500).json({ error: exception.message || 'Server error' });
    }
}