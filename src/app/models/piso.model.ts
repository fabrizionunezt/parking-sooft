import { NuevoIngreso } from "./nuevoIngreso.model";

export class piso{
    idPiso?: number = 0;
    nombre: string='';
    extructuraJSON: string='';
    listaPosiciones: posicion[]=[];
    
}
export class posicion{
    idPosicion?: number = 0;
    nombre: string='';
    estado: boolean=true;
    infoPosicion?: NuevoIngreso = new NuevoIngreso();
    tipoPersona?: number = 0; //1 Socio 2 Emplado
}