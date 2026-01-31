import { IMiniNestApp, NestFactory } from "./core";
import { AppModule } from "./app/app.module";
import { AppExceptionFilter } from "./app/filters/app-exception.tilter";

async function bootstrap() {
    const app: IMiniNestApp = NestFactory.create([AppModule]);
    const port = 3000;
    app.useGlobalFilters([AppExceptionFilter])
    app.listen(port, () => console.log(`Mini-Nest listening on http://localhost:${port}`));
}

bootstrap();