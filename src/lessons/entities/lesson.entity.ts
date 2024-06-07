import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Student } from 'src/students/entities/student.entity';

export type LessonDocument = HydratedDocument<Lesson>;

@Schema()
export class Lesson {
  _id: string;
  @Prop()
  name: string;
  @Prop()
  duration: number;
  @Prop()
  price: number;
  @Prop()
  lecturerName: number;
  @Prop({type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]})
  students: Student[];
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
