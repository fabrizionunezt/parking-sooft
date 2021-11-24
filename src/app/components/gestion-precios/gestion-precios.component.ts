import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Precio } from 'src/app/models/precio.model';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { DATOS_PRECIOS_PRUEBA } from 'src/app/code/constantes';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-gestion-precios',
  templateUrl: './gestion-precios.component.html',
  styleUrls: ['./gestion-precios.component.scss']
})
export class GestionPreciosComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  precioForm: Precio = new Precio();
  editarPrecioControl: boolean = false;
  displayedColumns: string[] = ['id_precio', 'nombre_precio', 'cantidad_horas', 'monto_precio', 'nombre_tipo_vehiculo', 'acciones'];
  listadoPrecios: Precio[] = [];
  dataSource: MatTableDataSource<Precio> = new MatTableDataSource();

  descripcionPrecio = new FormControl('', [Validators.required]);
  montoPrecio = new FormControl('', [Validators.required]);
  horasPrecio = new FormControl('', [Validators.required]);
  comboSel = new FormControl(null, [this.comboBoxValidator]);

  constructor(private svcShared: SharedServiceService) {
    this.obtenerDatos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  comboBoxValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== undefined && (isNaN(control.value)) || control.value == 0) {
      return { 'noneSelected': true };
    }
    return null;
  }

  obtenerDatos() {
    this.listadoPrecios = this.svcShared.listadoPrecios;
    this.dataSource.data = this.listadoPrecios;
  }

  editarPrecio(precio: Precio) {

    Object.assign(this.precioForm, precio);
    this.editarPrecioControl = true;
  }

  eliminarPrecio(precio: Precio) {
    this.RemoveElementFromObjectArray(precio.id_precio);
    this.actualizarDataMaterial();
  }

  guardarPrecio() {
    if (!this.editarPrecioControl) {
      //TODO update Precio
      var precioNuevo = this.precioForm;
      precioNuevo.id_precio = this.listadoPrecios.length + 1;
      precioNuevo.tipo_vehiculo.nombre_tipo_vehiculo = this.svcShared.obtenerTipoVehiculo(precioNuevo.tipo_vehiculo.id_tipo_vehiculo);
      this.listadoPrecios.push(precioNuevo)
      var resultado = true;
      if (resultado) {
        this.svcShared.mostrarSnackBar("Precio registrado", "OK");
      } else {
        this.svcShared.mostrarSnackBar("Error intentando actualizar", "OK");
      }
    } else {
      //TODO realizar Precio
      var precioUpdate = this.precioForm;
      this.RemoveElementFromObjectArray(precioUpdate.id_precio);
      this.listadoPrecios.push(precioUpdate);

      var resultado = true;
      if (resultado) {
        this.svcShared.mostrarSnackBar("Precio modificado correctamente", "OK");
      } else {
        this.svcShared.mostrarSnackBar("Error intentando registrar", "OK");
      }
    }
    this.limpiarPrecioFormulario();
    this.actualizarDataMaterial();
  }

  limpiarPrecioFormulario() {
    this.precioForm = new Precio();
    this.editarPrecioControl = false;
    this.descripcionPrecio.reset();
    this.montoPrecio.reset();
    this.horasPrecio.reset();
    this.comboSel.reset();
  }

  actualizarDataMaterial() {
    this.listadoPrecios = this.listadoPrecios.sort(x => x.id_precio);
    this.dataSource.data = this.listadoPrecios;
    this.svcShared.listadoPrecios = this.listadoPrecios;
  }
  RemoveElementFromObjectArray(key: number) {
    this.listadoPrecios.forEach((value, index) => {
      if (value.id_precio == key) this.listadoPrecios.splice(index, 1);
    });
  }

}
