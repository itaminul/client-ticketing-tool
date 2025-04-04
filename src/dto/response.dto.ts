import { PaginationDto } from './pagination.dto';
import { MetadataDto } from './metadata.dto';

export class ResponseDto<T> {
  status: number;
  message: string;
  data: T;
  error: any;
  pagination: PaginationDto;
  metadata: MetadataDto;
}