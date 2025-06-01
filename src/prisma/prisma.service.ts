import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await this.$connect();
  }

  enableShutdownHooks(app: INestApplication): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    this.$on('beforeExit' as Parameters<typeof this.$on>[0], () => {
      void (async () => {
        await app.close();
      })();
    });
  }
}
