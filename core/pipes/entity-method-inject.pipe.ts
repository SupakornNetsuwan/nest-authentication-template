import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { RegisterUserDto } from '../data-access/users';

@Injectable()
export class EntityMethodInjectPipe implements PipeTransform {
  transform(value: RegisterUserDto, metadata: ArgumentMetadata) {
    console.log(value.firstName, ": has tried to register")
    return value;
  }
}
