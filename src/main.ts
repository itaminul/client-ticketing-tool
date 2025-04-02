import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ExceptionFilters } from "./filters/exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ExceptionFilters());
  
  await app.listen(3000);
}
bootstrap();
