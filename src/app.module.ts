import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { CaslModule } from './auth/casl/casl.module';
import { LocationsModule } from './locations/locations.module';
import { ReadingModule } from './reading/reading.module';
import { MeterModule } from './meter/meter.module';
import { BillingModule } from './billing/billing.module';
import { SubscriberModule } from './subscriber/subscriber.module';
import { BillingConceptModule } from './billing-concept/billing-concept.module';
import { InvoiceModule } from './invoice/invoice.module';
import { ServiceOrderModule } from './service-order/service-order.module';
import { PaymentModule } from './payment/payment.module';
import { NotificationModule } from './notification/notification.module';
import { PropertyModule } from './property/property.module';
import { TenantModule } from './tenant/tenant.module';
import { ReadingSessionModule } from './reading-session/reading-session.module';

import { join } from 'path';
import { ReportModule } from './report/report.module';
import { CyclesRoutesModule } from './cycles-routes/cycles-routes.module';
import * as crypto from 'crypto';
(global as any).crypto = crypto;

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // 👈 carpeta que quieres exponer
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: true,
        charset: 'utf8mb4',
      }),
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    CaslModule,
    LocationsModule,
    ReadingModule,
    MeterModule,
    BillingModule,
    SubscriberModule,
    BillingConceptModule,
    InvoiceModule,
    ServiceOrderModule,
    PaymentModule,
    NotificationModule,
    PropertyModule,
    TenantModule,
    ReadingSessionModule,
    ReportModule,
    CyclesRoutesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
