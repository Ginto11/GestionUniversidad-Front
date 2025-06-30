export interface IEstudianteRegistrar {
    cedula: number | null;
    nombre: string;
    apellido: string;
    edad: number | null;
    celular: string;
    email: string;
    contrasena: string;
    confirmacion_contrasena: string;
    generoId: number;
}