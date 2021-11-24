import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Vehiculo } from 'src/app/models/vehiculo.model';
import { ColorEvent } from 'ngx-color';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { DATOS_VEHICULOS_PRUEBA } from 'src/app/code/constantes';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/models/usuario.model';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-gestion-vehiculos',
  templateUrl: './gestion-vehiculos.component.html',
  styleUrls: ['./gestion-vehiculos.component.scss']
})
export class GestionVehiculosComponent implements OnInit,AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  vehiculoForm: Vehiculo = new Vehiculo();
  displayedColumns: string[] = ['id_vehiculo', 'patente_vehiculo', 'dni', 'nombre', 'color_vehiculo', 'nombre_tipo_vehiculo', 'acciones'];
  listadoVehiculos: Vehiculo[] = [];
  listadoUsuarios: Usuario[] = [];
  dataSource: MatTableDataSource<Vehiculo> = new MatTableDataSource();
  controlUsuario = new FormControl('', [Validators.required]);
  patenteVehiculo = new FormControl('', [Validators.required]);
  colorVehiculo = new FormControl('', [Validators.required]);
  comboSel = new FormControl(null, [this.comboBoxValidator]);
  listadoVehiculosOptions!: Observable<Usuario[]>;
  constructor(private svcShared: SharedServiceService) {
    this.obtenerDatos();
  }

  ngOnInit(): void {
    this.listadoVehiculosOptions = this.controlUsuario.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGroup(value))
    );
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  private _filterGroup(value: string): Usuario[] {
    if (value) {
      var min = value.toLowerCase();
      return this.listadoUsuarios.filter(x => x.dni.toLowerCase().includes(min) || x.nombre_usuario.toLowerCase().includes(min));
    }

    return this.listadoUsuarios;
  }

  public getDisplayFn() {
    return (val: any) => this.display(val);
  }

  private display(user: Usuario): string {
    //access component "this" here
    return user ? user.nombre_usuario + ' - ' + user.dni : user;
  }
  usuarioSeleccionado(usuario: Usuario) {
    this.vehiculoForm.propietario = usuario;
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

  eliminarVehiculo(vehiculo: Vehiculo) {
    this.RemoveElementFromObjectArray(vehiculo.id_vehiculo);
    this.actualizarDataMaterial();
  }


  obtenerDatos() {
    this.listadoVehiculos = this.svcShared.listadoVehiculos;
    this.listadoUsuarios = [...this.svcShared.listadoUsuarios];
    this.dataSource.data = this.listadoVehiculos;
  }

  guardarVehiculo() {
    //TODO realizar insert usuario
    var vehiculoNuevo = this.vehiculoForm;
    vehiculoNuevo.id_vehiculo = this.listadoVehiculos.length + 1;
    vehiculoNuevo.tipo_vehiculo.nombre_tipo_vehiculo = this.svcShared.obtenerTipoVehiculo(vehiculoNuevo.tipo_vehiculo.id_tipo_vehiculo);
    this.listadoVehiculos.push(vehiculoNuevo);
    var resultado = true;
    if (resultado) {
      this.svcShared.mostrarSnackBar("Vehiculo registrado correctamente", "OK");
    } else {
      this.svcShared.mostrarSnackBar("Error intentando registrar", "OK");
    }
    this.limpiarVehiculoFormulario();
    this.actualizarDataMaterial()
  }

  limpiarVehiculoFormulario() {
    this.vehiculoForm = new Vehiculo();
    this.controlUsuario.reset();
    this.patenteVehiculo.reset();
    this.colorVehiculo.reset();
    this.comboSel.reset();
  }
  actualizarDataMaterial() {
    this.listadoVehiculos = this.listadoVehiculos.sort(x => x.id_vehiculo);
    this.dataSource.data = this.listadoVehiculos;
    this.svcShared.listadoVehiculos = this.listadoVehiculos;
  }

  RemoveElementFromObjectArray(key: number) {
    this.listadoVehiculos.forEach((value, index) => {
      if (value.id_vehiculo == key) this.listadoVehiculos.splice(index, 1);
    });
  }

}
