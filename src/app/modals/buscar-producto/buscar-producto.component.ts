import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { ApiProductoService } from 'src/app/services/apiProducto/api-producto.service';
import { Account } from './Account';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, UntypedFormGroup } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged, finalize, map, Observable } from 'rxjs';

@Component({
  selector: 'app-buscar-producto',
  styleUrls: ['./buscar-producto.component.css'],
  templateUrl: './buscar-producto.component.html',
  // template: `
  //   <app-generic-select
  //     [availableItems]="availableAccounts"
  //     [control]="accountControl"
  //     [itemSearchFields]="['nClave', 'nomProducto']"
  //     [printContent]="accountText"
  //   >
  //   </app-generic-select>
  //   {{ accountForm.value | json }}
  // `
})
export class BuscarProductoComponent implements OnInit {
  accountForm = new UntypedFormGroup({});
  
  dataProducto = new Producto("",0,0,0,0,0,0.00,0.00,0,'-----','','','../../../assets/img/anadir-al-carrito.png','-----',0,1)
  accounts:any;
  sData:any = [];
  Toast:any = Swal;
  availableAccounts: Account[] = [];
  searchTerm$ = new BehaviorSubject<string>('');
  listFiltered$: Observable<any[]> | undefined;
  isLoading = false;
  ocultarBuscador:boolean = false;
  
  constructor(private apiProducto:ApiProductoService) { 
  }

  ngOnInit(): void {
    this.apiProducto.buscarProducto("").subscribe(result => { //Listar select de busqueda
      console.log(result)
      this.sData = result
      this.accounts = result.sData
      this.accounts.nCantidad = 1
    });

    this.filterList();
  }

  get accountControl(): FormControl {
    return this.accountForm.get("accounts") as FormControl;
  }
  
  accountText = (item: any): string => {
    console.log(item)
    return item.nClave + " - " + item.nomProducto;
  };

  filterList(): void {
   
    this.listFiltered$ = this.searchTerm$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map(term => {
          
          console.log(term);
          // console.log(this.sData);
          console.log(this.sData.sData);
          if (this.sData.sData != undefined) {
            this.isLoading = true;
            this.ocultarBuscador = false
            console.log(this.isLoading)
            return this.sData.sData.filter((item: any) => 
              item.nomProducto.toLowerCase().indexOf(term.toLowerCase()) > 0
              
            );
          }
        }),
        finalize(() =>
          this.isLoading = false
        )
        );
        

      console.log(this.isLoading)
  }

  selectProducto(producto:any){
    console.log(producto)
    
    // this.dataProducto = producto
    // this.dataProducto.nCantidad = 1
    this.ocultarBuscador= true
    this.dataProducto = producto
    this.dataProducto.nCantidad = 1
    
    
    // if (this.rowData.length > 0) {
    //   console.log(this.rowData)
    //   this.rowData.map(row =>{
    //     if (producto.nIdProducto == row.nIdProducto) {
    //       row.nCantidad = Number(row.nCantidad) + 1;
    //       this.addCarrito = false
    //     }
    //     return row
    //   })
    //   console.log(this.addCarrito)
    //   if (this.addCarrito && Number(this.dataProducto.nIdProducto) > 0) {
    //     this.rowData.push(this.dataProducto)
    //       this.gridApi.setRowData(this.rowData) 
    //   }
    //   console.log(this.rowData)
    //   var duplicados:any = {};
    //   this.rowData = this.rowData.filter(function(current) { //Eliminar duplicados
    //     var exists = !duplicados[Number(current.nIdProducto)];
    //     duplicados[Number(current.nIdProducto)] = true;
    //     return exists;
    //   });
    //   console.log(this.rowData)
    // }else{
    //   if (Number(this.dataProducto.nIdProducto) > 0) { 
    //     this.rowData.push(this.dataProducto)
    //     this.gridApi.setRowData(this.rowData)
    //   }
    // }


    
  }

  seleccionarProducto(event: any) {
    // this.sData = event;
    // console.log(this.sData)
    this.dataProducto = event
    this.dataProducto.nCantidad = 1
  }

  validarSeleccion(e:any){
    e.stopPropagation()
    // console.log(this.dataProducto)
    if(this.dataProducto.nIdProducto == 0 || this.dataProducto.nCantidad == 0){
      Swal.fire({
        icon:'warning',
        title:'Selecciona una cantidad',
        showConfirmButton:true
      })
      return false;
    }else{
      return true;
    }
  }

}
