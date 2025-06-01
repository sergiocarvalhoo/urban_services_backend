import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { RequestStatus } from '../enums/request-status.enum';

export class UpdateServiceStatusDto {
  @ApiProperty({
    enum: RequestStatus,
    example: RequestStatus.IN_PROGRESS,
    description: 'Novo status da solicitação',
    examples: {
      pending: {
        value: RequestStatus.PENDING,
        summary: 'Pendente',
      },
      inProgress: {
        value: RequestStatus.IN_PROGRESS,
        summary: 'Em Andamento',
      },
      completed: {
        value: RequestStatus.COMPLETED,
        summary: 'Concluído',
      },
    },
  })
  @IsEnum(RequestStatus)
  status!: RequestStatus;
}
