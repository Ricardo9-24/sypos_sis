import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { finalize, Observable, Subscription } from 'rxjs';
import { CONSTANT } from 'src/app/constant/constant';
import { UploadFileService } from 'src/app/services/uploadFile/upload-file.service';

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.component.html',
  styleUrls: ['./alta-producto.component.css']
})
export class AltaProductoComponent implements OnInit {
  private baseUrl = CONSTANT.URL_API;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  // message = '';
  // selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  messages = '';
  fileName = '';
  uploadProgress:number =0;
  uploadSub: Subscription = new Subscription;
  fileInfos?: Observable<any>;
  progressInfo:any [] = [];
  selectedFile: boolean = false;

  constructor(private uploadService: UploadFileService, private http:HttpClient) { }

    ngOnInit(): void {
      // this.fileInfos = this.uploadService.getFiles();
      // console.log(this.fileInfos)    
    }
 
    //Nuevo metodo para subir archivos
    SelectFiless(event:any) {
      this.progressInfo = [];
      event.target.files.length == 1 ? this.fileName = event.target.files[0].name : this.fileName = event.target.files.length + " archivos";
      this.selectedFiles = event.target.files;
      this.selectedFile = event;
      let imageB64:any
      let listFileSelec: any[] = []
      // let reader = new FileReader();
      let files = event.target.files;
      let file;
      
      for (let i = 0; i < files.length; i++) {
        
        var reader = new FileReader();
        file = files [i];
        let _file = 'C:\\fakepath\\'+file.name;
        reader.onload = (file) => {
        }
        reader.readAsDataURL(file)
      }
    }
  
    UploadFiless() {
      this.messages = '';
      if (this.selectedFiles) {
        for (let i = 0; i < this.selectedFiles.length; i++) {
          this.uploaded(i, this.selectedFiles[i]);
        }
      }
    }

    public async uploaded(index:number, file:any) {

      console.log(file);
      
      this.progressInfo[index] = { value: 0, fileName: file.name };
      this.message = [];
      const reader = new FileReader();
      if(file) {
        
        // const [files] = file.target.files;
        
        let _file = 'C:\\fakepath\\'+file.name;
        let nombre =file.name;
        reader.readAsDataURL(file);
        // reader.onload = () => {
        //   // this.imageSrc = reader.result as string;
        //   // this.listFileSelec.push({'file':reader.result});
        //   this.imgBase64 = reader.result
        //   this.listFiles.push({'fileSource':reader.result,'anotaciones':anotaciones,'nombre':nombre,'file':_file})
        //   this.myForm.patchValue({
        //     fileSource: reader.result
        //   });
        // };
      }
      
        await this.uploadService.uploadProducto(file).subscribe(
          async (event:any) => {
            if (event.type === HttpEventType.UploadProgress) {
              console.log(event);
              this.progressInfo[index].value = Math.round(100 * event.loaded / event.total);
              const msg = 'Archivo subido exitosamente: ' + file.name;
              this.message.push(msg);
              console.log(this.progressInfo)
            } else if (event instanceof HttpResponse) {
              console.log(event);
              if (true) {
                
                
              }
              // this.fileInfos = this.uploadFilesService.getFiles();
            }
          },
          err => {
            this.progressInfo[index].value = 0;
            this.messages = 'No se puede subir el archivo ' + file.name;
        });
      
      
    
  }



  reset() {
    this.uploadProgress = 0;
    this.uploadSub.unsubscribe();
  }

  //Metodos funcionales pero reemplazadas en una modificacion

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  selectFiles(event:any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;    
  }

  uploadFiles(): void {
    this.message = [];
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  upload(idx: number, file: File): void {
    
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    if (file) {
      
      let form = new FormData();
      let num = 0;
      form.append('file',file);
      let fileNG:any;
      form.forEach(file => {
    
        fileNG = file;
      });
      

      const upload = this.http.post(`${this.baseUrl}/productos/uploadProductos.php`,form,{
        responseType:'json',
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        finalize(() => this.reset())
      );

      this.uploadSub = upload.subscribe((event:any) => {
        // console.log(event)
        if (event.type == HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          console.log(this.progressInfo)
        }else
        if (event instanceof HttpResponse) {
          this.message = [];
          console.log(event)
          if(event.status == 200){
            const msg = 'Archivo subido exitosamente: ' + file.name;
            this.message.push(msg);
            // this.fileInfos = this.uploadService.getFiles();
          }
        }
        
      },(err: any) => {
            
        this.progressInfos[idx].value = 0;
        const msg = 'No se pudo cargar el archivo: ' + file.name;
        this.message.push(msg);
        // this.fileInfos = this.uploadService.getFiles();
      });

    }
  }


}
