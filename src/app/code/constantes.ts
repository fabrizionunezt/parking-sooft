import { Auditoria } from "../models/auditoria.model";
import { Precio } from "../models/precio.model";
import { Usuario } from "../models/usuario.model";
import { Vehiculo } from "../models/vehiculo.model";

 export const DATOS_VEHICULOS_PRUEBA: Vehiculo[] = [
    {id_vehiculo: 1, patente_vehiculo: 'OIA133',tipo_vehiculo: {id_tipo_vehiculo:1,nombre_tipo_vehiculo:'Moto',descripcion_tipo_vehiculo: ''}, color_vehiculo:'azul',
    propietario: {dni:'10967893',id_usuario: 1, nombre_usuario: 'Juan', tipo_usuario: {id_tipo_usuario:1,nombre:'Socio',descripcion: ''}, fecha_registro: new Date('2021-06-29T00:00:00')}},
    {id_vehiculo: 2, patente_vehiculo: 'AFS313',tipo_vehiculo: {id_tipo_vehiculo:2,nombre_tipo_vehiculo:'Auto',descripcion_tipo_vehiculo: ''}, color_vehiculo:'rojo',
    propietario: {dni:'43026985',id_usuario: 2, nombre_usuario: 'Pedro', tipo_usuario: {id_tipo_usuario:2,nombre:'Empleado',descripcion: ''}, fecha_registro: new Date()},},
    {id_vehiculo: 3, patente_vehiculo: 'PEG930',tipo_vehiculo: {id_tipo_vehiculo:1,nombre_tipo_vehiculo:'Moto',descripcion_tipo_vehiculo: ''}, color_vehiculo:'verde',
    propietario:{dni:'12341545',id_usuario: 3, nombre_usuario: 'Lucas', tipo_usuario: {id_tipo_usuario:1,nombre:'Socio',descripcion: ''}, fecha_registro: new Date('2021-06-12T00:00:00')},},
    {id_vehiculo: 4, patente_vehiculo: 'UAG132',tipo_vehiculo: {id_tipo_vehiculo:3,nombre_tipo_vehiculo:'Camioneta',descripcion_tipo_vehiculo: ''}, color_vehiculo:'negro',
    propietario:{dni:'12315677',id_usuario: 4, nombre_usuario: 'Mateo', tipo_usuario: {id_tipo_usuario:1,nombre:'Socio',descripcion: ''}, fecha_registro: new Date('2021-06-29T00:00:00')},},
    {id_vehiculo: 5, patente_vehiculo: 'AWD312',tipo_vehiculo: {id_tipo_vehiculo:1,nombre_tipo_vehiculo:'Moto',descripcion_tipo_vehiculo: ''}, color_vehiculo:'gris',
    propietario:{dni:'56797456',id_usuario: 5, nombre_usuario: 'Fabian', tipo_usuario: {id_tipo_usuario:1,nombre:'Socio',descripcion: ''}, fecha_registro: new Date('2021-06-12T00:00:00')},},
    {id_vehiculo: 6, patente_vehiculo: 'GEQ412',tipo_vehiculo: {id_tipo_vehiculo:2,nombre_tipo_vehiculo:'Auto',descripcion_tipo_vehiculo: ''}, color_vehiculo:'blanco',
    propietario:{dni:'54246824',id_usuario: 6, nombre_usuario: 'Matias', tipo_usuario: {id_tipo_usuario:2,nombre:'Empleado',descripcion: ''}, fecha_registro: new Date('2021-06-29T00:00:00')},},
    {id_vehiculo: 7, patente_vehiculo: 'QWF821',tipo_vehiculo: {id_tipo_vehiculo:1,nombre_tipo_vehiculo:'Moto',descripcion_tipo_vehiculo: ''}, color_vehiculo:'gris',
    propietario:{dni:'12957639',id_usuario: 7, nombre_usuario: 'Jeruel', tipo_usuario: {id_tipo_usuario:1,nombre:'Socio',descripcion: ''}, fecha_registro: new Date('2021-06-29T00:00:00')},},
    {id_vehiculo: 8, patente_vehiculo: 'TUC483',tipo_vehiculo: {id_tipo_vehiculo:3,nombre_tipo_vehiculo:'Camioneta',descripcion_tipo_vehiculo: ''}, color_vehiculo:'rojo',
    propietario:{dni:'23802679',id_usuario: 8, nombre_usuario: 'Tuca', tipo_usuario: {id_tipo_usuario:1,nombre:'Socio',descripcion: ''}, fecha_registro: new Date('2021-06-12T00:00:00')},},
  ];

 export const DATOS_USUARIOS_PRUEBA: Usuario[] = [
    {dni:'10967893',id_usuario: 1, nombre_usuario: 'Juan', tipo_usuario: {id_tipo_usuario:1,nombre:'Socio',descripcion: ''}, fecha_registro: new Date('2021-06-29T00:00:00'),password:'123456789'},
    {dni:'43026985',id_usuario: 2, nombre_usuario: 'Pedro', tipo_usuario: {id_tipo_usuario:2,nombre:'Empleado',descripcion: ''}, fecha_registro: new Date(),password:'123456789'},
    {dni:'12341545',id_usuario: 3, nombre_usuario: 'Lucas', tipo_usuario: {id_tipo_usuario:1,nombre:'Socio',descripcion: ''}, fecha_registro: new Date('2021-06-12T00:00:00'),password:'123456789'},
    {dni:'12315677',id_usuario: 4, nombre_usuario: 'Mateo', tipo_usuario: {id_tipo_usuario:1,nombre:'Socio',descripcion: ''}, fecha_registro: new Date('2021-06-29T00:00:00'),password:'123456789'},
    {dni:'56797456',id_usuario: 5, nombre_usuario: 'Fabian', tipo_usuario: {id_tipo_usuario:1,nombre:'Socio',descripcion: ''}, fecha_registro: new Date('2021-06-12T00:00:00'),password:'123456789'},
    {dni:'54246824',id_usuario: 6, nombre_usuario: 'Matias', tipo_usuario: {id_tipo_usuario:2,nombre:'Empleado',descripcion: ''}, fecha_registro: new Date('2021-06-29T00:00:00'),password:'123456789'},
    {dni:'12957639',id_usuario: 7, nombre_usuario: 'Jeruel', tipo_usuario: {id_tipo_usuario:1,nombre:'Socio',descripcion: ''}, fecha_registro: new Date('2021-06-29T00:00:00'),password:'123456789'},
    {dni:'23802679',id_usuario: 8, nombre_usuario: 'Tuca', tipo_usuario: {id_tipo_usuario:1,nombre:'Socio',descripcion: ''}, fecha_registro: new Date('2021-06-12T00:00:00'),password:'123456789'},
    {dni:'39937696',id_usuario: 9, nombre_usuario: 'Fabrizio', tipo_usuario: {id_tipo_usuario:2,nombre:'Empleado',descripcion: ''}, fecha_registro: new Date('2021-06-12T00:00:00'),password:'123456789'},
  ];

 export const DATOS_PRECIOS_PRUEBA: Precio[] = [
    { id_precio: 1, nombre_precio: 'Hora moto', tipo_vehiculo: { id_tipo_vehiculo: 1, nombre_tipo_vehiculo: 'Moto', descripcion_tipo_vehiculo: '' }, monto_precio: 31.2, cantidad_horas: 1},
    { id_precio: 2, nombre_precio: 'Hora auto', tipo_vehiculo: { id_tipo_vehiculo: 2, nombre_tipo_vehiculo: 'Auto', descripcion_tipo_vehiculo: '' }, monto_precio: 150.2, cantidad_horas: 1 },
    { id_precio: 3, nombre_precio: 'Dia moto', tipo_vehiculo: { id_tipo_vehiculo: 1, nombre_tipo_vehiculo: 'Moto', descripcion_tipo_vehiculo: '' }, monto_precio: 54.2, cantidad_horas: 24 },
    { id_precio: 4, nombre_precio: 'Hora camioneta', tipo_vehiculo: { id_tipo_vehiculo: 3, nombre_tipo_vehiculo: 'Camioneta', descripcion_tipo_vehiculo: '' }, monto_precio: 71.2, cantidad_horas: 1 },
    { id_precio: 5, nombre_precio: '1/2 dia moto', tipo_vehiculo: { id_tipo_vehiculo: 1, nombre_tipo_vehiculo: 'Moto', descripcion_tipo_vehiculo: '' }, monto_precio: 530.2, cantidad_horas: 12 },
    { id_precio: 6, nombre_precio: 'Dia auto', tipo_vehiculo: { id_tipo_vehiculo: 2, nombre_tipo_vehiculo: 'Auto', descripcion_tipo_vehiculo: '' }, monto_precio: 513.2, cantidad_horas: 24 },
    { id_precio: 7, nombre_precio: '2 horas moto', tipo_vehiculo: { id_tipo_vehiculo: 1, nombre_tipo_vehiculo: 'Moto', descripcion_tipo_vehiculo: '' }, monto_precio: 150.2, cantidad_horas: 2 },
    { id_precio: 8, nombre_precio: 'Dia camioneta', tipo_vehiculo: { id_tipo_vehiculo: 3, nombre_tipo_vehiculo: 'Camioneta', descripcion_tipo_vehiculo: '' }, monto_precio: 435.2 , cantidad_horas: 24},
  ];

  export const DATOS_REPORTE_AUDITORIA: Auditoria[] = [
    {patenteVehiculo:'DSU828',dniPropietario:'10967893',tipoVehiculo: 'Auto',colorVehiculo: 'Negro',fechaIngreso:'25/06/2021 15:16',fechaEgreso:'25/06/2021 18:45',montoCobrado:'280,50' },
    {patenteVehiculo:'SDO290',dniPropietario:'12957639',tipoVehiculo: 'Auto',colorVehiculo: 'Azul',fechaIngreso:'23/06/2021 12:21',fechaEgreso:'23/06/2021 18:45',montoCobrado:'239,50' },
    {patenteVehiculo:'WEOP20',dniPropietario:'34982843',tipoVehiculo: 'Moto',colorVehiculo: 'Rojo',fechaIngreso:'25/06/2021 09:20',fechaEgreso:'25/06/2021 20:45',montoCobrado:'340,50' },
    {patenteVehiculo:'DJW209',dniPropietario:'23802679',tipoVehiculo: 'Moto',colorVehiculo: 'Negro',fechaIngreso:'12/06/2021 23:16',fechaEgreso:'13/06/2021 20:45',montoCobrado:'1020,50' },
    {patenteVehiculo:'DJK489',dniPropietario:'23018640',tipoVehiculo: 'Auto',colorVehiculo: 'Gris',fechaIngreso:'25/06/2021 15:16',fechaEgreso:'25/06/2021 18:45',montoCobrado:'1209,50' },
    {patenteVehiculo:'PWE849',dniPropietario:'54929383',tipoVehiculo: 'Moto',colorVehiculo: 'Verde',fechaIngreso:'25/06/2021 15:16',fechaEgreso:'25/06/2021 18:45',montoCobrado:'854,50' },
    {patenteVehiculo:'DSO489',dniPropietario:'42094772',tipoVehiculo: 'Moto',colorVehiculo: 'Negro',fechaIngreso:'25/06/2021 15:16',fechaEgreso:'25/06/2021 18:45',montoCobrado:'342,50' },
    {patenteVehiculo:'DSR820',dniPropietario:'29305978',tipoVehiculo: 'Camioneta',colorVehiculo: 'Rojo',fechaIngreso:'25/06/2021 15:16',fechaEgreso:'25/06/2021 18:45',montoCobrado:'954,50' },
    {patenteVehiculo:'WDH482',dniPropietario:'43026985',tipoVehiculo: 'Auto',colorVehiculo: 'Azul',fechaIngreso:'25/06/2021 15:16',fechaEgreso:'25/06/2021 18:45',montoCobrado:'743,50' },
    {patenteVehiculo:'WEI402',dniPropietario:'23746839',tipoVehiculo: 'Auto',colorVehiculo: 'Verde',fechaIngreso:'25/06/2021 15:16',fechaEgreso:'25/06/2021 18:45',montoCobrado:'543,50' },
    {patenteVehiculo:'TRI492',dniPropietario:'23918627',tipoVehiculo: 'Camioneta',colorVehiculo: 'Gris',fechaIngreso:'25/06/2021 15:16',fechaEgreso:'25/06/2021 18:45',montoCobrado:'193,50' },

  ];

  export const TIPO_VEHICULO_MOTO: string = 'Moto';
  export const TIPO_VEHICULO_AUTO: string = 'Auto';
  export const TIPO_VEHICULO_CAMIONETA: string = 'Camioneta';

  export const TIPO_PERSONA_SOCIO: string = 'Socio';
  export const TIPO_PERSONA_EMPLEADO: string = 'Empleado';



 
  