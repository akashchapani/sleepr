import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '../config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_URL') + configService.get('MONGODB_DB'),
        authSource: 'admin',
        user: configService.get('MONGODB_USER'),
        pass: configService.get('MONGODB_PASS'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
