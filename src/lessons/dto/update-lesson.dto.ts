import { ApiProperty } from "@nestjs/swagger"

export class UpdateLessonDto {
    @ApiProperty()
    name: string
    @ApiProperty()
    duration: number
    @ApiProperty()
    price: number
    @ApiProperty()
    lecturerName: number
}
