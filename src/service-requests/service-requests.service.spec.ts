/* eslint-disable @typescript-eslint/unbound-method */
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { Test, TestingModule } from '@nestjs/testing';
import { RequestStatus } from '../enums/request-status.enum';
import { ServiceType } from '../enums/service-type.enum';
import { PrismaService } from '../prisma/prisma.service';
import { ServiceRequestsService } from './service-requests.service';

describe('Solicitação de Serviço', () => {
  let service: ServiceRequestsService;
  let prisma: PrismaService;

  const mockSolicitacao = {
    id: 1,
    type: ServiceType.LAMP_REPLACEMENT,
    address: 'Rua Teste, 123',
    description: 'Lâmpada queimada',
    requesterName: 'João Silva',
    document: '123.456.789-00',
    status: RequestStatus.PENDING,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceRequestsService,
        {
          provide: PrismaService,
          useValue: {
            serviceRequest: {
              create: jest.fn().mockResolvedValue(mockSolicitacao),
              findMany: jest.fn().mockResolvedValue([mockSolicitacao]),
              update: jest.fn().mockResolvedValue(mockSolicitacao),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ServiceRequestsService>(ServiceRequestsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('criar', () => {
    it('deve criar uma nova solicitação de serviço com sucesso', async () => {
      const novaSolicitacao = {
        type: ServiceType.LAMP_REPLACEMENT,
        address: 'Rua Teste, 123',
        description: 'Lâmpada queimada',
        requesterName: 'João Silva',
        document: '123.456.789-00',
      };

      const resultado = await service.create(novaSolicitacao);

      expect(resultado).toEqual(mockSolicitacao);
      expect(prisma.serviceRequest.create).toHaveBeenCalledWith({
        data: novaSolicitacao,
      });
    });
  });

  describe('atualizar status', () => {
    it('deve atualizar o status de uma solicitação com sucesso', async () => {
      const prismaUpdateMock = jest.fn().mockResolvedValue({
        ...mockSolicitacao,
        status: RequestStatus.IN_PROGRESS,
      });

      jest
        .spyOn(prisma.serviceRequest, 'update')
        .mockImplementation(prismaUpdateMock);

      const updateStatusDto = {
        status: RequestStatus.IN_PROGRESS,
      };

      const resultado = await service.updateStatus(1, updateStatusDto);

      expect(resultado.status).toBe(RequestStatus.IN_PROGRESS);

      expect(prisma.serviceRequest.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { status: RequestStatus.IN_PROGRESS },
      });
    });

    it('deve lançar NotFoundException quando a solicitação não existe', async () => {
      jest
        .spyOn(prisma.serviceRequest, 'update')
        .mockRejectedValue(new Error('Registro não encontrado'));

      const updateStatusDto = {
        status: RequestStatus.IN_PROGRESS,
      };

      await expect(service.updateStatus(999, updateStatusDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
