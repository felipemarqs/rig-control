import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RigsService } from './rigs.service';
import { CreateRigDto } from './dto/create-rig.dto';
import { UpdateRigDto } from './dto/update-rig.dto';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rigsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRigDto: UpdateRigDto) {
    return this.rigsService.update(+id, updateRigDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rigsService.remove(+id);
  }
}
