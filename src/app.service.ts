import { SearchStudentDto } from './students/dto/search-dto';
import { Student } from 'src/students/entities/student.entity';
import { FilterByLessons } from './filter-dto/filter';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lesson } from './lessons/entities/lesson.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Student') private studentModel: Model<Student>,
    @InjectModel('Lesson') private lessonModel: Model<Lesson>,
  ) {}

  async filter(filterByLessons: FilterByLessons) {
    const { lessons } = filterByLessons;
    if (lessons.length) {
      let arr = [];
      for (let less of lessons) {
        const lesson = await this.lessonModel.findById(less);
        if (!lesson) {
          throw new NotFoundException('lesson not found');
        } else {
          arr.push(lesson._id);
        }
      }
      const students = await this.studentModel.find({ lessons: { $in: arr } });
      return students;
    } else {
      throw new BadRequestException('Student required');
    }
  }
  async searchByNameOrSurname(searchDto: SearchStudentDto) {
    const { name, surname } = searchDto;
    const students = await this.studentModel.find({
      $or: [
        { name: { $regex: name, $options: 'i' } },
        { surname: { $regex: surname, $options: 'i' } },
      ],
    });
    if (students.length > 0) {
      return students;
    } else {
      throw new NotFoundException('Student not found');
    }
  }
}
