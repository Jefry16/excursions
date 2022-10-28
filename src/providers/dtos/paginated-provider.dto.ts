import { Expose, Transform } from 'class-transformer';
import { Provider } from '../provider.entity';
import { ProviderDto } from './provider.dto';

export class PaginatedProviderDto {

  @Expose()
  @Transform(({ obj }) => {
    const { data } = obj
    return data.map((provider: Provider) => ({ ...provider, user: provider?.user?.id || null }))
  })
  data: ProviderDto[]

  @Expose()
  meta: any
}
