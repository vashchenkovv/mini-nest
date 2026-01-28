import { IMiniNestApp, NestFactory } from "./core";
import { AppModule } from "./app/app.module";

const app: IMiniNestApp = NestFactory.create([AppModule]);

const port = 3000;

app.listen(port,  () => console.log(`Mini-Nest listening on http://localhost:${port}`));
