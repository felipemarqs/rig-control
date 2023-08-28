import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaService } from './shared/database/prisma.service';
import { DatabaseModule } from './shared/database/database.module';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
