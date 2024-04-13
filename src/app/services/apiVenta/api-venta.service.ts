import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANT } from 'src/app/constant/constant';
import { CortesCaja } from 'src/app/models/corteCaja.model';


@Injectable({
  providedIn: 'root'
})
export class ApiVentaService {
  dataRequest:any
  url = CONSTANT.URL_API
  constructor(private http:HttpClient) { }

  agregarVenta(dataVenta:any): Observable<any>{
    
    return this.http.post(`${this.url}/venta/agregar.php`,dataVenta)
  }
  
  selectVenta(idVenta:number): Observable<any>{
    this.dataRequest = {
      "idVenta":idVenta
    }
    console.log(this.dataRequest)
    return this.http.post(`${this.url}/venta/selectAll.php`,this.dataRequest)
  }
  
  agregarVentaDetalle(dataVentaDetalle:any): Observable<any>{

    return this.http.post(`${this.url}/venta/agregarDetalle.php`,dataVentaDetalle)
  }

  insertCorteCaja(dataCaja:CortesCaja): Observable<any>{
    console.log(dataCaja)
    this.dataRequest = {

    }
    return this.http.post(`${this.url}/venta/corteCaja.php`, dataCaja)
  }
}
