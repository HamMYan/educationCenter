import { SearchStudentDto } from './students/dto/search-dto';
import { FilterByLessons } from './filter-dto/filter';
import { Body, Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Response } from 'express';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/filter')
  async filter(@Body() filterByLessons: FilterByLessons, @Res() res: Response) {
    try {
      const data = await this.appService.filter(filterByLessons);
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
    }
  }
  @Post('search')
  async search(@Body() searchDto: SearchStudentDto, @Res() res: Response) {
    try {
      const data = await this.appService.searchByNameOrSurname(searchDto);
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: err.message });
    }
  }
}
