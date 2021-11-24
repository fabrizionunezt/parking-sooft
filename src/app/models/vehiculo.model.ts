import { Usuario } from "./usuario.model";

export class Vehiculo{

    id_vehiculo:number = 0;
    patente_vehiculo: string = '';
    color_vehiculo: string = '';
    tipo_vehiculo: TipoVehiculo = new TipoVehiculo();
    propietario?: Usuario;
}

export class TipoVehiculo{
    id_tipo_vehiculo:number = 0;
    nombre_tipo_vehiculo: string = '';
    descripcion_tipo_vehiculo: string = '';
}