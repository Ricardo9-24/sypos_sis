import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from 'src/app/models/producto.model';
import { ApiCatologoService } from 'src/app/services/apiCatalogo/api-catologo.service';
import { ApiProductoService } from 'src/app/services/apiProducto/api-producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mod-producto',
  templateUrl: './mod-producto.component.html',
  styleUrls: ['./mod-producto.component.css']
})
export class ModProductoComponent implements OnInit {
  [x: string]: any;
  producto = new Producto();
  dataPostRecib:boolean = false;
  response:boolean = false;
  Toast:any = Swal
  dataPost:any
  listMarcas:any
  listModelo:any
  listClasificacion:any
  listUnidadMedida:any
  imageSrc: string = "";
  txtbutton:String = "Agregar";
  txtDisable:boolean = false; //Para habilitar los botones que al editar se deshabilitan
  myForm = new UntypedFormGroup({
    nOpcion: new UntypedFormControl('1'),
    idProducto: new UntypedFormControl(''),
    clave: new UntypedFormControl({value:'', disabled: this.txtDisable}, [Validators.required]),
    nombre: new UntypedFormControl('', [Validators.required]),
    descripcion: new UntypedFormControl('', [Validators.required]),
    idMarca: new UntypedFormControl({value:'', disabled: this.txtDisable}, [Validators.required]),
    idModelo: new UntypedFormControl({value:'', disabled: this.txtDisable}, [Validators.required]),
    idClasificacion: new UntypedFormControl('', [Validators.required]),
    idUnidadMedida: new UntypedFormControl('', [Validators.required]),
    cantidad: new UntypedFormControl('', [Validators.required]),
    precioCompra: new UntypedFormControl({value:'', disabled: this.txtDisable}, [Validators.required]),
    precioVenta: new UntypedFormControl('', [Validators.required]),
    file: new UntypedFormControl(''),
    fileSource: new UntypedFormControl(''),
  });


  constructor(@Inject(MAT_DIALOG_DATA) public data:any, public dialog:MatDialog, public apiCatalogo:ApiCatologoService, private apiProducto:ApiProductoService) {
    // console.log(data);
    if (data.sData){
      this.dataPost = data.sData;
      // Deshabilitar botones que no se deben editar
      this.myForm.controls['clave'].disable();
      this.myForm.controls['idMarca'].disable();
      this.myForm.controls['idModelo'].disable();
      this.myForm.controls['precioCompra'].disable();
      
      this.producto.nIdProducto = this.dataPost.nIdProducto
      this.producto.nClave = this.dataPost.nClave
      this.producto.nomProducto = this.dataPost.nomProducto
      this.producto.sDescripcion = this.dataPost.sDescripcion
      this.producto.nIdMarca = this.dataPost.nIdMarca
      this.producto.nIdModelo = this.dataPost.nIdModelo
      this.producto.nIdClasificacion = this.dataPost.nIdClasificacion
      this.producto.nIdUnidadMedida = this.dataPost.nIdUnidadMedida
      this.producto.nCantidad = this.dataPost.nStock
      this.producto.nPrecioCompra = this.dataPost.nPrecioCompra
      this.producto.nPrecioVenta = this.dataPost.nPrecioVenta
      this.producto.nIdUnidadMedida = this.dataPost.nIdUnidadMedida
      this.producto.sImagen = this.dataPost.sImagen
      this.imageSrc = this.dataPost.sImagen
      this.myForm.patchValue({
        fileSource: this.dataPost.sImagen
      });
      console.log(this.dataPost);
      this.txtbutton = "Guardar";

      if (data.sData.sImagen != null && data.sData.sImagen != "" &&  data.sData.sImagen != "../../../assets/img/anadir-al-carrito.png")
        this.dataPostRecib = true;
    }

    apiCatalogo.getMarca().subscribe(result =>{
      if (result.nCodigoError == 0)
        this.listMarcas = result.sData;
    });
    
    apiCatalogo.getModelo().subscribe(result =>{
      if (result.nCodigoError == 0)
        this.listModelo = result.sData;
    });

    apiCatalogo.getClasificacion().subscribe(result =>{
      if (result.nCodigoError == 0)
        this.listClasificacion = result.sData;
    });

    apiCatalogo.getUnidadMedida().subscribe(result =>{ 
      if (result.nCodigoError == 0)
        this.listUnidadMedida = result.sData;
    });

   }

  ngOnInit(): void {
  }

  submit(){
    console.log(this.myForm)
    console.log(this.producto)
    if (this.txtbutton == "Guardar") {
      this.myForm.patchValue({
        nOpcion: 2
      });
    }

    if (this.myForm.valid) {
      this.apiProducto.agregarProducto(this.myForm.value).subscribe(result =>{
        console.log(result)

        if(result.nCodigoError == 0){
          this.response = true;
          this.Toast.fire({
            icon: 'success',
            title: result.sMensajeError
          })
          .then(()=>{
            this.response = true;
            console.log(this.response)
            this.dialog.closeAll()
          })
        }else{
          this.Toast.fire({
            icon: 'warning',
            title: 'Ha ocurrido un error inesperado.'
          })
        }
      })
    }else{
      this.Toast.fire({
        icon: 'warning',
        title: 'Es necesario capturar todos los campos'
      })
    }
  }

  onFileChange(event:any) {
    this.imageSrc = ""
    const reader = new FileReader();
     
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
     
      reader.onload = () => {
        console.log(reader)
        this.dataPostRecib = true
        this.imageSrc = reader.result as string;
        this.myForm.patchValue({
          fileSource: reader.result
        });
      };
    
    }
  }

  selectImagen(){
    console.log("click")
    // this.imageSrc = ""
    this.dataPostRecib = false;
  }

  pegarProducto(event:ClipboardEvent){
    
  }
}
