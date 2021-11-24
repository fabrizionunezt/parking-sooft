import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NuevoIngreso } from 'src/app/models/nuevoIngreso.model';
import { posicion } from 'src/app/models/piso.model';

@Component({
  selector: 'app-informacion-vehiculo-dialog',
  templateUrl: './informacion-vehiculo-dialog.component.html',
  styleUrls: ['./informacion-vehiculo-dialog.component.scss']
})
export class InformacionVehiculoDialogComponent implements OnInit {


  posicionSeleccionada: posicion = new posicion();
  nuevoIngreso: NuevoIngreso = new NuevoIngreso();
  tipoVehiculo = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<InformacionVehiculoDialogComponent>) {
    this.posicionSeleccionada = data.posicionSeleccionada;

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
  }

  ngOnInit(): void {
  }
  cerrarFormulario() {
    this.dialogRef.close();
  }

}
