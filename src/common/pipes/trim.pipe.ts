import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return value;
    }

    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        const val = value[key];
        if (typeof val === 'string') {
          value[key] = val.trim();
        }
        else if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
          value[key] = this.transform(val, metadata);
        }
        else if (Array.isArray(val)) {
          value[key] = val.map(item => 
            typeof item === 'string' ? item.trim() : item
          );
        }
      }
    }
    return value;
  }
}