import { LessonSchema } from './lessons/entities/lesson.entity';
import { StudentSchema } from './students/entities/student.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsModule } from './students/students.module';
import { LessonsModule } from './lessons/lessons.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/nest_exam'),
    LessonsModule,
    StudentsModule,
    MongooseModule.forFeature([
      { name: 'Student', schema: StudentSchema },
      { name: 'Lesson', schema: LessonSchema }
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
