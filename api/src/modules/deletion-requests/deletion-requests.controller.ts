import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { DeletionRequestsService } from './deletion-requests.service';
import { CreateDeletionRequestDto } from './dto/create-deletion-request.dto';
import { UpdateDeletionRequestDto } from './dto/update-deletion-request.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { RequestStatus } from './entities/deletion-request.entity';

@Controller('deletion-request')
export class DeletionRequestsController {
  constructor(
    private readonly deletionRequestsService: DeletionRequestsService,
  ) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createDeletionRequestDto: CreateDeletionRequestDto,
  ) {
    return this.deletionRequestsService.create(
      createDeletionRequestDto,
      userId,
    );
  }

  @Get()
  findAll(@Query('status') status?: RequestStatus) {
    return this.deletionRequestsService.findAll({ status });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deletionRequestsService.findOne(+id);
  }

  @Put(':deletionRequestId')
  update(
    @Param('deletionRequestId') deletionRequestId: string,
    @Body() updateDeletionRequestDto: UpdateDeletionRequestDto,
  ) {
    return this.deletionRequestsService.update(
      deletionRequestId,
      updateDeletionRequestDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deletionRequestsService.remove(+id);
  }
}
