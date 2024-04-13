import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANT } from 'src/app/constant/constant';

@Injectable({
  providedIn: 'root'
})
export class ApiProductoService {
  dataRequest:any;
  url = CONSTANT.URL_API;
  constructor(private http:HttpClient) { }

  buscarProducto(q:string): Observable<any>{  
    console.log(q)
    this.dataRequest ={
      "sDataSearch":q
    }
  
    return this.http.post(`${this.url}/productos/getProductos.php`,this.dataRequest);
  }
 
  agregarProducto(dataProducto:any): Observable<any>{  
    console.log(dataProducto)
    this.dataRequest ={
      "dataProducto":dataProducto
    }
  
    return this.http.post(`${this.url}/productos/alta.php`,this.dataRequest);
  }
}
