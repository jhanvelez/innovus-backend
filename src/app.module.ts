import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { CaslModule } from './auth/casl/casl.module';
import { LocationsModule } from './locations/locations.module';
import { PredioModule } from './predio/predio.module';
import { SuscriptorModule } from './suscriptor/suscriptor.module';
import { ReadingModule } from './reading/reading.module';
import { MeterModule } from './meter/meter.module';
import { BillingModule } from './billing/billing.module';
import { SubscriberModule } from './subscriber/subscriber.module';
import { BillingConceptModule } from './billing-concept/billing-concept.module';
import { InvoiceModule } from './invoice/invoice.module';
import { ServiceOrderModule } from './service-order/service-order.module';
import { PaymentModule } from './payment/payment.module';
import { NotificationModule } from './notification/notification.module';

import * as crypto from 'crypto';
(global as any).crypto = crypto;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    CaslModule,
    LocationsModule,
    PredioModule,
    SuscriptorModule,
    ReadingModule,
    MeterModule,
    BillingModule,
    SubscriberModule,
    BillingConceptModule,
    InvoiceModule,
    ServiceOrderModule,
    PaymentModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
