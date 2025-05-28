import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import FirstMiddleware from './middlewares/firstMiddleware';
import { EnvConfigService } from './env.config.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync(
      {
        imports: [ConfigModule],
        inject: [EnvConfigService],
        useFactory: async(config:EnvConfigService) => ({
          uri: config.mongoUrl
        })
      }
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
