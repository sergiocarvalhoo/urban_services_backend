import { Module } from '@nestjs/common';
import { ServiceRequestsService } from './service-requests.service';
import { ServiceRequestsController } from './service-requests.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [ServiceRequestsService, PrismaService],
  controllers: [ServiceRequestsController],
})
export class ServiceRequestsModule {}
