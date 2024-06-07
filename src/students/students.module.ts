import { LessonSchema } from './../lessons/entities/lesson.entity';
import { StudentSchema } from './entities/student.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema },{ name: 'Lesson', schema: LessonSchema }]),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
