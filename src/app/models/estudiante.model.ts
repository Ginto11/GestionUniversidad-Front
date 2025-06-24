import { IEstudiante } from "../interfaces/IEstudiante";

export class Estudiante implements IEstudiante {
    id: number = 0;
    cedula: number = 0;
    nombre: string = '';
    apellido: string = '';
    edad: number = 0;
    email: string = '';
    genero: string = '';
    generoId: number = 0;
}