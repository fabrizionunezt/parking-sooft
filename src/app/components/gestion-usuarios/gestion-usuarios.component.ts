import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { DATOS_USUARIOS_PRUEBA } from 'src/app/code/constantes';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.scss']
})
export class GestionUsuariosComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  usuarioForm: Usuario = new Usuario();
  editarUsuarioControl: boolean = false;
  displayedColumns: string[] = ['id_usuario', 'nombre_usuario','dni', 'nombre', 'fecha_registro', 'acciones'];
  listadoUsuarios: Usuario[] = [];
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource();
  mostrarPassword = true;

  nombreUsuario = new FormControl('', [Validators.required]);
  dniUsuario = new FormControl('', [Validators.required]);
  passUsuario = new FormControl('', [Validators.required]);
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
    this.listadoUsuarios = this.svcShared.listadoUsuarios;
    this.dataSource.data = this.listadoUsuarios;
  }
  eliminarUsuario(usuario: Usuario) {
    this.RemoveElementFromObjectArray(usuario.id_usuario);
    this.actualizarDataMaterial();
  }

  editarUsuario(usuario: Usuario) {
    Object.assign(this.usuarioForm, usuario);
    this.editarUsuarioControl = true;
  }

  guardarUsuario() {
    if (!this.editarUsuarioControl) {
      //TODO update usuario
      var usuarioNuevo = this.usuarioForm;
      usuarioNuevo.id_usuario = this.listadoUsuarios.length + 1;
      usuarioNuevo.tipo_usuario.nombre = this.svcShared.obtenerTipoUsuario(usuarioNuevo.tipo_usuario.id_tipo_usuario);
      this.listadoUsuarios.push(usuarioNuevo);
      var resultado = true;
      if (resultado) {
        this.svcShared.mostrarSnackBar("Usuario registrado", "OK");
      } else {
        this.svcShared.mostrarSnackBar("Error intentando actualizar", "OK");
      }
    } else {
      //TODO realizar insert usuario
      var usuarioUpdate = this.usuarioForm;
      
      this.RemoveElementFromObjectArray(usuarioUpdate.id_usuario);
      this.listadoUsuarios.push(usuarioUpdate);
      
      var resultado = true;
      if (resultado) {
        this.svcShared.mostrarSnackBar("Usuario modificado correctamente", "OK");
      } else {
        this.svcShared.mostrarSnackBar("Error intentando registrar", "OK");
      }
    }
    this.limpiarUsuarioFormulario();
    this.actualizarDataMaterial();
  }

  limpiarUsuarioFormulario() {
    this.mostrarPassword = true;
    this.editarUsuarioControl = false;
    this.usuarioForm = new Usuario();
    this.nombreUsuario.reset();
    this.dniUsuario.reset();
    this.passUsuario.reset();
    this.comboSel.reset();
  }

  actualizarDataMaterial() {
    this.listadoUsuarios = this.listadoUsuarios.sort(x => x.id_usuario);
    this.dataSource.data = this.listadoUsuarios;
    this.svcShared.listadoUsuarios = this.listadoUsuarios;
  }

  RemoveElementFromObjectArray(key: number) {
    this.listadoUsuarios.forEach((value, index) => {
      if (value.id_usuario == key) this.listadoUsuarios.splice(index, 1);
    });
  }

}
