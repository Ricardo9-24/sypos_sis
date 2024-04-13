export class CortesCaja{
    constructor(
        public nTipo?:number, // 1-Apertura,   2-Corte
        public idCaja?:number,
        public idSucursal?:number,
        public idUsuario?:number,
        public usuario?:string,
        public fecha?:string,
        public turno?:string,
        public montoInicial?:number,
        public efectivoCaja?:number,
        public efectivoCalculado?:number,
        public efectivoDiferencia?:number,
        public tarjetaCaja?:number,
        public tarjetaCalculado?:Number,
        public tarjetaDiferencia?:number,
        public totalCorteCaja?:number,
        public totalCorteCalculado?:number,
        public totalCorteDiferencia?:number,
        public retiroEfectivo?:number,
        public retiroTarjeta?:number,
        public retiroTotal?:number,
    ){}
}