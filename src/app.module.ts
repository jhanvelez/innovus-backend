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
import { ServiceOrderModule } from './service-order/service-order.module';
import { PaymentModule } from './payment/payment.module';
import { NotificationModule } from './notification/notification.module';
import { TenantModule } from './tenant/tenant.module';

import { join } from 'path';
import { ReportModule } from './report/report.module';
import { CyclesRoutesModule } from './cycles-routes/cycles-routes.module';
import { StratumModule } from './stratum/stratum.module';
import { ConceptsModule } from './concepts/concepts.module';
import { SubsidiesModule } from './subsidies/subsidies.module';
import { FinancingModule } from './financing/financing.module';
import { AgreementsModule } from './agreements/agreements.module';

import { BullModule } from '@nestjs/bull';
import { ConsumptionRangesModule } from './consumption-ranges/consumption-ranges.module';
import * as crypto from 'crypto';
(global as any).crypto = crypto;

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
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
    ServiceOrderModule,
    PaymentModule,
    NotificationModule,
    TenantModule,
    ReportModule,
    CyclesRoutesModule,
    StratumModule,
    ConceptsModule,
    SubsidiesModule,
    FinancingModule,
    AgreementsModule,
    ConsumptionRangesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
