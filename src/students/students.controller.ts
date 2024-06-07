import { SearchStudentDto } from './dto/search-dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Student')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  async create(
    @Body() createStudentDto: CreateStudentDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.studentsService.create(createStudentDto);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (err) {
      return res.status(HttpStatus.FORBIDDEN).json({ message: err.message });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const data = await this.studentsService.findAll();
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: err.message });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.studentsService.findOne(id);
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: err.message });
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
    @Res() res: Response,
  ) {
    try {
      const data = this.studentsService.update(id, updateStudentDto);
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: err.message });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = this.studentsService.remove(id);
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: err.message });
    }
  }
  
}
