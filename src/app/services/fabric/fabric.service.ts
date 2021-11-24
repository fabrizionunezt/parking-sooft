import { Injectable } from '@angular/core';
import { POINT } from 'src/app/models/helpers';
import { SharedService } from '../shared/shared.service';
import { customFabric } from 'src/app/models/fabric/fabric.model';

const fabric = customFabric;
@Injectable({
  providedIn: 'root'
})
export class FabricService {

  protected _canvas!: fabric.Canvas;
  protected _points: Array<fabric.Circle> = new Array<fabric.Circle>();
  protected _polylines: Record<string, fabric.Polyline> = {};
  protected schemaLine!: fabric.Line;
  protected alterSchemaLine!: fabric.Line;
  public listaPuntos: Array<POINT> = new Array<POINT>();

  public circleRadius: number;
  public circleFill: string;
  clipPathList: any[]=[];
  pisoSizeX: number = 0;
  pisoSizeY: number = 0;
  pisoSelObj: any;

  constructor( private svcShared: SharedService) {
    this.circleFill = '#FF4081';
    this.circleRadius = 4;
  }

  public set canvas(surface: fabric.Canvas) {
    if (surface !== undefined && surface != null && surface instanceof fabric.Canvas) {
      this._canvas = surface;
    }
  }
  limpiarVariables(){
  this._points = new Array<fabric.Circle>();
  this._polylines = {};
  this.schemaLine =new fabric.Line;
  this.alterSchemaLine! = new fabric.Line;
  this.listaPuntos = new Array<POINT>();
  this.circleFill = '#FF4081';
  this.circleRadius = 4;
  this.clipPathList = [];
  this.pisoSizeX = 0;
  this.pisoSizeY = 0;
  this.pisoSelObj = null;
  }

  public clear(): void {
    if (this._canvas !== undefined) {
      this._points.forEach((circle: fabric.Circle): void => {
        this._canvas.remove(circle);
      });

      this._points.length = 0;

      Object.keys(this._polylines).forEach((name: string): void => {
        this._canvas.remove(this._polylines[name]);
      });

      this._canvas.remove(this.schemaLine);

      this._polylines = {};
      this.schemaLine = new fabric.Line;
      this.alterSchemaLine = new fabric.Line;

      this._canvas.renderAll();
    }
  }

  public clearCircles() {
    this._points.forEach((circle: fabric.Circle): void => {
      this._canvas.remove(circle);
    });
  }

  public clearLine() {
    this._canvas.remove(this.schemaLine);
  }
  public clearAlterLine() {
    this._canvas.remove(this.alterSchemaLine);
  }

  public addPoint(p: POINT): void {
    const circle: fabric.Circle = new fabric.Circle(
      {
        left: p.x - this.circleRadius,
        top: p.y - this.circleRadius,
        fill: this.circleFill,
        radius: this.circleRadius
      });

    this._points.push(circle);

    if (this._canvas) {
      this._canvas.add(circle);
      this._canvas.renderAll();
    }
  }

  public actualizarPuntosGraficos() {
    this.listaPuntos.forEach(element => {
      this.addPoint(element);
    });
  }

  public addPolyline(name: string, points: Array<POINT>, clear: boolean = true, color: string = '#000000', fillColors: string = 'transparent',floorName: string = ''): void {
    const polyLine = new fabric.NamedPolyline(points,
      {
        strokeWidth: 2,
        stroke: color,
        fill: fillColors,
        name: floorName
      });

    if (this._canvas) {
      if (clear && this._polylines[name] !== undefined) {
        this._canvas.remove(this._polylines[name]);
      }

      this._canvas.add(polyLine);
      if(floorName != ''){
        this.pisoSelObj = polyLine;
        this.pisoSelObj.selectable = false;
        this.getFloorSize(this.pisoSelObj.points);
      }
      this._canvas.renderAll();
    }

    this._polylines[name] = polyLine;
  }

  public addSchemaLine(points: Array<number>, dibujoFinalizado: boolean = true, colorLinea: string = '#C6B6B3', grosorLinea: number = 1, alterLinea: boolean = false) {
    const schemaLine: fabric.Line = new fabric.Line(points, {
      strokeDashArray: [5, 5],
      stroke: colorLinea,
      strokeWidth: grosorLinea
    });
    
    if (this._canvas) {
      this._canvas.add(schemaLine);
      this._canvas.renderAll();
      if (alterLinea) {
        this._canvas.remove(this.alterSchemaLine);
        this.alterSchemaLine = schemaLine;
      } else {
        this._canvas.remove(this.schemaLine);
        this.schemaLine = schemaLine;
      }
    }
    if (dibujoFinalizado) {
      this._canvas.remove(this.schemaLine);
      this._canvas.remove(this.alterSchemaLine);
    }
  }

  public getCanvasJSON() {
    return this._canvas.toJSON();
  }

  public addObjectFromJSON(objJson: string) {
    var tempCanvas = new fabric.Canvas('');
    tempCanvas.loadFromJSON(objJson, () => { });
    for (var k in tempCanvas.getObjects()) {
      var obj =tempCanvas._objects[k];
      if(obj.type=='NamedPolyline'){
        obj.selectable = false;
        this.getFloorSize(obj.points);
      }
      this._canvas.add(obj);
    }
    this._canvas.renderAll();
  }
  getFloorSize(points: any){

    var valueMinX = Math.min.apply(Math,points.map((o: any) =>{return o.x;}));
    var valueMaX = Math.max.apply(Math,points.map((o: any) =>{return o.x;}));
    var valueMinY = Math.min.apply(Math,points.map((o: any) =>{return o.y;}));
    var valueMaY = Math.max.apply(Math,points.map((o: any) =>{return o.y;}));
    this.pisoSizeX = Math.round(valueMaX - valueMinX);
    this.pisoSizeY = Math.round(valueMaY - valueMinY);
  }
}
