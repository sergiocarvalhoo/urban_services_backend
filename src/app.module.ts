import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ServiceRequestsModule } from './service-requests/service-requests.module';

@Module({
  imports: [ServiceRequestsModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
