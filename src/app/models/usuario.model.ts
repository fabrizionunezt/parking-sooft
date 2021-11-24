export class Usuario{
    dni: string = '';
    id_usuario: number = 0;
    tipo_usuario: TipoUsuario = new TipoUsuario();
    fecha_registro: Date = new Date();
    nombre_usuario: string = '';
    password?: string = '';
}
export class TipoUsuario{
    id_tipo_usuario:number = 0;
    nombre:string = '';
    descripcion: string = '';
}