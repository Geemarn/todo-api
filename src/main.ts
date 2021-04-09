import { NestFactory } from '@nestjs/core';
import { ValidationPipe, ResponseFilter } from '@tpboard/slibs/dist';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // Use Global Pipes
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ResponseFilter());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
