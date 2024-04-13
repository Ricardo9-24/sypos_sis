export class Producto{
    constructor(
        public nClave?:string,
        public nIdClasificacion?:number,
        public nIdProducto?:number,
        public nIdMarca?:number,
        public nIdModelo?:number,
        public nIdUnidadMedida?:number,
        public nPrecioCompra?:number,
        public nPrecioVenta?:number,
        public nStock?:number,
        public nomProducto?:string,
        public sDescripcion?:string,
        public sClasificacion?:string,
        public sImagen?:string,
        public sMarca?:string,
        public nCantidad?:number,
        public nFormaPago?:number,

    ){}
}