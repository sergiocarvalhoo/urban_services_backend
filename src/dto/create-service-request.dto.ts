import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, Validate } from 'class-validator';
import { DocumentValidator } from 'src/validators/document.validator';
import { ServiceType } from '../enums/service-type.enum';

export class CreateServiceRequestDto {
  @ApiProperty({
    enum: ServiceType,
    example: ServiceType.LAMP_REPLACEMENT,
    description: 'Tipo do serviço solicitado',
  })
  @IsEnum(ServiceType)
  type!: ServiceType;

  @ApiProperty({
    example: 'Rua das Flores, 123',
    description: 'Endereço completo do local',
  })
  @IsString()
  @IsNotEmpty()
  address!: string;

  @ApiProperty({
    example: 'Lâmpada queimada no poste em frente ao mercado',
    description: 'Descrição detalhada do problema',
  })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({
    example: 'João Silva',
    description: 'Nome completo do solicitante',
  })
  @IsString()
  @IsNotEmpty()
  requesterName!: string;

  @ApiProperty({
    example: '123.456.789-00',
    description: 'CPF ou CNPJ do solicitante',
  })
  @IsString()
  @Validate(DocumentValidator)
  document!: string;
}
