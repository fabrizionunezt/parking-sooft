import { posicion } from "./piso.model";
import { Precio } from "./precio.model";

export class NuevoIngreso{
    idNuevoIngreso: number = 0;
    patenteVehiculo: string = '';
    dniPropietario: string = '';
    colorVehiculo: string = '';
    tipoVehiculo: number = 0;
    fechaRegistro: Date = new Date();
    precioId: number = 0;
}