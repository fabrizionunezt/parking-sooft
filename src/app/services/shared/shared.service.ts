import { Injectable } from '@angular/core';
import { piso } from 'src/app/models/piso.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  listadoPisos: piso[]=[];
  constructor() { }

  guardarPiso(jsonCanvas: string){
    var objJson = JSON.parse(jsonCanvas);
    console.log(objJson);
  }
}
