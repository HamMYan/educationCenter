import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateStudentDto } from './create-student.dto';

export class UpdateStudentDto{
    @ApiProperty()
    name: string;
    @ApiProperty()
    surname: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    email: string;
}
