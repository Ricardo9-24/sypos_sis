import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { CONSTANT } from 'src/app/constant/constant';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private baseUrl = CONSTANT.URL_API;

  constructor(private http: HttpClient) { }

  upload(file: any): Observable<any> {        
    console.log(this.baseUrl)
    console.log(file)
    const req = new HttpRequest('POST', `${this.baseUrl}/productos/uploadProductos.php`, file, {
      reportProgress: true,
      responseType: 'json',
      
    });
    
    // return this.http.request(req);
    return this.http.post(`${this.baseUrl}`,file, {
      reportProgress: true,
      responseType: 'json',
      observe: 'events'
    }).pipe(
      finalize(() => this.reset())
    );

    // return this.http.request(reques);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }

  uploadProducto(file:File):Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('files', file);
    
    const req = new HttpRequest('POST', `${this.baseUrl}/productos/uploadProductos.php`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  reset() {
    
  }
}
