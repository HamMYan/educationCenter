import { ApiProperty } from "@nestjs/swagger";

export class SearchStudentDto{
    @ApiProperty()
    name: string
    @ApiProperty()
    surname: string
}