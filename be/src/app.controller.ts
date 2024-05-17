import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('data')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(@Body('data') data) {
    return this.appService.create(data);
  }

  @Get()
  getAll() {
    return this.appService.getAll();
  }

  @Put(':id')
  update(@Param('id') id, @Body('data') data) {
    return this.appService.update(id, { data });
  }

  @Delete(':id')
  delete(@Param('id') id) {
    return this.appService.delete(id);
  }
}
