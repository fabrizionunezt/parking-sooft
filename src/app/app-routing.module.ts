import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditoriaEstacionamientoComponent } from './components/auditoria-estacionamiento/auditoria-estacionamiento.component';
import { GestionMapaComponent } from './components/gestion-mapa/gestion-mapa.component';
import { GestionPreciosComponent } from './components/gestion-precios/gestion-precios.component';
import { GestionUsuariosComponent } from './components/gestion-usuarios/gestion-usuarios.component';
import { GestionVehiculosComponent } from './components/gestion-vehiculos/gestion-vehiculos.component';
import { LoginComponent } from './components/login/login.component';
import { PreguntasFrecuentesComponent } from './components/preguntas-frecuentes/preguntas-frecuentes.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { ContenedorComponent } from './components/shared/contenedor/contenedor.component';
import { InProgressComponent } from './components/shared/in-progress/in-progress.component';

const routes: Routes = [
  {
    path: '', component: ContenedorComponent, children: [
      
      { path: 'GestionUsuarios', component: GestionUsuariosComponent },
      { path: 'GestionPrecios', component: GestionPreciosComponent },
      { path: 'GestionVehiculos', component: GestionVehiculosComponent },
      { path: 'GestionMapa', component: GestionMapaComponent },
      { path: 'AuditoriaEstacionamiento', component: AuditoriaEstacionamientoComponent },
      { path: 'PreguntasFrecuentes', component: PreguntasFrecuentesComponent },
      { path: 'Reportes', component: ReportesComponent },
      {path:'',component: AuditoriaEstacionamientoComponent}
    ],
  },{
    path: 'login', component: LoginComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
