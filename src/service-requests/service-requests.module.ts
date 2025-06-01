import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ServiceRequestsController } from './service-requests.controller';
import { ServiceRequestsService } from './service-requests.service';

@Module({
  providers: [ServiceRequestsService, PrismaService],
  controllers: [ServiceRequestsController],
})
export class ServiceRequestsModule {}
