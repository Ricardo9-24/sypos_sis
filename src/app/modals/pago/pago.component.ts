import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventManager } from '@angular/platform-browser';
import { Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  dataProducto = new Producto('',0,0,0,0,0,0.00,0.00,0,'-----','','','../../../assets/img/anadir-al-carrito.png','-----',0,1)
  metTarjeta:boolean = false;
  metEfectivo:boolean = true;
  metTransfer:boolean = false;
  nFormaPago:number = 2;
  nTotalCompra:number = 0;
  nCambio:string = "0.00";
  montoReferencia:string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
      private eventManager:EventManager,
      public dialog:MatDialog,
      public dialogRef:MatDialogRef<Component>) {
    console.log(data)
    console.log(data.length)
    if (data.monto > 0) {
      this.nTotalCompra = data.monto;
    }
    this.dataProducto.nCantidad = 1;
    this.dataProducto.nFormaPago = 2;

    const removeGlobalEventListenerkey = this.eventManager.addGlobalEventListener(
      'document',
      'keydown',
      (ev:any) => {
        // console.log(ev.key)
        if (ev.key == 'Enter') {
          // console.log("enter")
          
          this.pagar()
          this.dialogRef.close(this.dataProducto)
        }
      }
    );
   }

  ngOnInit(): void {
  }
  
  pagar(){
    this.dialog.closeAll()
  }

  elegirMetodoPago(metodo:number){
    console.log(metodo)
    this.dataProducto.nFormaPago = metodo
    if (metodo == 1) {
      this.metTarjeta = true;
      this.metEfectivo = false;
      this.metTransfer = false;
    } else if(metodo == 2) {
      this.metTarjeta = false;
      this.metEfectivo = true;
      this.metTransfer = false;
    } else if(metodo == 3) {
      this.metTarjeta = false;
      this.metEfectivo = false;
      this.metTransfer = true;
    }
    console.log(this.dataProducto)
  }

  obtenerCambio(numero:any){
    console.log(this.montoReferencia)
    console.log(numero)
    const cambio = numero - this.nTotalCompra
    this.nCambio = String(cambio)
  }

}
