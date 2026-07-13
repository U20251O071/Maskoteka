import { Injectable } from '@angular/core';

export interface MascotaApi {
  idMascota: number;
  nombre: string;
  especie: string;
  raza: string;
  fotoUrl: string;
  color: string;
  esterilizado: string;
  fechaNacimiento: string;
  microchip: string;
  observaciones: string;
  sexo: string;
}


export interface Pet {
  id: number;
  name: string;
  age: string;
  gender: string;
  species: string;
  breed: string;
  emoji: string;
  weight: string;
  color: string;
  birth: string;
  sterilized: string;
  microchip: string;
  notes: string;
}
export interface Appointment {
  id: number;
  petId: number;
  pet: string;
  date: string;
  hour: string;
  service: string;
  status: 'Hoy' | 'Mañana' | 'Pendiente' | 'Confirmada' | 'Completada';
}
export interface Reservation {
  pet?: Pet;
  service: string;
  date: string;
  hour: string;
  total: number;
}

@Injectable({ providedIn: 'root' })
export class DataService {
  pets: Pet[] = [
    {
      id: 1,
      name: 'Alice',
      age: '3 años 11 meses',
      gender: 'Hembra',
      species: 'Perro',
      breed: 'Mestizo',
      emoji: '🐶',
      weight: '15 kg',
      color: 'Blanco con Marron',
      birth: '25 ago, 2022',
      sterilized: 'Sí',
      microchip: '123456789012345',
      notes: 'Alergia leve al pollo. Paciente muy tranquila.',
    },
    {
      id: 2,
      name: 'Milo',
      age: '5 años',
      gender: 'Macho',
      species: 'Perro',
      breed: 'Mestizo',
      emoji: '🐕',
      weight: '12.5 kg',
      color: 'Blanco con Marron',
      birth: '11 jun, 2021',
      sterilized: 'No',
      microchip: 'No registra',
      notes: 'Requiere control de vacunas.',
    },
    {
      id: 3,
      name: 'Eli',
      age: '1 año 9 meses',
      gender: 'Hembra',
      species: 'Hamster',
      breed: 'Hamster',
      emoji: '🐹',
      weight: '90 g',
      color: 'Marrón',
      birth: '01 feb, 2024',
      sterilized: 'No aplica',
      microchip: 'No registra',
      notes: 'Control de alimentación cada 3 meses.',
    },
  ];
  appointments: Appointment[] = [
    {
      id: 1,
      petId: 1,
      pet: 'Alice',
      date: '22 jun, 2026',
      hour: '10:30 am',
      service: 'Consulta general',
      status: 'Mañana',
    },
    {
      id: 2,
      petId: 2,
      pet: 'Milo',
      date: '23 jun, 2026',
      hour: '3:00 pm',
      service: 'Vacuna triple',
      status: 'Pendiente',
    },
    {
      id: 3,
      petId: 3,
      pet: 'Eli',
      date: '24 jun, 2026',
      hour: '11:00 am',
      service: 'Plan de nutrición',
      status: 'Pendiente',
    },
  ];
  reservation: Reservation = {
    service: 'Consulta especializada',
    date: 'Sábado, 27 de junio de 2026',
    hour: '11:00 am',
    total: 80,
  };
  getPets() {
    return this.pets;
  }
  getPet(id: number) {
    return this.pets.find((p) => p.id === id) ?? this.pets[0];
  }
  addPet(pet: Omit<Pet, 'id'>) {
    this.pets.push({ id: Date.now(), ...pet });
  }
  updatePet(pet: Pet) {
    const i = this.pets.findIndex((p) => p.id === pet.id);
    if (i >= 0) this.pets[i] = { ...pet };
  }
  deletePet(id: number) {
    this.pets = this.pets.filter((p) => p.id !== id);
    this.appointments = this.appointments.filter((a) => a.petId !== id);
  }
  getAppointments() {
    return this.appointments;
  }
  deleteAppointment(id: number) {
    this.appointments = this.appointments.filter((a) => a.id !== id);
  }
  setReservation(data: Partial<Reservation>) {
    this.reservation = { ...this.reservation, ...data };
  }
  confirmReservation() {
    const pet = this.reservation.pet ?? this.pets[0];
    const newApp: Appointment = {
      id: Date.now(),
      petId: pet.id,
      pet: pet.name,
      date: '24 nov, 2025',
      hour: this.reservation.hour,
      service: this.reservation.service,
      status: 'Confirmada',
    };
    this.appointments = [newApp, ...this.appointments];
  }
}
