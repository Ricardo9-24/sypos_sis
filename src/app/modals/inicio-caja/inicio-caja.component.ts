import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DateAdapter, ErrorStateMatcher, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { BottomSheetComponent } from 'src/app/components/bottom-sheet/bottom-sheet.component';
import { CortesCaja } from 'src/app/models/corteCaja.model';
import { ApiCatologoService } from 'src/app/services/apiCatalogo/api-catologo.service';
import { ApiVentaService } from 'src/app/services/apiVenta/api-venta.service';
import { TokenStorageService } from 'src/app/services/tokenStorage/token-storage.service';
import Swal from 'sweetalert2';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-inicio-caja',
  templateUrl: './inicio-caja.component.html',
  styleUrls: ['./inicio-caja.component.css']
})
export class InicioCajaComponent implements OnInit {
  // corteCaja = new CortesCaja(0,0,0,0,"","","",0,0,0,0,0,0,0,0,0,0,0,0,0);
  corteCaja = new CortesCaja();

  hide= true;
  apertura:boolean = false;
  corte:boolean = true;
  
  dataSucursales:any;
  dataCaja:any;

  selectedValue: string = "";
  selectedCar: string = "";
  titulo:string = "";
  tituloBtn:string = "";
  tituloBtnCancel:string = "";
  
  constructor(
      private _adapter: DateAdapter<any>,
      @Inject(MAT_DATE_LOCALE) private _locale: string,
      private _bottomSheet:MatBottomSheet,
      public dialog:MatDialog,
      private apiCatalogo:ApiCatologoService,
      private storage:TokenStorageService,
      private apiVenta:ApiVentaService,
      private tokenStorage:TokenStorageService
  ) {
    moment.locale("es");
    
    const userData = this.storage.getUser();
    const dataCaja = this.storage.getCaja();
    
    const fecha = moment().format("LL");
    let hora = moment().format("h");
    
    if (Number(hora) > 0  && Number(hora) < 14) {
      this.corteCaja.turno = "Matutino";
    } else if(Number(hora) > 14 && Number(hora) < 24){
      this.corteCaja.turno = "Vespertino"
    }
    this.corteCaja.idUsuario = userData[0].nIdUsuario;
   
    
    this.apiCatalogo.getSucursal(0).subscribe(result => {
      // console.log(result)
      if (result.nCodigoError == 0) {
        this.dataSucursales = result.sData;
      }
    })
    
    this.apiCatalogo.getCaja(0,0).subscribe(result => {
      // console.log(result)
      if (result.nCodigoError == 0) {
        this.dataCaja = result.sData;
      }
    })
    
    console.log(dataCaja);
    let montoInicial = String(dataCaja.montoInicial);
    console.log(this.corteCaja.montoInicial)
    console.log(montoInicial)
    console.log(parseFloat(dataCaja.montoInicial).toFixed(2))
    if (dataCaja.nTipo == 1) {
      this.titulo = "Cierre";
      this.tituloBtn = "CIERRE";
      this.tituloBtnCancel = "CANCELAR";
      this.corteCaja.nTipo = 2;
      this.corteCaja.idCaja = dataCaja.idCaja;
      this.corteCaja.idSucursal = dataCaja.idSucursal;
      this.corteCaja.turno = dataCaja.turno;
      this.corteCaja.montoInicial = dataCaja.montoInicial;
      this.corteCaja.fecha = dataCaja.fecha;
      this.corteCaja.usuario = dataCaja.usuario;
      this.corteCaja.efectivoCalculado = 23;
      this.corteCaja.tarjetaCalculado = 53;
    }else{
      // console.log(this.apertura)
      this.titulo = "Apertura";
      this.tituloBtn = "INICIAR";
      this.tituloBtnCancel = "MÁS ADELANTE";
      this.corteCaja.usuario = userData[0].sNombre + " " + userData[0].sApellido + " -- Cajero";
      this.corteCaja.nTipo = 1;
      this.corteCaja.fecha = fecha;
      this.corteCaja.idCaja = 1;
      this.corteCaja.idSucursal = 1;
      
      // this.corteCaja.turno = "Matutino";

    }
    console.log(Number(this.corteCaja.tarjetaCaja))
    console.log(Number(this.corteCaja.tarjetaCalculado))

    this.corteCaja.efectivoDiferencia = (Number(isNaN(Number(this.corteCaja.efectivoCaja)) ? 0 : Number(this.corteCaja.efectivoCaja)) - Number(isNaN(Number(this.corteCaja.efectivoCalculado)) ? 0 : Number(this.corteCaja.efectivoCalculado))); //Diferencia caja tarjeta
    this.corteCaja.tarjetaDiferencia = (Number(isNaN(Number(this.corteCaja.tarjetaCaja)) ? 0 : Number(this.corteCaja.tarjetaCaja)) - Number(isNaN(Number(this.corteCaja.tarjetaCalculado)) ? 0 : Number(this.corteCaja.tarjetaCalculado))); //Diferencia caja tarjeta
    this.corteCaja.totalCorteCaja = (Number(isNaN(Number(this.corteCaja.efectivoCaja)) ? 0 : Number(this.corteCaja.efectivoCaja)) + Number(isNaN(Number(this.corteCaja.tarjetaCaja)) ? 0 : Number(this.corteCaja.tarjetaCaja))); //Diferencia caja tarjeta
    
    
    this.corteCaja.totalCorteCalculado = (Number(this.corteCaja.efectivoCalculado) + Number(this.corteCaja.tarjetaCalculado)); //Total calculado 
    this.corteCaja.totalCorteDiferencia = (Number(this.corteCaja.efectivoDiferencia) + Number(this.corteCaja.tarjetaDiferencia) ); //Total diferencia

    this.corteCaja.retiroEfectivo = this.corteCaja.totalCorteCaja;
  }

  ngOnInit(): void {
    this._locale = 'es';
    this._adapter.setLocale(this._locale);
    this.corteCaja.idCaja = 1;
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent);
  }

  CorteCaja(){
    console.log(this.corteCaja);
    console.log(this.apertura);
    const alert =  Swal.fire({
      icon:'warning',
      title: 'Faltan datos por capturar'
    })

    if(this.corte){//Si es la Apertura de caja
      console.log(this.corte)
      if (Number(this.corteCaja.montoInicial) > 0 && Number(this.corteCaja.idSucursal) > 0 && Number(this.corteCaja.idCaja) > 0) {
        this.corteCaja.nTipo = 1;
        this.apiVenta.insertCorteCaja(this.corteCaja).subscribe(result =>{
          console.log(result)
          if (result.nCodigoError == 0) {
            this.corte = false;
            this.apertura = true;
            console.log(this.apertura)
            console.log(this.corte)
            this.storage.saveCaja(this.corteCaja);
            Swal.fire({
              icon: 'success',
              title: 'Operacion Exitosa!'
            }).then(() => {
              let apertura = true;
              this.tokenStorage.saveAperturaCaja(apertura);
              this.dialog.closeAll();
            })
          }
        })
      }else{
        alert
      }
    }else if(this.apertura) { //Si es Cierre
      if(Number(this.corteCaja.montoInicial) > 0 && Number(this.corteCaja.totalCorteCaja) > 0 && (Number(this.corteCaja.efectivoCaja) > 0 || Number(this.corteCaja.tarjetaCaja) > 0)) {
        this.corteCaja.nTipo = 2;
        this.apiVenta.insertCorteCaja(this.corteCaja).subscribe(result =>{
          console.log(result)
          if (result.nCodigoError == 0) {
            this.corte = false;
            this.apertura = true;
              this.storage.removeCaja()
          }
        })
      }else{
        alert
      }
    }else{
      alert
    }
  }

  cajaTotal(caja:any){
    console.log(caja.target.name)
    this.corteCaja.tarjetaDiferencia = (Number(isNaN(Number(this.corteCaja.tarjetaCaja)) ? 0 : Number(this.corteCaja.tarjetaCaja)) - Number(isNaN(Number(this.corteCaja.tarjetaCalculado)) ? 0 : Number(this.corteCaja.tarjetaCalculado))); //Diferencia caja tarjeta
    this.corteCaja.efectivoDiferencia = (Number(isNaN(Number(this.corteCaja.efectivoCaja)) ? 0 : Number(this.corteCaja.efectivoCaja)) - Number(isNaN(Number(this.corteCaja.efectivoCalculado)) ? 0 : Number(this.corteCaja.efectivoCalculado))); //Diferencia caja tarjeta
    this.corteCaja.totalCorteCaja = (Number(isNaN(Number(this.corteCaja.efectivoCaja)) ? 0 : Number(this.corteCaja.efectivoCaja)) + Number(isNaN(Number(this.corteCaja.tarjetaCaja)) ? 0 : Number(this.corteCaja.tarjetaCaja))); //Diferencia caja tarjeta
    
    
    this.corteCaja.totalCorteCalculado = (Number(this.corteCaja.efectivoCalculado) + Number(this.corteCaja.tarjetaCalculado)); //Total calculado 
    this.corteCaja.totalCorteDiferencia = (Number(this.corteCaja.efectivoDiferencia) + Number(this.corteCaja.tarjetaDiferencia) ); //Total diferencia

    // this.corteCaja.retiroEfectivo = this.corteCaja.efectivoCaja;
    this.corteCaja.retiroTotal = (Number(this.corteCaja.retiroEfectivo) + Number(isNaN(Number(this.corteCaja.retiroTarjeta)) ? 0 : Number(this.corteCaja.retiroTarjeta)))
  
  }
  
  retiroCaja(caja:any){
    console.log(caja.target.name)
    
    if (caja.target.name == 'retiroEfectivo')
      if (Number(this.corteCaja.retiroEfectivo) > Number(this.corteCaja.efectivoCaja))
        this.corteCaja.retiroEfectivo = this.corteCaja.efectivoCaja
    
    if (caja.target.name == 'retiroTarjeta')
      if (Number(this.corteCaja.retiroTarjeta) > Number(this.corteCaja.tarjetaCaja))
        this.corteCaja.retiroTarjeta = this.corteCaja.tarjetaCaja
    
    this.corteCaja.retiroTotal = (Number(this.corteCaja.retiroEfectivo) + Number(isNaN(Number(this.corteCaja.retiroTarjeta)) ? 0 : Number(this.corteCaja.retiroTarjeta)))
  }

  masAdelante(){
    let apertura = false;
    this.tokenStorage.saveAperturaCaja(apertura);
  }
}
