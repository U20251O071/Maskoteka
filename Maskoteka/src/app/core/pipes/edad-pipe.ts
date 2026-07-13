import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'edad',
})
export class EdadPipe implements PipeTransform {
  transform(fechaNacimiento: string): string {
    if (!fechaNacimiento) {
      return '';
    }

    const nacimiento = new Date(fechaNacimiento);
    const hoy = new Date();

    let años = hoy.getFullYear() - nacimiento.getFullYear();
    let meses = hoy.getMonth() - nacimiento.getMonth();

    if (hoy.getDate() < nacimiento.getDate()) {
      meses--;
    }

    if (meses < 0) {
      años--;
      meses += 12;
    }

    if (años > 0 && meses > 0) {
      return `${años} año${años !== 1 ? 's' : ''} y ${meses} mes${meses !== 1 ? 'es' : ''}`;
    }

    if (años > 0) {
      return `${años} año${años !== 1 ? 's' : ''}`;
    }

    return `${meses} mes${meses !== 1 ? 'es' : ''}`;
  }
}
