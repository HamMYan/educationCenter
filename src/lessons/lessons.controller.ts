import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { json } from 'stream/consumers';

@ApiTags('Lessons')
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  async create(@Body() createLessonDto: CreateLessonDto, @Res() res: Response) {
    try {
      const data = await this.lessonsService.create(createLessonDto);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (err) {
      return res
        .status(HttpStatus.NOT_ACCEPTABLE)
        .json({ message: err.message });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const data = await this.lessonsService.findAll();
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: err.message });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.lessonsService.findOne(id);
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: err.message });
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.lessonsService.update(id, updateLessonDto);
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res
        .status(HttpStatus.NOT_ACCEPTABLE)
        .json({ message: err.message });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.lessonsService.remove(id);
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: err.message });
    }
  }
}
