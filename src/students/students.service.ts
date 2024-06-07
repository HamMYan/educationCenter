import { SearchStudentDto } from './dto/search-dto';
import { Student } from 'src/students/entities/student.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel('Student') private studentModel: Model<Student>,
    @InjectModel('Lesson') private lessonModel: Model<Lesson>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const { name, surname, phone, email, lessons } = createStudentDto;
    if (!name || name == 'string') {
      throw new BadRequestException('name is requeired');
    }
    if (!surname || surname == 'string') {
      throw new BadRequestException('surname is requeired');
    }
    if (!phone || phone == 'string') {
      throw new BadRequestException('phone is requeired');
    }
    if (!email || email == 'string') {
      throw new BadRequestException('email is requeired');
    }
    const arr = [];
    if (lessons.length) {
      for (let less of lessons) {
        const lesson = await this.lessonModel.findById(less);
        if (!lesson) {
          throw new NotFoundException('lesson not found');
        } else {
          arr.push(lesson._id);
        }
      }
      const newStudent = await this.studentModel.create({
        registerDate: new Date(),
        name,
        surname,
        phone,
        email,
        lessons: arr,
      });

      for (let less of arr) {
        const lesson = await this.lessonModel.findById(less);
        await this.lessonModel.findByIdAndUpdate(less, {
          students: [...lesson.students, newStudent],
        });
      }

      return newStudent;
    } else if (!lessons.length) {
      throw new BadRequestException('lessons is requeired');
    }
  }

  async findAll() {
    const students = await this.studentModel.find();
    if (!students) throw new NotFoundException('Not a students');
    else return students;
  }

  async findOne(id: string) {
    const student = await this.studentModel.findById(id).populate('lessons');
    if (student) {
      return student;
    } else {
      throw new NotFoundException('Student not found');
    }
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const student = await this.studentModel.findById(id);
    if (student) {
      const { name, surname, email, phone } = updateStudentDto;
      return await this.studentModel.findByIdAndUpdate(id, {
        name,
        surname,
        email,
        phone,
      });
    } else {
      throw new NotFoundException('Student not found');
    }
  }

  async remove(id: string) {
    const student = await this.studentModel.findById(id);
    if (student) {
      await this.studentModel.findByIdAndDelete(id);
      return 'removed';
    } else {
      throw new NotFoundException('Student not found');
    }
  }


}
