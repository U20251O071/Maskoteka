import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-agendar-calendario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agendar-calendario.html',
  styleUrl: './agendar-calendario.css',
})
export class AgendarCalendario {
  month = 5;
  year = 2026;
  monthLabel = this.getMonthLabel();
  days = this.generateDays();
  busyMap = new Map<string, number[]>([[`${this.year}-${this.month}`, [7, 15, 24, 28]]]);
  selected: number | null = null;
  slots = ['09:00', '10:00', '11:00', '12:00', '14:00'];
  hour = '11:00 am';

  constructor(
    public data: DataService,
    private router: Router,
  ) {}

  get busyDays() {
    return this.busyMap.get(`${this.year}-${this.month}`) ?? [];
  }

  get busy() {
    return this.busyDays;
  }

  get isSelectedBusy() {
    return this.selected !== null && this.busyDays.includes(this.selected);
  }

  get canContinue() {
    return this.selected !== null && !this.isSelectedBusy;
  }

  get slotsDisabled() {
    return this.selected === null || this.isSelectedBusy;
  }

  getMonthLabel() {
    const monthNames = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ];
    return `${monthNames[this.month].charAt(0).toUpperCase()}${monthNames[this.month].slice(1)} ${this.year}`;
  }

  generateDays() {
    const year = this.year;
    const month = this.month;
    const firstWeekday = new Date(year, month, 1).getDay();
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: 35 }, (_, i) => {
      const index = i - firstWeekday;
      if (index < 0) {
        return { day: prevMonthLastDay + index + 1, current: false };
      }
      if (index >= daysInMonth) {
        return { day: index - daysInMonth + 1, current: false };
      }
      return { day: index + 1, current: true };
    });
  }

  getLongDate(date: Date) {
    const weekdayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const monthNames = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ];
    return `${weekdayNames[date.getDay()]}, ${date.getDate()} de ${monthNames[date.getMonth()]} de ${date.getFullYear()}`;
  }

  selectDay(d: { day: number; current: boolean }) {
    if (d.current && !this.busyDays.includes(d.day)) {
      this.selected = d.day;
      this.data.setReservation({ date: this.getLongDate(new Date(this.year, this.month, d.day)) });
    }
  }

  prevMonth() {
    const prevMonth = this.month === 0 ? 11 : this.month - 1;
    const prevYear = this.month === 0 ? this.year - 1 : this.year;
    this.changeMonth(prevYear, prevMonth);
  }

  nextMonth() {
    const nextMonth = this.month === 11 ? 0 : this.month + 1;
    const nextYear = this.month === 11 ? this.year + 1 : this.year;
    this.changeMonth(nextYear, nextMonth);
  }

  changeMonth(year: number, month: number) {
    this.year = year;
    this.month = month;
    this.monthLabel = this.getMonthLabel();
    this.days = this.generateDays();
    this.selected = null;
    this.data.setReservation({ date: '' });
  }

  selectSlot(s: string) {
    if (this.slotsDisabled) {
      return;
    }
    this.hour = s.replace(':00', ':00 am');
    this.data.setReservation({ hour: this.hour });
  }

  next() {
    if (!this.canContinue) {
      return;
    }
    this.router.navigate(['/reservar-cita']);
  }
}
