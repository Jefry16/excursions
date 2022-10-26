import { Transform } from "class-transformer"
import { IsNumber, IsNumberString, IsOptional, IsPositive, ValidatorConstraint } from "class-validator"

export default class PaginationDto {

    @Transform(({ value }) => parseInt(value))
    @IsOptional()
    @IsNumber()
    @IsPositive()
    page = 1

    @Transform(({ value }) => parseInt(value))
    @IsOptional()
    @IsNumber()
    @IsPositive()
    limit = 10

    @IsOptional()
    order: 'DESC' | 'ASC' = 'ASC'
}