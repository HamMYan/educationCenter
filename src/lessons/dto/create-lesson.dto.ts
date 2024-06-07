import { ApiProperty } from "@nestjs/swagger"

export class CreateLessonDto {
    @ApiProperty()
    name: string
    @ApiProperty()
    duration: number
    @ApiProperty()
    price: number
    @ApiProperty()
    lecturerName: number
}
