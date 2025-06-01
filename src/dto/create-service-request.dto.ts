import { IsEnum, IsNotEmpty, IsString, Validate } from 'class-validator';
import { ServiceType } from '../enums/service-type.enum';
import { DocumentValidator } from '../validators/document.validator';

export class CreateServiceRequestDto {
  @IsEnum(ServiceType)
  type!: ServiceType;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  requesterName!: string;

  @IsString()
  @Validate(DocumentValidator)
  document!: string;
}
