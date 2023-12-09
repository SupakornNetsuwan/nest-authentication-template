import { ArgumentMetadata, BadRequestException, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { z, type ZodType } from "zod"

@Injectable()
export class ZodValidationPipe implements PipeTransform {

  constructor(private schema: ZodType) { }

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      this.schema.parse(value);
      return value;
    } catch (error) {
      if (error instanceof z.ZodError) {
        // throw new HttpException("Your payload is not valid", HttpStatus.BAD_REQUEST)
        throw new BadRequestException(error.errors.map(error => error.message), "Body does not complete correctly")
      }

      throw new BadRequestException(error)
    }
  }
}
