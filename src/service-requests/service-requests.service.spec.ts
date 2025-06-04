/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { ServiceRequestsService } from './service-requests.service';
import { PrismaService } from '../prisma/prisma.service';
import { ServiceType } from '../enums/service-type.enum';
import { RequestStatus } from '../enums/request-status.enum';

describe('Solicitação de Serviço', () => {
  let service: ServiceRequestsService;
  let prisma: PrismaService;

  // Mock de uma solicitação de serviço
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
});
