import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANT } from 'src/app/constant/constant';

@Injectable({
  providedIn: 'root'
})
export class ApiCatologoService {
  dataRequest:any;
  url = CONSTANT.URL_API;
  constructor(private http:HttpClient) { }

  getMarca(): Observable<any>{  
    this.dataRequest ={ "idCatalogo":1 }
  
    return this.http.post(`${this.url}/catalogo/getCatalogo.php`,this.dataRequest);
  }
  getModelo(): Observable<any>{  
    this.dataRequest ={ "idCatalogo":2 }
  
    return this.http.post(`${this.url}/catalogo/getCatalogo.php`,this.dataRequest);
  }
  getClasificacion(): Observable<any>{  
    this.dataRequest ={ "idCatalogo":3 }

    return this.http.post(`${this.url}/catalogo/getCatalogo.php`,this.dataRequest);
  }
  getUnidadMedida(): Observable<any>{  
    this.dataRequest ={ "idCatalogo":4 }

    return this.http.post(`${this.url}/catalogo/getCatalogo.php`,this.dataRequest);
  }
  
  getSucursal(idSucursal:number): Observable<any>{  
    this.dataRequest ={ "idSucursal":idSucursal }

    return this.http.post(`${this.url}/catalogo/sucursal.php`,this.dataRequest);
  }
  
  getCaja(idCaja:number,idSucursal:number): Observable<any>{  
    this.dataRequest ={ 
      "idCaja":idCaja,
      "idSucursal":idSucursal 
    }

    return this.http.post(`${this.url}/catalogo/caja.php`,this.dataRequest);
  }
}
