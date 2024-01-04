import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'pipeHostFile',
})
export class PipeHostFilePipe implements PipeTransform {
  // Nếu ảnh dạng base64 => giữ nguyên base6 hiển thị
  // Ngược lại => Lấy ảnh qua server
  transform(value: any, ...args: any[]): any {
    if (value?.includes('http')) return value;
    return 'https://res.cloudinary.com/drvjtqywh/image/upload/' + value;
  }
}
