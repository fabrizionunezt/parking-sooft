import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CountdownTimerService, CountupTimerService } from 'ngx-timer';
import { Auditoria } from 'src/app/models/auditoria.model';
import { NuevoIngreso } from 'src/app/models/nuevoIngreso.model';
import { posicion } from 'src/app/models/piso.model';
import { Precio } from 'src/app/models/precio.model';
import { Usuario } from 'src/app/models/usuario.model';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dialog-realizar-cobranza',
  templateUrl: './dialog-realizar-cobranza.component.html',
  styleUrls: ['./dialog-realizar-cobranza.component.scss']
})
export class DialogRealizarCobranzaComponent implements OnInit {

  posicionSeleccionada: posicion = new posicion();
  nuevoIngreso: NuevoIngreso = new NuevoIngreso();
  listadoUsuarios: Usuario[] = [];
  tipoVehiculo = '';
  precios: Precio[] = [];
  precioCobrar: string = '0';
  mostrarTiempo = false;
  esSocio = false;
  esEmpleado = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogRealizarCobranzaComponent>,
    private svcShared: SharedServiceService,
    private timerService: CountdownTimerService,
    private _snackBar: MatSnackBar,
    private datePipe: DatePipe) {
    this.posicionSeleccionada = data.posicionSeleccionada;
    this.precios = this.svcShared.listadoPrecios;
    if (this.posicionSeleccionada.infoPosicion) {
      var sdate = this.posicionSeleccionada.infoPosicion.fechaRegistro.toString();
      var cdate = new Date(sdate);
      var precioId = this.posicionSeleccionada.infoPosicion.precioId;
      var precio = this.precios.find(x => x.id_precio == precioId);
      if (precio?.cantidad_horas)
        cdate.setHours(cdate.getHours() + precio?.cantidad_horas);
      this.timerService.startTimer(cdate);
    }

    switch (this.posicionSeleccionada.infoPosicion?.tipoVehiculo) {
      case 1:
        this.tipoVehiculo = 'Moto';
        break;
      case 2:
        this.tipoVehiculo = 'Auto'
        break;

      case 3:
        this.tipoVehiculo = 'Camioneta'
        break;
    }
    this.obtenerDatos();
    this.validarUsuario();
    this.calcularPrecio();
  }

  ngOnInit(): void {
    this.mostrarTiempo = true;
  }

  obtenerDatos() {
    this.listadoUsuarios = this.svcShared.listadoUsuarios;
  }
  validarUsuario() {
    var usuario = this.listadoUsuarios.find(x => x.dni == this.posicionSeleccionada.infoPosicion?.dniPropietario);
    if (usuario) {
      if (usuario.tipo_usuario.id_tipo_usuario == 1) {
        this.esSocio = true;
        this.esEmpleado = false;
      } else if (usuario.tipo_usuario.id_tipo_usuario == 2) {
        this.esSocio = false;
        this.esEmpleado = true;
      }
    } else {
      this.esSocio = false;
      this.esEmpleado = false;
    }
  }
  calcularPrecio() {
    var currentDate = new Date();
    if (this.posicionSeleccionada.infoPosicion) {
      var precioId = this.posicionSeleccionada.infoPosicion.precioId;
      var precio = this.precios.find(x => x.id_precio == precioId);
      if (precio) {
        var monto = precio.monto_precio;
        if (this.esSocio) {
          monto = monto - (monto / 100) * 20 ;
          this.precioCobrar = Math.round(monto).toFixed(2);
        } else if (this.esEmpleado) {
          monto = 0;
          this.precioCobrar = monto.toString();
        } else {
          this.precioCobrar = Math.round(monto).toFixed(2)
        }
      }
    }
  }

  realizarCobranza() {
    this.posicionSeleccionada.estado = true;
    if (this.posicionSeleccionada.infoPosicion) {
      const tiposVehiculo = ['S/I', 'Moto', 'Auto', 'Camioneta'];
      var nuevaCobranza: Auditoria = {
        patenteVehiculo: this.posicionSeleccionada.infoPosicion.patenteVehiculo,
        dniPropietario: this.posicionSeleccionada.infoPosicion.dniPropietario,
        tipoVehiculo: tiposVehiculo[this.posicionSeleccionada.infoPosicion.tipoVehiculo],
        colorVehiculo: this.posicionSeleccionada.infoPosicion.colorVehiculo,
        fechaIngreso: this.formatDate(this.posicionSeleccionada.infoPosicion.fechaRegistro),
        fechaEgreso: this.formatDate(new Date()),
        montoCobrado: this.precioCobrar,
      };
      this.svcShared.listadoAud.push(nuevaCobranza);
    }
    this.openSnackBar('Cobranza realizada correctamente', 'OK')
    this.dialogRef.close(this.posicionSeleccionada);
  }

  formatDate(fecha: Date): string {
    var fechaParseo = this.datePipe.transform(fecha, "dd/MM/yyyy HH:mm");
    var fechaResult = '';
    if (fechaParseo)
    fechaResult = fechaParseo;
    return fechaResult;
  }

  cerrarFormulario() {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    var horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    var verticalPosition: MatSnackBarVerticalPosition = 'top';
    this._snackBar.open(message, action,
      {
        duration: 4000,
        horizontalPosition: horizontalPosition,
        verticalPosition: verticalPosition,
      });
  }
}
