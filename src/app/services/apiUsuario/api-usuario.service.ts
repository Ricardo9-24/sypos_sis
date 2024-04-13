import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANT } from 'src/app/constant/constant';

@Injectable({
  providedIn: 'root'
})
export class ApiUsuarioService {
  dataRequest:any;
  url = CONSTANT.URL_API;
  constructor(private http:HttpClient) { }

  login(user:string, password:string):Observable<any>{
    this.dataRequest = {
      'usuario' :user,
      'password' : password
    }

    return this.http.post(`${this.url}/usuario/login.php`,this.dataRequest)
  }

  validaPermiso(sContrasenia:string):Observable<any>{
    this.dataRequest = {
      'sContrasenia':sContrasenia
    }
    return this.http.post(`${this.url}/usuario/validaOperacion.php`,this.dataRequest);
  }

  getIP():Observable<any>{
    let param = new HttpParams().set('format', 'json')
    this.dataRequest = {
      'format':'json'
    }
    return this.http.get('https://api.ipify.org',{
      params : new HttpParams().set('format', 'json')
    });
  }
}
