import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { NuevoIngreso } from 'src/app/models/nuevoIngreso.model';
import { posicion } from 'src/app/models/piso.model';
import { Precio } from 'src/app/models/precio.model'
import { SharedServiceService } from 'src/app/services/shared-service.service';
@Component({
  selector: 'app-form-ingreso-vehiculo',
  templateUrl: './form-ingreso-vehiculo.component.html',
  styleUrls: ['./form-ingreso-vehiculo.component.scss']
})
export class FormIngresoVehiculoComponent implements OnInit {

  posicionSeleccionada: posicion = new posicion();
  nuevoIngreso: NuevoIngreso = new NuevoIngreso();
  listadoPrecios: Precio[] = [];
  patenteVehiculo = new FormControl('', [Validators.required]);
  colorVehiculo = new FormControl('', [Validators.required]);
  dniPropietario = new FormControl('', [Validators.required]);
  tipoVehiculo = new FormControl('', [Validators.required]);
  planCochera = new FormControl('', [Validators.required]);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<FormIngresoVehiculoComponent>, private svcShared: SharedServiceService, private _snackBar: MatSnackBar) {
    this.posicionSeleccionada = data.posicionSeleccionada;
    this.listadoPrecios = [...this.svcShared.listadoPrecios];
  }

  ngOnInit(): void {
  }

  guardarNuevoIngreso() {
    this.nuevoIngreso.fechaRegistro = new Date();
    this.posicionSeleccionada.infoPosicion = this.nuevoIngreso;
    this.posicionSeleccionada.estado = false;
    this.openSnackBar('Se registro el ingreso del vehiculo', 'OK');
    switch (this.nuevoIngreso.tipoVehiculo) {
      case 1:
        this.svcShared.cantidadMotosIng += 1;
        break;
      case 2:
        this.svcShared.cantidadAutosIng += 1;
        break;
      case 3:
        this.svcShared.cantidadCamionetasIng += 1;
        break;
    }

    this.dialogRef.close(this.posicionSeleccionada);
  }
  cerrarFormulario() {
    this.dialogRef.close();
  }
  actualizarPrecios(target: any) {
    if (target.value) {
      this.listadoPrecios = [...this.svcShared.listadoPrecios].filter(x => x.tipo_vehiculo.id_tipo_vehiculo == target.value);
    }
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
