import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ChatModule } from './chat/chat.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
          type: 'postgres',
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          synchronize: false,
          entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
          migrations: [path.resolve(__dirname, '../database/migrations/*-migration.ts')],
          autoLoadEntities: true,
      }
    ),
    }),

    MailerModule.forRootAsync({
      useFactory: ()=>({
        transport: {
          host: process.env.MAIL_HOST,
          port: process.env.MAIAL_PORT,
          auth:{
            user: process.env.MAIL_USERNAME,
            pass:process.env.MAIL_PASSWORD,
          },
        },
        default: '"No Reply" <deswalworks@gmail.com>',
      })
      
    }),
    UserModule,
    CloudinaryModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule  {
  

}
