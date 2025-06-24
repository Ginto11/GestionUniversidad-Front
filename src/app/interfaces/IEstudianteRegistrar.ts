export interface IEstudianteRegistrar {
    cedula: number | null;
    nombre: string;
    apellido: string;
    edad: number | null;
    email: string;
    contrasena: string;
    generoId: number;
}