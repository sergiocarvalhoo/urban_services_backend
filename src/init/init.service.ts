import { Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InitService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    try {
      console.log('Verificando admin inicial...');

      const adminExists = await this.prisma.admin.findFirst();

      if (!adminExists) {
        console.log('Criando admin inicial...');
        const hashedPassword = await bcrypt.hash('123456', 10);

        await this.prisma.admin.create({
          data: {
            email: 'admin@example.com',
            password: hashedPassword,
          },
        });

        console.log('Admin inicial criado com sucesso');
      } else {
        console.log('Admin já existe, pulando criação');
      }
    } catch (error) {
      console.error('Erro ao criar admin inicial:', error);
    }
  }
}
