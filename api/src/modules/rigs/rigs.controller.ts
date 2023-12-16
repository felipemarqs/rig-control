import { Controller, Post, Body, Get, Patch, Param } from '@nestjs/common';
import { RigsService } from './rigs.service';
import { CreateRigDto } from './dto/create-rig.dto';
import { UpdateRigDto } from './dto/update-rig-dto';

@Controller('rigs')
export class RigsController {
  constructor(private readonly rigsService: RigsService) {}

  @Post()
  create(@Body() createRigDto: CreateRigDto) {
    return this.rigsService.create(createRigDto);
  }

  @Get()
  findAll() {
    return this.rigsService.findAll();
  }

  @Patch(':rigId')
  update(@Param('rigId') rigId: string, @Body() updateRigDto: UpdateRigDto) {
    return this.rigsService.update(rigId, updateRigDto);
  }
}
