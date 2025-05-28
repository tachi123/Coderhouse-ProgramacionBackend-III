import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import FirstMiddleware from './middlewares/firstMiddleware';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://coderuser:Hsiu8LrVRlpeSzAI@cluster0.b6out72.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(FirstMiddleware).forRoutes({path: '*', method: RequestMethod.ALL})
  }
}
