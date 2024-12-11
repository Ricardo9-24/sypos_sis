import { Injectable } from '@angular/core';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }
  singOut(){
    window.sessionStorage.clear();
    window.localStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    // const user = window.sessionStorage.getItem(USER_KEY);
    const user = window.localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public saveCaja(caja:any):void{
    window.sessionStorage.setItem('dataCaja', JSON.stringify(caja));
  }

  public removeCaja(){
    window.sessionStorage.removeItem('dataCaja');
  }

  public getCaja(): any {
    const caja = window.sessionStorage.getItem('dataCaja')
    if (caja) {
      return JSON.parse(caja);
    }
    return {};
  }

  public saveAperturaCaja(apertura:Boolean){
    let aperturaCaja = {
      "apertura" : apertura
    }
    window.sessionStorage.setItem('apertura', JSON.stringify(aperturaCaja));
  }

  public getAperturaCaja(): any{
    const apertura = window.sessionStorage.getItem('apertura');
    
    if (apertura) {
      return JSON.parse(apertura)
    }
    return {};
  }
}
