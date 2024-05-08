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
import { ContractsModule } from './modules/contracts/contracts.module';
import { UsersRigModule } from './modules/users-rig/users-rig.module';
import { DeletionRequestsModule } from './modules/deletion-requests/deletion-requests.module';
import { WellsModule } from './modules/wells/wells.module';
import { PeriodsModule } from './modules/periods/periods.module';
import { TemporaryEfficienciesModule } from './modules/temporary-efficiencies/temporary-efficiencies.module';
import { UserLogModule } from './modules/user-log/user-log.module';
import { SystemVersionModule } from './modules/system-version/system-version.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    UsersModule,
    RigsModule,
    EfficienciesModule,
    TemporaryEfficienciesModule,
    BillingsModule,
    BillingsConfigurationModule,
    ContractsModule,
    UsersRigModule,
    DeletionRequestsModule,
    WellsModule,
    PeriodsModule,
    UserLogModule,
    SystemVersionModule,
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
