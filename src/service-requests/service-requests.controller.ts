import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateServiceRequestDto } from '../dto/create-service-request.dto';
import { UpdateServiceStatusDto } from '../dto/update-service-status.dto';
import { ServiceType } from '../enums/service-type.enum';
import { ServiceRequestsService } from './service-requests.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('service-requests')
@Controller('service-requests')
export class ServiceRequestsController {
  constructor(private readonly service: ServiceRequestsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova solicitação de serviço' })
  @ApiResponse({ status: 201, description: 'Solicitação criada com sucesso' })
  create(@Body() createServiceRequestDto: CreateServiceRequestDto) {
    return this.service.create(createServiceRequestDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as solicitações' })
  @ApiQuery({ name: 'type', enum: ServiceType, required: false })
  findAll(@Query('type') type?: ServiceType) {
    return this.service.findAll(type);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar solicitação por ID' })
  @ApiParam({ name: 'id', example: 1 })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Atualizar status da solicitação' })
  @ApiParam({ name: 'id', example: 1 })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatusDto: UpdateServiceStatusDto,
  ) {
    return this.service.updateStatus(id, updateStatusDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir uma solicitação' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Solicitação excluída com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Solicitação não encontrada',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
