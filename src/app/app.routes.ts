import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ModulosComponent } from './pages/modulos/modulos.component';
import { EstudiantesComponent } from './pages/estudiantes/estudiantes.component';
import { HomeComponent } from './pages/home/home.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { ProgramasComponent } from './pages/programas/programas.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'programas',
        component: ProgramasComponent
    },
    {
        path: 'iniciar-sesion',
        component: LoginComponent
    },
    {
        path: 'nosotros',
        component: NosotrosComponent
    },
    {
        path: 'modulos',
        component: ModulosComponent
    },
    {
        path: 'estudiantes',
        component: EstudiantesComponent
    }

];

