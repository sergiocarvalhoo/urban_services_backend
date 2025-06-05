import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InitService } from './init.service';

@Module({
  providers: [InitService, PrismaService],
})
export class InitModule {}
