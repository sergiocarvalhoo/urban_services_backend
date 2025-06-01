import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ServiceRequestsService } from './service-requests.service';
import { CreateServiceRequestDto } from '../dto/create-service-request.dto';
import { UpdateServiceStatusDto } from '../dto/update-service-status.dto';
import { ServiceType } from '../enums/service-type.enum';

@Controller('service-requests')
export class ServiceRequestsController {
  constructor(private readonly service: ServiceRequestsService) {}

  @Post()
  create(@Body() createServiceRequestDto: CreateServiceRequestDto) {
    return this.service.create(createServiceRequestDto);
  }

  @Get()
  findAll(@Query('type') type?: ServiceType) {
    return this.service.findAll(type);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatusDto: UpdateServiceStatusDto,
  ) {
    return this.service.updateStatus(id, updateStatusDto);
  }
}
