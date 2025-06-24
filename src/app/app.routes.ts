import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home.component')
    },
    {
        path: 'programas',
        loadComponent: () => import('./pages/programas/programas.component')
    },
    {
        path: 'iniciar-sesion',
        loadComponent: () => import('./pages/login/login.component')
    },
    {
        path: 'nosotros',
        loadComponent: () => import('./pages/nosotros/nosotros.component')
    },
    {
        path: 'modulos',
        loadComponent: () => import('./pages/modulos/modulos.component')
    },
    {
        path: 'estudiantes',
        loadComponent: () => import('./pages/estudiantes/estudiantes.component'),
        children: [
            {
                path: '', 
                redirectTo: 'listar-estudiantes',
                pathMatch: 'full'
            },
            {
                path: 'listar-estudiantes',
                loadComponent: () => import('./components/estudiantes/tabla-estudiantes/tabla-estudiantes.component')
            },
            {
                path: 'editar-estudiante/:id',
                loadComponent: () => import('./components/estudiantes/editar-estudiante/editar-estudiante.component')
            },
            {
                path: 'nuevo-estudiante',
                loadComponent: () => import('./components/estudiantes/nuevo-estudiante/nuevo-estudiante.component')
            }
        ]
    }

];

