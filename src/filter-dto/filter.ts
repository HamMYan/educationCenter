import { ApiProperty } from "@nestjs/swagger";

export class FilterByLessons{
    @ApiProperty()
    lessons: string[]
}