import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import config from './config/keys';
import { UserModule } from './user/user.module';
import { TaskService } from './task/task.service';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    TodoModule,
    MongooseModule.forRoot(config.mongoURI),
    AuthModule,
    UserModule,
    TaskModule,
    // GraphQLModule.forRoot({
    //   autoSchemaFile: true,
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
