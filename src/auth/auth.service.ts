/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from '../dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateAdmin(email: string, password: string) {
    try {
      console.log('Procurando admin com email:', email);

      const admin = await this.prisma.admin.findUnique({
        where: { email },
      });

      console.log('Admin encontrado:', admin ? 'Sim' : 'Não');

      if (!admin) {
        throw new UnauthorizedException('Credenciais inválidas');
      }

      console.log('Validando senha...');
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      console.log('Senha válida:', isPasswordValid ? 'Sim' : 'Não');

      if (!isPasswordValid) {
        throw new UnauthorizedException('Credenciais inválidas');
      }

      const { password: _, ...result } = admin;
      return result;
    } catch (error) {
      console.error('Erro na autenticação:', error);
      throw new UnauthorizedException('Erro na autenticação');
    }
  }

  async login(loginDto: LoginDto) {
    const admin = await this.validateAdmin(loginDto.email, loginDto.password);

    const payload = {
      sub: admin.id,
      email: admin.email,
      role: 'admin',
    };

    return {
      user: {
        id: admin.id,
        email: admin.email,
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  // Método auxiliar para criar admin (use apenas em desenvolvimento)
  async createAdmin(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }
}
