import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WellsService } from './wells.service';
import { CreateWellDto } from './dto/create-well.dto';
import { UpdateWellDto } from './dto/update-well.dto';

@Controller('wells')
export class WellsController {
  constructor(private readonly wellsService: WellsService) {}

  @Post()
  create(@Body() createWellDto: CreateWellDto) {
    return this.wellsService.create(createWellDto);
  }

  @Get()
  findAll() {
    return this.wellsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wellsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWellDto: UpdateWellDto) {
    return this.wellsService.update(+id, updateWellDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wellsService.remove(+id);
  }
}
