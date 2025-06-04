/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/unbound-method */
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';

describe('Autenticação', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwtService: JwtService;

  const mockAdmin = {
    id: 1,
    email: 'admin@example.com',
    password: 'senha_hasheada',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            admin: {
              findUnique: jest.fn().mockResolvedValue(mockAdmin),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token_jwt_mockado'),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('jwt_secret_test'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('deve realizar login com sucesso', async () => {
      // Mock do bcrypt.compare para retornar true
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(true));

      const loginDto = {
        email: 'admin@example.com',
        password: '123456',
      };

      const resultado = await service.login(loginDto);

      expect(resultado).toEqual({
        user: {
          id: mockAdmin.id,
          email: mockAdmin.email,
        },
        access_token: 'token_jwt_mockado',
      });

      expect(prisma.admin.findUnique).toHaveBeenCalledWith({
        where: { email: loginDto.email },
      });
    });

    it('deve falhar quando email não existe', async () => {
      jest.spyOn(prisma.admin, 'findUnique').mockResolvedValue(null);

      const loginDto = {
        email: 'inexistente@example.com',
        password: '123456',
      };

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('deve falhar quando senha está incorreta', async () => {
      // Mock do bcrypt.compare para retornar false
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(false));

      const loginDto = {
        email: 'admin@example.com',
        password: 'senha_errada',
      };

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('deve gerar token JWT com as informações corretas', async () => {
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(true));

      const loginDto = {
        email: 'admin@example.com',
        password: '123456',
      };

      await service.login(loginDto);

      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockAdmin.id,
        email: mockAdmin.email,
        role: 'admin',
      });
    });
  });
});
