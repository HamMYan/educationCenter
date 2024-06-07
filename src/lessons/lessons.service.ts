import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';

@Injectable()
export class LessonsService {
  constructor(@InjectModel('Lesson') private lessonModel: Model<Lesson>) {}

  async create(createLessonDto: CreateLessonDto) {
    const { name, duration, price, lecturerName } = createLessonDto;
    const lesson = await this.lessonModel.findOne({ name });
    if (lesson) {
      throw new BadRequestException(`${name} - has arleady`);
    } else {
      return await this.lessonModel.create({
        name,
        duration,
        price,
        lecturerName,
      });
    }
  }

  async findAll() {
    const lessons =  await this.lessonModel.find();
    if(!lessons)
      throw new NotFoundException('not a lessons')
    else  
      return lessons
  }

  async findOne(id: string) {
    const lesson = await this.lessonModel.findById(id).populate('students');
    if (lesson) {
      return lesson;
    } else {
      throw new NotFoundException('Lesson not found');
    }
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    const lesson = await this.lessonModel.findById(id);
    if (lesson) {
      const { name, duration, price, lecturerName } = updateLessonDto;
      const lesson = await this.lessonModel.findOne({ name });
      if (lesson) {
        throw new BadRequestException(`${name} - has arleady`);
      } else {
        const updatedWork = await this.lessonModel.findByIdAndUpdate(
          id,
          { name, duration, price, lecturerName },
          {
            new: true,
          },
        );
      }
    } else {
      throw new NotFoundException('Lesson not found');
    }
  }

  async remove(id: string) {
    const lesson = await this.lessonModel.findById(id);
    if (lesson) {
      await this.lessonModel.findByIdAndDelete(id);
      return 'Lesson deleted';
    } else {
      throw new NotFoundException('Lesson not found');
    }
  }
}
