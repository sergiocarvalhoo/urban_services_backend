import { IsEnum } from 'class-validator';
import { RequestStatus } from '../enums/request-status.enum';

export class UpdateServiceStatusDto {
  @IsEnum(RequestStatus)
  status!: RequestStatus;
}
