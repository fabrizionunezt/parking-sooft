import { TipoVehiculo } from "./vehiculo.model";

export class Precio{
        id_precio: number = 0;
        nombre_precio: string = '';
        monto_precio: number = 0;
        tipo_vehiculo: TipoVehiculo = new TipoVehiculo();
        cantidad_horas? : number = 1;
}