import { Expose, Transform } from 'class-transformer';
import { Tour } from '../tour.entity';
import { TourDto } from './tour.dto';

export class PaginatedTourDto {

    @Expose()
    @Transform(({ obj }) => {
        const { data } = obj
        return data.map((tour: Tour) => ({ ...tour, user: tour.user.id, provider: tour?.provider?.id || null }))
    })
    data: TourDto[]

    @Expose()
    meta: any
}
