import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';


import { ColorSketchModule } from 'ngx-color/sketch';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxTimerModule } from 'ngx-timer';
import { ChartsModule } from 'ng2-charts';
import {DatePipe} from '@angular/common';

import { ContenedorComponent } from './components/shared/contenedor/contenedor.component';
import { GestionUsuariosComponent } from './components/gestion-usuarios/gestion-usuarios.component';
import { GestionPreciosComponent } from './components/gestion-precios/gestion-precios.component';
import { GestionVehiculosComponent } from './components/gestion-vehiculos/gestion-vehiculos.component';
import { AuditoriaEstacionamientoComponent } from './components/auditoria-estacionamiento/auditoria-estacionamiento.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InProgressComponent } from './components/shared/in-progress/in-progress.component';
import { GestionMapaComponent } from './components/gestion-mapa/gestion-mapa.component';
import { FormIngresoVehiculoComponent } from './components/shared/form-ingreso-vehiculo/form-ingreso-vehiculo.component';
import { InformacionVehiculoDialogComponent } from './components/shared/informacion-vehiculo-dialog/informacion-vehiculo-dialog.component';
import { DialogRealizarCobranzaComponent } from './components/shared/dialog-realizar-cobranza/dialog-realizar-cobranza.component';
import { DialogTermCondComponent } from './components/shared/dialog-term-cond/dialog-term-cond.component';
import { LoginComponent } from './components/login/login.component';
import { PreguntasFrecuentesComponent } from './components/preguntas-frecuentes/preguntas-frecuentes.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { OnlyDigitsDirective } from './code/only-digits.directive';

@NgModule({
  declarations: [
    AppComponent,
    ContenedorComponent,
    GestionUsuariosComponent,
    GestionPreciosComponent,
    GestionVehiculosComponent,
    AuditoriaEstacionamientoComponent,
    InProgressComponent,
    GestionMapaComponent,
    FormIngresoVehiculoComponent,
    InformacionVehiculoDialogComponent,
    DialogRealizarCobranzaComponent,
    DialogTermCondComponent,
    LoginComponent,
    PreguntasFrecuentesComponent,
    ReportesComponent,
    OnlyDigitsDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatMenuModule,
    MatExpansionModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ColorSketchModule,
    NgxPageScrollCoreModule,
    ReactiveFormsModule,
    NgbModule,
    NgxTimerModule,
    ChartsModule
  ],
  providers: [DatePipe,MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
