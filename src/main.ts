import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ExceptionFilters } from "./filters/exception.filter";
import { ValidationPipe } from "@nestjs/common";
import { ResponseInterceptor } from "./interceptors/response.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ExceptionFilters());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor())
  await app.listen(3000);
}
bootstrap();
