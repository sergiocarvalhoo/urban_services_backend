import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceRequestDto } from '../dto/create-service-request.dto';
import { UpdateServiceStatusDto } from '../dto/update-service-status.dto';
import { ServiceType } from '../enums/service-type.enum';

@Injectable()
export class ServiceRequestsService {
  constructor(private prisma: PrismaService) {}

  async create(createServiceRequestDto: CreateServiceRequestDto) {
    return this.prisma.serviceRequest.create({
      data: createServiceRequestDto,
    });
  }

  async findAll(type?: ServiceType) {
    return this.prisma.serviceRequest.findMany({
      where: type ? { type } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const request = await this.prisma.serviceRequest.findUnique({
      where: { id },
    });

    if (!request) {
      throw new NotFoundException(`Solicitação #${id} não encontrada`);
    }

    return request;
  }

  async updateStatus(id: number, updateStatusDto: UpdateServiceStatusDto) {
    try {
      return await this.prisma.serviceRequest.update({
        where: { id },
        data: { status: updateStatusDto.status },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new NotFoundException(`Solicitação #${id} não encontrada`);
    }
  }
}
