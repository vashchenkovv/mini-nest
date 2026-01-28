import { Injectable } from "../decorators";
import { ArgumentMetadata, PipeTransform } from "../interfaces";

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
    transform(value: string | undefined, metadata: ArgumentMetadata): any {
        if (!value) return value;
        const num = parseInt(value);
        if (isNaN(num)) throw new Error(`Pipe error ${ParseIntPipe.name}`);
        return num;
    }
}