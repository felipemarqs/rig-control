import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './shared/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';
import { RigsModule } from './modules/rigs/rigs.module';
import { EfficienciesModule } from './modules/efficiencies/efficiencies.module';
import { BillingsModule } from './modules/billings/billings.module';
import { BillingsConfigurationModule } from './modules/billings-configuration/billings-configuration.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    UsersModule,
    RigsModule,
    EfficienciesModule,
    BillingsModule,
    BillingsConfigurationModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
