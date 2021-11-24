import { Component, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { POINT } from 'src/app/models/helpers'
import { FabricService } from 'src/app/services/fabric/fabric.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { piso, posicion } from 'src/app/models/piso.model';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

import { customFabric } from 'src/app/models/fabric/fabric.model';

const fabric = customFabric;
@Component({
  selector: 'app-gestion-mapa',
  templateUrl: './gestion-mapa.component.html',
  styleUrls: ['./gestion-mapa.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GestionMapaComponent implements OnInit {

  // store point collection to send to server along with the convex hull
  protected _points: Array<POINT> = [];

  // canvas reference and event handlers
  protected _canvas!: fabric.Canvas;
  protected _mouseUp!: (evt: fabric.IEvent) => void;
  protected _mouseMove!: (evt: fabric.IEvent) => void;
  protected _objectMove!: (evt: fabric.IEvent) => void;

  figuraFinalizada: boolean = false;
  figuraComenzada: boolean = false;
  figuraGuardada: boolean = false;

  pisoSeleccionadoSel: number = 0;
  pisoSeleccionado!: piso;
  pisoSeleccionadoObj!: any;
  posicionSizeX: number = 0;
  posicionSizeY: number = 0;
  posicionSeleccionada!: any;

  listadoPisos: piso[]=[];

  constructor(protected _fabricService: FabricService, protected _zone: NgZone, private svcShared: SharedService, private _snackBar: MatSnackBar) {

    this._points = new Array<POINT>();

    this._mouseUp = (evt: fabric.IEvent) => this.__onMouseUp(evt);
    this._mouseMove = (evt: fabric.IEvent) => this.__onMouseMove(evt);
    this._objectMove = (evt: fabric.IEvent) => this.__onObjectMoveFinish(evt);
    
  }

  ngOnInit(): void {
    this._zone.runOutsideAngular(() => {
      this._canvas = new fabric.Canvas('fabricSurface', {
        selection: false,
        preserveObjectStacking: true,
        backgroundColor: '#F0EDED'
      });

      this._fabricService.canvas = this._canvas;
      this.obtenerListadoPisos();
      if(this.listadoPisos.length == 0){
        this.crearNuevoPiso();
      }else{
        this.figuraComenzada = true;
        this.figuraFinalizada = true;
        this.figuraGuardada = true;
        this.seleccionarPisoList(0);
      }
      this.controlEventosMousePiso(true);
    });
  }

  public ngOnDestroy(): void {
    this.controlEventosMousePiso(false);
  }
  controlEventosMousePiso(habilitar: boolean) {
    if (this._canvas && !habilitar) {
      this._canvas.off('mouse:up', this._mouseUp);
      this._canvas.off('mouse:move', this._mouseMove);

    } else if (habilitar) {
      this._canvas.on('mouse:up', this._mouseUp);
      this._canvas.on('mouse:move', this._mouseMove);
    }
  }

  public onClear(): void {
    this._points.length = 0;
    this.figuraFinalizada = false;
    this.figuraFinalizada = false;

    this._fabricService.clear();
  }



  protected __onMouseMove(evt: fabric.IEvent): void {
    if (evt.pointer && this._points.length >= 1) {
      var coordenadasLineaPerp = [this._points[this._points.length - 1].x, this._points[this._points.length - 1].y,
      evt.pointer.x, evt.pointer.y];
      var coordenadasLineaPunt = [evt.pointer.x, evt.pointer.y, this._points[0].x, this._points[0].y];
      //agrego linea puntero 
      if (this.getCoordinateDiference(coordenadasLineaPerp[0], coordenadasLineaPerp[2]) <= 20 || this.getCoordinateDiference(coordenadasLineaPerp[1], coordenadasLineaPerp[3]) <= 20) {
        this._fabricService.addSchemaLine(coordenadasLineaPerp, this.figuraFinalizada, '#25A331', 2);
      } else {
        this._fabricService.addSchemaLine(coordenadasLineaPerp, this.figuraFinalizada);
      }
      //agrego linea punteada
      if (this._points.length > 2) {
        if (this.getCoordinateDiference(coordenadasLineaPunt[0], coordenadasLineaPunt[2]) <= 5 || this.getCoordinateDiference(coordenadasLineaPunt[1], coordenadasLineaPunt[3]) <= 5) {
          this._fabricService.addSchemaLine(coordenadasLineaPunt, this.figuraFinalizada, '#7F8780', 2, true);
        } else {
          this._fabricService.clearAlterLine();
        }
      }

    }
  }

  protected __onMouseUp(evt: fabric.IEvent): void {
    if (evt.pointer && !this.figuraFinalizada) {
      var xGridVal = Math.round(evt.pointer.x/50)*50;
      var yGridVal = Math.round(evt.pointer.y/50)*50;
      var xFinal = Math.abs(xGridVal - evt.pointer.x) < 15 ? xGridVal: evt.pointer.x;
      var yFinal = Math.abs(yGridVal - evt.pointer.y) < 15 ? yGridVal: evt.pointer.y;

      var p: POINT = { x: xFinal, y: yFinal };
      this.figuraComenzada = true;
      this._fabricService.addPoint(p);
      if (this._points.length >= 1) {
        this.ajustarPuntosPolyline(p);
      } else {
        this._points.push(p);
      }
      if (this.figuraFinalizada) {
        this.limpiarGraficoPolyline();
        this.habilitarSeleccionControladoPosiciones();
      }
      this.crearPolyline();
      this.actualizarPantalla();
    }
  }

  ajustarPuntosPolyline(currentPoint: POINT) {
    const firstPoint = this._points[0];
    const lastPoint = this._points[this._points.length - 1];
    var finalPoint: POINT = { x: currentPoint.x, y: currentPoint.y };

    //validar perpendicularidad 90°
    finalPoint.x = 20 >= this.getCoordinateDiference(currentPoint.x, lastPoint.x) ? lastPoint.x : currentPoint.x;
    finalPoint.y = 20 >= this.getCoordinateDiference(currentPoint.y, lastPoint.y) ? lastPoint.y : currentPoint.y;

    if (firstPoint != lastPoint) {
      //valido cierre figura
      finalPoint.x = 20 >= this.getCoordinateDiference(currentPoint.x, firstPoint.x) ? firstPoint.x : finalPoint.x;
      finalPoint.y = 20 >= this.getCoordinateDiference(currentPoint.y, firstPoint.y) ? firstPoint.y : finalPoint.y;
      //valido cierre perpendicular
      this._points[this._points.length - 1].x = (firstPoint.y == finalPoint.y && firstPoint.x == finalPoint.x) && this.getCoordinateDiference(firstPoint.x, lastPoint.x) <= 20 ? firstPoint.x : lastPoint.x;
      this._points[this._points.length - 1].y = (firstPoint.y == finalPoint.y && firstPoint.x == finalPoint.x) && this.getCoordinateDiference(firstPoint.y, lastPoint.y) <= 20 ? firstPoint.y : lastPoint.y;

      this.figuraFinalizada = firstPoint.y == finalPoint.y && firstPoint.x == finalPoint.x;
    }

    this._points.push(finalPoint);
  }

  limpiarGraficoPolyline() {
    this._fabricService.clearLine();
    this._fabricService.clearAlterLine();
    this._fabricService.clearCircles();
  }

  crearPolyline() {
    if (this.figuraFinalizada) {
      this._fabricService.listaPuntos = this._points;
      const nombrePiso = 'Piso_' + this.listadoPisos.length+ 1;
      this._fabricService.addPolyline('polyline', this._points, true, '#FF8F00', '#FFC046', nombrePiso);
      this.pisoSeleccionadoObj = this._fabricService.pisoSelObj;
    } else {
      this._fabricService.addPolyline('polyline', this._points);
    }
  }

  
  protected __onObjectMoveFinish(evt: fabric.IEvent): void {
    if (evt.target?.aCoords && evt.target.type == 'PosicionRect') {
      var coordenadas = evt.target?.aCoords;
      var vTl = true;
      var vTr = true;
      var vBl = true;
      var vBr = true;
      this.posicionSizeX = Math.abs(coordenadas.tl.x - coordenadas.tr.x);
      this.posicionSizeY = Math.abs(coordenadas.tl.y - coordenadas.bl.y);
      vTl = this.inside(coordenadas.tl, this.pisoSeleccionadoObj);
      vTr = this.inside(coordenadas.tr, this.pisoSeleccionadoObj);
      vBl = this.inside(coordenadas.bl, this.pisoSeleccionadoObj);
      vBr = this.inside(coordenadas.br, this.pisoSeleccionadoObj);
      this.posicionSeleccionada = evt.target;
      
      if (vTl && vTr && vBl && vBr) {
        evt.target.setCoords();
        evt.target.saveState();
      } else {
        evt.target.set("fill", "#B0ADAD");
        evt.target.set("stroke", "#959595");
        evt.target.animate(
          {
            top: 250 - (this.posicionSizeY / 2),
            left: 500 - (this.posicionSizeX / 2),
          },
          {
            duration: 1000,
            onChange: this._canvas.renderAll.bind(this._canvas),
            easing: fabric.util.ease["easeOutBack"],
            onComplete: function () {
              if (evt.target)
              evt.target.set("fill", "#81c784"),
              evt.target.set("stroke", "#43a047")
            }
          }
          );
        }
      this.actualizarPantalla();
      
    }
  }

  agregarPosicion() {
    if (this.posicionSizeX == 0) {
      this.obtenerPosicionSize();
      if(this.posicionSizeX == 0){
        this.posicionSizeX = 45;
        this.posicionSizeY = 50;
      }

    }
    var posicion: posicion = { estado: true, nombre: `P${this.pisoSeleccionado.listaPosiciones.length + 1}` };
    this.pisoSeleccionado.listaPosiciones.push(posicion);
    
    var posicionGraf = new fabric.PosicionRect({
      fill: posicion.estado ? '#81c784' : '#e57373',
      stroke: posicion.estado ? '#43a047' : '#e53935',
      name: posicion.nombre,
      top: 250 - (this.posicionSizeY / 2),
      left: 500 - (this.posicionSizeX / 2),
      height: this.posicionSizeY,
      width: this.posicionSizeX,
      type: 'PosicionRect'
    });
    this._canvas.add(posicionGraf);
    this._canvas.renderAll();
  }
  
  inside(point: fabric.Point, vs: fabric.Polyline) {
    // ray-casting algorithm based on
    // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html
    
    var polyLength = vs.points ? vs.points.length : 0;
    var listadoPuntos: fabric.Point[] = [];
    if (vs.points) {
      listadoPuntos = vs.points;
    }

    //A point is in a polygon if a line from the point to infinity crosses the polygon an odd number of times
    let odd = false;
    //For each edge (In this case for each point of the polygon and the previous one)
    for (let i = 0, j = polyLength - 1; i < polyLength; i++) {
      //If a line from the point into infinity crosses this edge
      if (((listadoPuntos[i].y > point.y) !== (listadoPuntos[j].y > point.y)) // One point needs to be above, one below our y coordinate
      // ...and the edge doesn't cross our Y corrdinate before our x coordinate (but between our x coordinate and infinity)
      && (point.x < ((listadoPuntos[j].x - listadoPuntos[i].x) * (point.y - listadoPuntos[i].y) / (listadoPuntos[j].y - listadoPuntos[i].y) + listadoPuntos[i].x))) {
        // Invert odd
        odd = !odd;
      }
      j = i;
      
    }
    return odd;
  };
  
  eliminarPosicionSeleccionada() {
    this._canvas.remove(this.posicionSeleccionada);
    this._canvas.renderAll();
    this.posicionSeleccionada = null;
    this.actualizarPantalla();
  }
  
  eliminarPiso() {
    if(this.pisoSeleccionadoSel != -1){
      this.listadoPisos.splice(this.pisoSeleccionadoSel,1);
    }
    this.pisoSeleccionado = new piso();
    this.inicializarVariblesPiso();
    this._canvas.clear();
    this.dibujarCuadriculaCanvas();
  }
  guardarPiso() {
    this.pisoSeleccionado.extructuraJSON = this.obtenerCanvasJSON();
    if(this.pisoSeleccionadoSel == -1){
      this.listadoPisos.push(this.pisoSeleccionado)
    }else{
      this.listadoPisos[this.pisoSeleccionadoSel] = this.pisoSeleccionado;
      var jsonPiso = JSON.stringify(this.pisoSeleccionado);
      console.log(jsonPiso);
    }
    
    this.limpiarVistaPiso();
    this.figuraFinalizada = true;
    this.figuraGuardada = true;
    this.openSnackBar('Piso guardado correctamente','OK');
    

    //guardar db
  }

  obtenerCanvasJSON(){
    var objects = this._canvas.getObjects();
    var listadoTemp = [];
    var canvasTemp = new fabric.Canvas('',{
      width:1000,
      height:500
    });
    for (var objectC of objects) {
      if(objectC.type == 'PosicionRect' || objectC.type == 'NamedPolyline'){
          listadoTemp.push(objectC);
      }
    }
    for (var temp of listadoTemp) {
      canvasTemp.add(temp);
    }

    return JSON.stringify(canvasTemp);

  }
  limpiarVistaPiso(){
    this.inicializarVariblesPiso()
    this._canvas.clear();
    this.dibujarCuadriculaCanvas();
    this._fabricService.limpiarVariables();
  }
  
  crearNuevoPiso(){
    this.limpiarVistaPiso();
    this.generarPisoNuevo();
  }
  generarPisoNuevo() {
    var nombrePiso = `Piso ${this.listadoPisos.length + 1}`;
    var nuevoPiso: piso = { extructuraJSON: '', nombre: nombrePiso, listaPosiciones: [] };
    this.pisoSeleccionado = nuevoPiso;
    this.pisoSeleccionadoSel = -1;
    this.figuraComenzada = true;
  }
  
  obtenerPisoSeleccionadoJSON() {
    var canvasTemp = new fabric.Canvas('',{
      width:1000,
      height:500
    });
    canvasTemp.loadFromJSON(this.pisoSeleccionado.extructuraJSON,()=>{
      var canvasObj = canvasTemp.getObjects();
      for (var objectC of canvasObj) {
        if(objectC.type == 'NamedPolyline'){
          this.pisoSeleccionadoObj = objectC;
          objectC.selectable = false;
        }
        this._canvas.add(objectC);
        
      }
    });
    this.habilitarSeleccionControladoPosiciones();
    this.actualizarPantalla();
  }
  seleccionarPisoList(numPisoSel: number){
    this._canvas.clear();
    this.dibujarCuadriculaCanvas();
    this.pisoSeleccionado = this.listadoPisos[numPisoSel];
    this.pisoSeleccionadoSel = numPisoSel;
    this.obtenerPisoSeleccionadoJSON();
    this.figuraFinalizada = true;
    this.figuraComenzada = true;
    this.habilitarSeleccionControladoPosiciones();
  }
  obtenerListadoPisos(){
    this.listadoPisos = this.svcShared.listadoPisos;
  }
  inicializarVariblesPiso(){
    this.figuraComenzada = false;
    this.figuraFinalizada = false;
    this.pisoSeleccionadoSel = 0;
    this.pisoSeleccionado = new piso();
    this.pisoSeleccionadoObj = {};
    this.posicionSizeX = 0;
    this.posicionSizeY = 0;
    this.posicionSeleccionada = null;
    this._points = new Array<POINT>(); 
  }

  getCoordinateDiference(first: number, second: number) {
    var resultado = 0;
    resultado = Math.abs(first - second);
    return resultado;
  }
  actualizarPantalla() {
    this._zone.run(() => { });
  }
  obtenerPosicionSize() {
    this.posicionSizeX = Math.round((this._fabricService.pisoSizeX / 100) * 10);
    this.posicionSizeY = Math.round((this._fabricService.pisoSizeY / 100) * 20);
  }
  habilitarSeleccionControladoPosiciones() {
    this._canvas.on('mouse:up', this._objectMove);
  }
  
  dibujarCuadriculaCanvas() {
    var grid = 50;
    var unitScale = 10;
    var canvasWidth = 100 * unitScale;
    var canvasHeight = 50 * unitScale;
    for (var i = 0; i < (canvasWidth / grid); i++) {
      this._canvas.add(new fabric.Line([ i * grid, 0, i * grid, canvasHeight], { type:'line', stroke: '#3F3D3D', selectable: false }));
      this._canvas.add(new fabric.Line([ 0, i * grid, canvasWidth, i * grid], { type: 'line', stroke: '#3F3D3D', selectable: false }))
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

