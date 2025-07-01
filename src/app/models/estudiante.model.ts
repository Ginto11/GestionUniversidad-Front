import { IEstudiante } from "../interfaces/IEstudiante";

export class Estudiante implements IEstudiante {
    id: number = 0;
    cedula: number = 0;
    nombre: string = '';
    apellido: string = '';
    edad: number = 0;
    celular: string = '';
    email: string = '';
    genero: string = '';
    generoId: number = 0;
    estado! : boolean | null;
    fechaActualizacion: string = '';
    fechaCreacion: string = '';
}