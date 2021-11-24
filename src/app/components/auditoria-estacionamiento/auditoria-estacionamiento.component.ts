import { Component, NgZone, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { piso, posicion } from 'src/app/models/piso.model';
import { SharedService } from 'src/app/services/shared/shared.service';
import { customFabric } from 'src/app/models/fabric/fabric.model';
import { FormIngresoVehiculoComponent } from '../shared/form-ingreso-vehiculo/form-ingreso-vehiculo.component';
import { MatDialog } from '@angular/material/dialog';
import { InformacionVehiculoDialogComponent } from '../shared/informacion-vehiculo-dialog/informacion-vehiculo-dialog.component';
import { DialogRealizarCobranzaComponent } from '../shared/dialog-realizar-cobranza/dialog-realizar-cobranza.component';
import { DialogTermCondComponent } from '../shared/dialog-term-cond/dialog-term-cond.component';
import { Router } from '@angular/router';
const fabric = customFabric;

@Component({
  selector: 'app-auditoria-estacionamiento',
  templateUrl: './auditoria-estacionamiento.component.html',
  styleUrls: ['./auditoria-estacionamiento.component.scss']
})
export class AuditoriaEstacionamientoComponent implements OnInit {

  posicionSeleccionada: posicion = new posicion();
  posicionSeleccionadaControl: boolean = false;
  pisoSeleccionado: piso = new piso();
  pisoSeleccionadoObj!: any;
  pisoSeleccionadoNum = 0;
  listadoPisos: piso[] = [];
  protected _canvas!: fabric.Canvas;
  protected _mouseUp!: (evt: fabric.IEvent) => void;

  constructor(protected _zone: NgZone, private svcShared: SharedService, private _snackBar: MatSnackBar, public dialog: MatDialog,private router: Router) {
    this.validarInicioSesion();
    this._mouseUp = (evt: fabric.IEvent) => this.__onMouseUp(evt);
  }

  validarInicioSesion(){
    var retrievedObject = localStorage.getItem('usuarioLogueado');
    if(!retrievedObject){
     this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this._zone.runOutsideAngular(() => {
      this._canvas = new fabric.Canvas('fabricSurfaceHome', {
        selection: false,
        preserveObjectStacking: true,
        backgroundColor: '#F6EDED'
      });
      this.obtenerListadoPisos();
      if (this.listadoPisos.length > 0) {
        this.seleccionarPisoList(0);
      }
    });
    this._canvas.on('mouse:up', this._mouseUp);
    var retrievedObject = localStorage.getItem('acceptTermCond');
    if(!retrievedObject){
      this.visualizarTermCond();
    }
  }

  obtenerListadoPisos() {
    if (this.svcShared.listadoPisos.length <= 0) {
      var pisoPruebaJson: piso = { extructuraJSON: '{\"version\":\"4.5.0\",\"objects\":[{\"type\":\"NamedPolyline\",\"version\":\"4.5.0\",\"originX\":\"left\",\"originY\":\"top\",\"left\":299,\"top\":49,\"width\":400,\"height\":200,\"fill\":\"#FFC046\",\"stroke\":\"#FF8F00\",\"strokeWidth\":2,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":\"\",\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"points\":[{\"x\":300,\"y\":50},{\"x\":700,\"y\":50},{\"x\":700,\"y\":250},{\"x\":300,\"y\":250},{\"x\":300,\"y\":50}],\"name\":\"Piso_01\"},{\"type\":\"PosicionRect\",\"version\":\"4.5.0\",\"originX\":\"left\",\"originY\":\"top\",\"left\":305,\"top\":58,\"width\":40,\"height\":40,\"fill\":\"#81c784\",\"stroke\":\"#43a047\",\"strokeWidth\":1,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":\"\",\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"rx\":0,\"ry\":0,\"name\":\"P1\"},{\"type\":\"PosicionRect\",\"version\":\"4.5.0\",\"originX\":\"left\",\"originY\":\"top\",\"left\":355.5,\"top\":57.5,\"width\":41,\"height\":41,\"fill\":\"#81c784\",\"stroke\":\"#43a047\",\"strokeWidth\":1,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":\"\",\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"rx\":0,\"ry\":0,\"name\":\"P2\"},{\"type\":\"PosicionRect\",\"version\":\"4.5.0\",\"originX\":\"left\",\"originY\":\"top\",\"left\":406.5,\"top\":57.5,\"width\":41,\"height\":41,\"fill\":\"#81c784\",\"stroke\":\"#43a047\",\"strokeWidth\":1,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":\"\",\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"rx\":0,\"ry\":0,\"name\":\"P3\"},{\"type\":\"PosicionRect\",\"version\":\"4.5.0\",\"originX\":\"left\",\"originY\":\"top\",\"left\":459,\"top\":57,\"width\":42,\"height\":42,\"fill\":\"#81c784\",\"stroke\":\"#43a047\",\"strokeWidth\":1,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":\"\",\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"rx\":0,\"ry\":0,\"name\":\"P4\"},{\"type\":\"PosicionRect\",\"version\":\"4.5.0\",\"originX\":\"left\",\"originY\":\"top\",\"left\":512.5,\"top\":56.5,\"width\":41,\"height\":41,\"fill\":\"#81c784\",\"stroke\":\"#43a047\",\"strokeWidth\":1,\"strokeDashArray\":null,\"strokeLineCap\":\"butt\",\"strokeDashOffset\":0,\"strokeLineJoin\":\"miter\",\"strokeUniform\":false,\"strokeMiterLimit\":4,\"scaleX\":1,\"scaleY\":1,\"angle\":0,\"flipX\":false,\"flipY\":false,\"opacity\":1,\"shadow\":null,\"visible\":true,\"backgroundColor\":\"\",\"fillRule\":\"nonzero\",\"paintFirst\":\"fill\",\"globalCompositeOperation\":\"source-over\",\"skewX\":0,\"skewY\":0,\"rx\":0,\"ry\":0,\"name\":\"P5\"}]}', nombre: 'Piso 1', listaPosiciones: [{ estado: true, nombre: 'P1' }, { estado: true, nombre: 'P2' }, { estado: true, nombre: 'P3' }, { estado: true, nombre: 'P4' }, { estado: true, nombre: 'P5' }, { estado: true, nombre: 'P6' }] };

      this.svcShared.listadoPisos.push(pisoPruebaJson);
    }
    this.listadoPisos = this.svcShared.listadoPisos;
  }

  obtenerPisoSeleccionadoJSON() {
    var canvasTemp = new fabric.Canvas('', {
      width: 1200,
      height: 500
    });
    canvasTemp.loadFromJSON(this.pisoSeleccionado.extructuraJSON, () => {
      var canvasObj = canvasTemp.getObjects();
      for (var objectC of canvasObj) {
        if (objectC.type == 'NamedPolyline') {
          this.pisoSeleccionadoObj = objectC;
          objectC.selectable = false;
        } else {
          objectC.lockMovementX = true;
          objectC.lockMovementY = true;
          objectC.setControlsVisibility({
            mt: false,
            mb: false,
            ml: false,
            mr: false,
            bl: false,
            br: false,
            tl: false,
            tr: false,
            mtr: false,
          });
          objectC.borderColor = '#C4F1AD';
          objectC.borderScaleFactor = 3;
          var control = this.pisoSeleccionado.listaPosiciones.find(x => x.nombre == objectC.name);
          if (control) {
            var fillColor = control.estado ? '#6ad906' : '#fc3f3f';
            var strokeColor = control.estado ? '#309e1d' : '#f81e18';
            objectC.set('fill', fillColor);
            objectC.set('stroke', strokeColor);

          }
        }

        this._canvas.add(objectC);
      }
    });
    this.actualizarPantalla();
  }

  seleccionarPisoList(numPisoSel: number) {
    this._canvas.clear();
    this._canvas.backgroundColor = '#F6EDED';
    this.pisoSeleccionadoNum = numPisoSel;
    this.pisoSeleccionado = this.listadoPisos[numPisoSel];
    this.obtenerPisoSeleccionadoJSON();
  }
  actualizarPantalla() {
    this._zone.run(() => { });
  }

  protected __onMouseUp(evt: fabric.IEvent): void {
    if (evt.target && evt.target.type == 'PosicionRect') {
      this.posicionSeleccionadaControl = true;
      var control = this.pisoSeleccionado.listaPosiciones.find(x => x.nombre == evt.target?.name);
      if (control) {
        this.posicionSeleccionada = control;
      }
    } else {
      this.posicionSeleccionadaControl = false;
    }
    this.actualizarPantalla();
  }

  abrirCargarNuevoIngreso() {
    const dialogRef = this.dialog.open(FormIngresoVehiculoComponent, {
      data: {
        posicionSeleccionada: this.posicionSeleccionada,
      }
    });

    dialogRef.afterClosed().subscribe((result: posicion) => {
      if (result) {
        for (let index = 0; index < this.pisoSeleccionado.listaPosiciones.length; index++) {
          if (this.pisoSeleccionado.listaPosiciones[index].nombre == result.nombre) {
            this.pisoSeleccionado.listaPosiciones[index] = result;
          }

        }
        this.seleccionarPisoList(this.pisoSeleccionadoNum);
        this.posicionSeleccionadaControl = false;
      }
    });
  }
  informacionVehiculo() {
    const dialogRef = this.dialog.open(InformacionVehiculoDialogComponent, {
      data: {
        posicionSeleccionada: this.posicionSeleccionada,
      }, width: '500px', height: '250px'
    });

    dialogRef.afterClosed().subscribe((result: posicion) => {

    });
  }
  realizarCobranza() {
    const dialogRef = this.dialog.open(DialogRealizarCobranzaComponent, {
      data: {
        posicionSeleccionada: this.posicionSeleccionada,
      }, width: '500px', height: '330px'
    });

    dialogRef.afterClosed().subscribe((result: posicion) => {
      if (result) {
        for (let index = 0; index < this.pisoSeleccionado.listaPosiciones.length; index++) {
          if (this.pisoSeleccionado.listaPosiciones[index].nombre == result.nombre) {
            this.pisoSeleccionado.listaPosiciones[index] = result;
          }

        }
        this.seleccionarPisoList(this.pisoSeleccionadoNum);
        this.posicionSeleccionadaControl = false;
      }
    });
  }

  visualizarTermCond() {
    const dialogRef = this.dialog.open(DialogTermCondComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        var aceptaTermCond = {termCond:true};
        localStorage.setItem('acceptTermCond', JSON.stringify(aceptaTermCond));
      }
    });
  }
  //disable properties for positions
  /*
   object.hasRotatingPoint = false; to hide rotating point.
   rect.lockMovementX = true; and rect.lockMovementY = true; to stop dragging
   object.lockUniScaling = true. scaling disabled
  */
}
