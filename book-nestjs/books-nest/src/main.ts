import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiKeyGuard } from './api/api.guard';
import { ApiService } from './api/api.service';


const port =process.argv[2] ?? process.env.PORT ?? 6000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // adding the guard
  app.useGlobalGuards(new ApiKeyGuard(new ApiService()))
  await app.listen(port,()=>{
    console.log(`server is running on port http://localhost:${port}`)
  });
}
bootstrap();
