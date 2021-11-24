import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { DATOS_PRECIOS_PRUEBA,DATOS_REPORTE_AUDITORIA, DATOS_USUARIOS_PRUEBA, DATOS_VEHICULOS_PRUEBA, TIPO_PERSONA_EMPLEADO, TIPO_PERSONA_SOCIO, TIPO_VEHICULO_AUTO, TIPO_VEHICULO_CAMIONETA, TIPO_VEHICULO_MOTO } from '../code/constantes';
import { Auditoria } from '../models/auditoria.model';
import { Precio } from '../models/precio.model';
import { Usuario } from '../models/usuario.model';
import { Vehiculo } from '../models/vehiculo.model';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  listadoUsuarios: Usuario[] = [];
  listadoPrecios: Precio[] = [];
  listadoVehiculos: Vehiculo[] = [];
  listadoAud: Auditoria[] = [];

  cantidadMotosIng:number = 37;
  cantidadAutosIng:number = 24;
  cantidadCamionetasIng:number = 18;

  cantidadMotosSemanal:number = 215;
  cantidadAutosSemanal:number = 352;
  cantidadCamionetasSemanal:number = 132;

  cantidadMotosMes:number = 932;
  cantidadAutosMes:number = 1224;
  cantidadCamionetasMes:number = 225;

  precioBaseMoto: number = 40;
  precioBaseAuto: number = 65;
  precioBaseCamioneta: number = 80;

  constructor(private _snackBar: MatSnackBar) {

    this.listadoUsuarios = DATOS_USUARIOS_PRUEBA;
    this.listadoVehiculos = DATOS_VEHICULOS_PRUEBA;
    this.listadoPrecios = DATOS_PRECIOS_PRUEBA;
    this.listadoAud = DATOS_REPORTE_AUDITORIA;
  }

  mostrarSnackBar(mensaje: string, btnMensaje: string) {
    this._snackBar.open(mensaje, btnMensaje, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000
    });
  }

  obtenerTipoVehiculo(idTipo: number) {
    switch (idTipo) {
      case 1:
        return TIPO_VEHICULO_MOTO;
        break;
      case 2:
        return TIPO_VEHICULO_AUTO;
        break;
      case 3:
        return TIPO_VEHICULO_CAMIONETA;
        break;

    }
    return '';
  }

  obtenerTipoUsuario(idTipo: number) {
    switch (idTipo) {
      case 1:
        return TIPO_PERSONA_SOCIO;
        break;
      case 2:
        return TIPO_PERSONA_EMPLEADO;
        break;
    }
    return '';
  }
}
