import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Lesson } from 'src/lessons/entities/lesson.entity';

export type StudentDocument = HydratedDocument<Student>;

@Schema()
export class Student {
  _id: string;
  @Prop()
  name: string;
  @Prop()
  surname: string;
  @Prop()
  phone: string;
  @Prop()
  email: string;
  @Prop()
  registerDate: Date;
  @Prop({type:[ {type: mongoose.Schema.Types.ObjectId, ref: 'Lesson'}] })
  lessons: Lesson[];
}
export const StudentSchema = SchemaFactory.createForClass(Student);
