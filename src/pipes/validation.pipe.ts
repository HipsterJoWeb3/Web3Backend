import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
// @ts-ignore
import {plainToClass} from "class-transformer";
// @ts-ignore
import {validate, ValidationError} from "class-validator";
import {ValidationException} from "../exceptions/validation.exception";


@Injectable()
export class ValidationPipe implements PipeTransform <any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToClass(metadata.metatype, value);
        let errors: ValidationError[] = []
        if(obj) errors = await validate(obj);

        if(errors.length) {
            let messages = errors.map((err: ValidationError) => {
                return err.property + ' - ' + Object.values(err.constraints).join(', ')
            });
            throw new ValidationException(messages)
        }

        return value
    }
}