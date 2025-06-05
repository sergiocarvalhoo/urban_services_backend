import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { ServiceRequestsModule } from './service-requests/service-requests.module';
import { AuthModule } from './auth/auth.module';
import { InitModule } from './init/init.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServiceRequestsModule,
    AuthModule,
    InitModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
