import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import {UsersModule} from "./users/users.module";
import {TasksModule} from "./tasks/tasks.module";
import {User} from "./users/users.model";
import {Task} from "./tasks/tasks.model";

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345678',
      database: 'baseTinkoff',
      models: [User, Task],
      autoLoadModels: true,
    }),
      UsersModule,
      TasksModule
  ],
})
export class AppModule {}
