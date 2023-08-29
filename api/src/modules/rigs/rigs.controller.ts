import { Controller, Post, Body } from '@nestjs/common';
import { RigsService } from './rigs.service';
import { CreateRigDto } from './dto/create-rig.dto';

@Controller('rigs')
export class RigsController {
  constructor(private readonly rigsService: RigsService) {}

  @Post()
  create(@Body() createRigDto: CreateRigDto) {
    return this.rigsService.create(createRigDto);
  }
}
