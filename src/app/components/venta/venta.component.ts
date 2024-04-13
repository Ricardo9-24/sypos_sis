import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventManager } from '@angular/platform-browser';
import { SearchProducto } from '../../models/searchProducto.model';
import { currencyFormatter, numberComparator } from 'src/app/utils/formatters';
import { BuscarProductoComponent } from 'src/app/modals/buscar-producto/buscar-producto.component';
import { ApiProductoService } from 'src/app/services/apiProducto/api-producto.service';
import { BtnCellRenderer } from 'src/app/utils/button-cell-renderer.component';
import Swal from 'sweetalert2';
import { TicketComponent } from 'src/app/modals/ticket/ticket.component';
import { BehaviorSubject, finalize, fromEvent, map, Observable, Subject } from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, switchMap} from 'rxjs/operators';
import { Producto } from 'src/app/models/producto.model';
import * as moment from 'moment';
import { CellEditRequestEvent,CellValueChangedEvent, ColDef, GetRowIdFunc, GetRowIdParams, GridApi, GridReadyEvent, } from 'ag-grid-community';
import { PagoComponent } from 'src/app/modals/pago/pago.component';
import { ApiVentaService } from 'src/app/services/apiVenta/api-venta.service';
import ConectorPluginV3 from 'src/app/utils/conectorPluginV3';
import { HttpClient } from '@angular/common/http';
import { CONSTANT } from 'src/app/constant/constant';
import { ApiUsuarioService } from 'src/app/services/apiUsuario/api-usuario.service';
import { TokenStorageService } from 'src/app/services/tokenStorage/token-storage.service';
import { InicioCajaComponent } from 'src/app/modals/inicio-caja/inicio-caja.component';


export interface producto{
  nIdClasificacion:number;
  nIdProducto:number;
  nPrecioVenta:number;
  nStock:number;
  nomProducto:string;
  sClasificacion:string;
  sImagen:string;
  sMarca:string;
  nCantidad:number;
}

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  url = CONSTANT.URL_API;
  rowDataClicked = {};
  // @HostListener('document:click', ['$event'])
  searchProducto = new SearchProducto();
  dataProducto = new Producto
  
  pTotal:number = 0;
  pSubTotal:number = 0;
  pIVA:number = 0;
  
  isShift: boolean = false
  addCarrito:boolean = true
  ocultarBuscador:boolean = false //Mostrar y Ocultar el div de busqueda
  isLoading = false;
  btnPagar:boolean = true;
  bCaja:number = 0;
  dataSearch:any
  rowData: Producto[] = [];
  dProducto: Producto[] = [];
  listFiltered = [];
  datProducto:any;
  searchTerm$ = new BehaviorSubject<string>('');
  data$:any
  // searchValue$:any
  productsListSearch:any
  fechaActual:any
  language:any
  public src:string = "";
  public overlayNoRowsTemplate:any;
  myDate = new Date()
  frameworkComponents: any;
  dataRequest:any;
  searchText: any;
  title = 'thermal-printer-angular';
  impresoras = [];
  impresoraSeleccionada: string = "";
  mensaje: string = "";
  searchBox = document.getElementById('filter-text-box') as HTMLInputElement;
  
  searchTerms = new Subject<string>();

  // OBTENER EL EVENTO CLICK
  @HostListener('click')
  clickInside() { 
    console.log("click inside");
    if (this.ocultarBuscador == false) {
      this.ocultarBuscador = true
      this.searchProducto.sDataSearch = ""
    }
  }

  constructor(
        public dialog:MatDialog, 
        private el: ElementRef, 
        private eventManager:EventManager, 
        private apiProducto:ApiProductoService,
        private apiVenta:ApiVentaService,
        private http:HttpClient,
        private apiUsuario:ApiUsuarioService,
        private tokenStorage:TokenStorageService
  ) {
    moment.locale("es");
    this.language = moment.locale("es")
    this.fechaActual = moment(this.myDate).format("D MMMM YYYY"); 
    this.overlayNoRowsTemplate = "<span>Tabla sin registros</span>";

    const removeGlobalEventListenerkey = this.eventManager.addGlobalEventListener(
      'document',
      'keydown',
      (ev:any) => {
        if (ev.key == 'F10') {
          this.buscarProductos()
        }

        // console.log(ev.key)
        // console.log(this.rowData.length)
        if ((ev.key == ' ') && this.rowData.length > 0) {
          this.pagar()
        }
        if (ev.key) {
          // this.pagar()
        }
      }
    );

    this.frameworkComponents = {
      btnCellRenderer: BtnCellRenderer,
    }

    // Evento ESC
    this.eventManager.addGlobalEventListener('window','keyup.esc',()=>{
      // console.log("Cerrar")
      this.dialog.closeAll()
      this.ocultarBuscador = true
      this.searchProducto.sDataSearch = ""
    });

    // this.datProducto = this.apiProducto.buscarProducto("").subscribe(result =>{
    //   if (result.nCodigoError == 0) {
    //     this.datProducto = result.sData
    //   }
    //   console.log(this.datProducto);
    // });


  }

  listFiltered$: Observable<string[]> | undefined;
  // "12345638"
  // motor
  ngOnInit() : void{ 

    const caja = this.tokenStorage.getCaja();
    this.bCaja = Object.keys(caja).length;
    
    console.log(this.bCaja);
  

    // this.searchTerms.pipe(
    //     debounceTime(200),
    //     distinctUntilChanged()
    //   ).subscribe((term:any) => { 
    //     this.ocultarBuscador = false;
    //     console.log(term.target.value);
    //     if (term.target.value != "") { 
    //       // this.data$ = [];
    //       this.isLoading = true;
    //       this.data$ = this.apiProducto.buscarProducto(term.target.value)
    //       .pipe(
    //         map((productos) => productos.sData),
    //         finalize(() => {
    //           this.isLoading = false;
    //           console.log(this.data$.length);
    //           console.log(this.data$);
    //           // this.data$.forEach((ele:any) =>{
    //           //   console.log(ele.length);
    //           //   console.log(ele);
    //           //   if (ele.length = 1) { 
    //           //     this.selectProducto(ele[0])
    //           //   }
    //           // })
              
    //         })
    //         );
    //     }
    //   });

    // this.impresoras = await ConectorPluginV3.obtenerImpresoras();

    // this.impresoraSeleccionada = this.impresoras[0]
  }

  // typeahead = fromEvent(this.searchBox, 'input').pipe(
  //   map(e => (e.target as HTMLInputElement).value),
  //   filter(text => text.length > 2),
  //   debounceTime(10),
  //   distinctUntilChanged(),
  //   switchMap(searchTerm => this.apiProducto.buscarProducto(searchTerm))
  // );

  
  
  // searchProduct(dato:string){
  //   console.log(dato);
  //   const result = this.apiProducto.buscarProducto(dato)
  //       .pipe(
  //         map((productos) => productos.sData),
  //         finalize(() => this.isLoading = false)
  //       );
  //     // console.log(result);
  // }

  search(term: any): void {
    this.searchTerms.next(term);
    // console.log(this.searchTerms);
    
  }

  defaultColDef = {
    flex: 1,
    resizable: true,
  };

  // public getRowId: GetRowIdFunc = (params: GetRowIdParams) => params.data.id;

  // public sortingOrder: ('asc' | 'desc' | null)[] = ['desc', 'asc', null];
  columnDefs = [
    { field: 'nCantidad', width:70, headerName: 'Cantidad',  editable: true},
    { field: 'nClave', width:100, headerName: 'Código'},
    { field: 'nomProducto', width:100, headerName: 'Descripción'},
    { field: 'nStock', width:100, headerName: 'Descuento'},
    { field: 'nStock', width:100, headerName: 'Existencia'},
    {
      field: 'nPrecioVenta', width:100, headerName: 'Precio U.', type: 'centerAligned', comparator: numberComparator,
      valueFormatter: (params: any) => currencyFormatter(params.data.nPrecioVenta, 1, '$',1),
    },
    {
      field: 'nPrecioVenta', width:100, headerName: 'Precio Total', type: 'centerAligned', comparator: numberComparator,
      valueFormatter: (params: any) => currencyFormatter(params.data.nPrecioVenta, params.data.nCantidad, '$',1),
    },
    // {
    //   field: 'boton', headerName: 'Detalle', cellRenderer: "btnCellRenderer",
    //   cellRendererParams: {
    //     onClick: this.eliminarProducto.bind(this),
    //     label: 'Eliminar'
    //   },
    // },
    {
      field: 'checkbox',
      headerName: '',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      // minWidth: 20,
      width:30,
    },
  ]

  // filterList(): void {
  //   this.listFiltered$ = this.searchTerm$
  //     .pipe(
  //       debounceTime(400),
  //       distinctUntilChanged(),
  //       map(term => {
  //           return this.listDeliciousDishes
  //             .filter(item => item.toLowerCase().indexOf(term.toLowerCase()) >= 0);
  //       })
  //     );
  // }

  onkeyup(event:any) {
    console.log(event)
    if (event.keyCode == 16 && event.keyCode == 9) {
      this.isShift = true;
      console.log("On Keyup " + event.keyCode);
    }
  }

  onkeydown(event:any) {
    console.log(event)
    console.log("On KeyDown" + event.keyCode);
  }

  onCellValueChanged(params: CellValueChangedEvent) {
    console.log(params);
    var changedData = [params.data];
    params.api.applyTransaction({ update: changedData });
    this.pTotal = 0;
    this.rowData.forEach((element:any)=>{// Obtener el precio total de los productos seleccionados
      this.pTotal = this.pTotal + (Number(element.nPrecioVenta) * element.nCantidad)
    })
    this.pIVA = (this.pTotal * .16)
    this.pSubTotal = (this.pTotal - this.pIVA)
  }

  searchProductos(datoBusqueda:any): any{
    console.log(datoBusqueda)
    this.ocultarBuscador = false
    // this.isLoading = true;
    console.log(this.isLoading)
    this.data$ = this.apiProducto.buscarProducto(datoBusqueda)
    .pipe(
      map((productos) => productos.sData),
      distinctUntilChanged(),
      debounceTime(1400),
      finalize(() => this.isLoading = false)
    );

      
  }

  getProductos(q:string){
    console.log(q);
    this.dataRequest ={
      "sDataSearch":q
    }
    this.http.post(`${this.url}/productos/getProductos.php`,this.dataRequest)
    .subscribe((result:any) =>
      console.log(result)
    )
  }

  buscarProductos(){
    this.btnPagar = false;
    const dialogRef =  this.dialog.open(BuscarProductoComponent,{
      height:'55%',
      width:'50%',
      data:{
        // "resultDetalle" : "algo"
      },
      disableClose: true
    })
    dialogRef.afterClosed().subscribe(datosBusqueda => {//Obtener producto encontrado en el modal
      this.btnPagar = true;
      if (datosBusqueda != undefined && datosBusqueda.nIdProducto > 0) {
        this.addCarrito = true

        if (this.rowData.length > 0) {
          this.rowData.map(row =>{
            if (datosBusqueda.nIdProducto == row.nIdProducto) {
              row.nCantidad = Number(row.nCantidad) + 1;
              this.addCarrito = false
            }
            return row
          })

          if (this.addCarrito) {
            this.rowData.push(datosBusqueda)
              this.gridApi.setRowData(this.rowData) 
          }
      
          var duplicados:any = {};
          this.rowData = this.rowData.filter(function(current) { //Eliminar duplicados
            var exists = !duplicados[Number(current.nIdProducto)];
            duplicados[Number(current.nIdProducto)] = true;
            return exists;
          });

        }else{
          this.rowData.push(datosBusqueda)
          this.gridApi.setRowData(this.rowData)
        }

        this.pTotal = 0;
        this.rowData.forEach((element:any)=>{// Obtener el precio total de los productos seleccionados
          this.pTotal = this.pTotal + (Number(element.nPrecioVenta) * element.nCantidad)
        })
        this.pIVA = (this.pTotal * .16)
        this.pSubTotal = (this.pTotal - this.pIVA)
      }
      
    })
  }

  selectProducto(producto:any){
    console.log(producto)
    this.addCarrito = true
    this.dataProducto = producto
    this.dataProducto.nCantidad = 1
    this.ocultarBuscador= true
    this.searchProducto.sDataSearch = ""
    
    if (this.rowData.length > 0) {
      console.log(this.rowData)
      this.rowData.map(row =>{
        if (producto.nIdProducto == row.nIdProducto) {
          row.nCantidad = Number(row.nCantidad) + 1;
          this.addCarrito = false
        }
        return row
      })
      console.log(this.addCarrito)
      if (this.addCarrito && Number(this.dataProducto.nIdProducto) > 0) {
        this.rowData.push(this.dataProducto)
          this.gridApi.setRowData(this.rowData) 
      }
      console.log(this.rowData)
      var duplicados:any = {};
      this.rowData = this.rowData.filter(function(current) { //Eliminar duplicados
        var exists = !duplicados[Number(current.nIdProducto)];
        duplicados[Number(current.nIdProducto)] = true;
        return exists;
      });
      console.log(this.rowData)
    }else{
      if (Number(this.dataProducto.nIdProducto) > 0) { 
        this.rowData.push(this.dataProducto)
        this.gridApi.setRowData(this.rowData)
      }
    }

    this.pTotal = 0;
    this.rowData.forEach((element:any)=>{// Obtener el precio total de los productos seleccionados
      this.pTotal = this.pTotal + (Number(element.nPrecioVenta) * element.nCantidad)
      // console.log(this.pTotal)
    })
    this.pIVA = (this.pTotal * .16)
    this.pSubTotal = (this.pTotal - this.pIVA)

    
  }

  pegarProducto(data:ClipboardEvent){
    console.log(data);
    const codigo = data.clipboardData?.getData('text');
    
    this.apiProducto.buscarProducto(String(codigo)).subscribe(result =>{
      console.log(result);
      if (result.nCodigoError == 0 && result.sData.length > 0) {
        this.dataProducto = result.sData[0]
        this.dataProducto.nCantidad = 1
        this.ocultarBuscador = true
        this.searchProducto.sDataSearch = ""
        this.gridApi.sizeColumnsToFit()

        if (this.rowData.length > 0) {
      
          this.rowData.map(row =>{
            if (this.dataProducto.nIdProducto == row.nIdProducto) {
              row.nCantidad = Number(row.nCantidad) + 1;
              this.addCarrito = false
            }
            return row
          })
      
          if (this.addCarrito) {
            this.rowData.push(this.dataProducto)
              this.gridApi.setRowData(this.rowData) 
          }
      
          var duplicados:any = {};
          this.rowData = this.rowData.filter(function(current) { //Eliminar duplicados
            var exists = !duplicados[Number(current.nIdProducto)];
            duplicados[Number(current.nIdProducto)] = true;
            return exists;
          });

        }else{
          this.rowData.push(this.dataProducto)
          this.gridApi.setRowData(this.rowData)
        }
      }
      else{
        Swal.fire({
          title:'Producto no encontrado',
          icon:'warning'
        })
      }

      this.pTotal = 0;
      this.rowData.forEach((element:any)=>{// Obtener el precio total de los productos seleccionados
        this.pTotal = this.pTotal + (Number(element.nPrecioVenta) * element.nCantidad)
        
      })
      this.pIVA = (this.pTotal * .16)
      this.pSubTotal = (this.pTotal - this.pIVA)
    })
  }

  async pagar(){
    if(this.bCaja == 0){
        this.dialog.open(InicioCajaComponent, {
          disableClose: true,
          height:'80%',
          width:'60%',
        })
    }else{
      
      if (this.btnPagar && this.rowData.length > 0) {
        this.btnPagar = false
        console.log(this.rowData)
        let selectRows = this.rowData
        console.log(selectRows)
        console.log(this.pTotal)

        const dialogRef =  this.dialog.open(PagoComponent,{
          height:'55%',
          width:'50%',
          panelClass: 'custom-matModal',
          data:{
            "productos" : this.rowData,
            "monto" : this.pTotal
          },
          disableClose: true
        })

        dialogRef.afterClosed().subscribe(datosBusqueda => {//Obtener producto encontrado en el modal
          console.log(datosBusqueda)
          console.log(this.rowData)
          this.btnPagar = true;


          
          if (datosBusqueda != undefined && datosBusqueda!= "") {
            this.addCarrito = true
            let cantidad = 0;

            if (this.rowData.length > 0) {
              const data = {
                "idUsuario":1,
                "idCliente":1,
                "nProductos":this.rowData.length,
                "nFormaPago":datosBusqueda.nFormaPago,
                "nSubtotal":this.pSubTotal,
                "nIVA":this.pIVA,
                "nTotal":this.pTotal,
              }
              console.log(data)
              this.apiVenta.agregarVenta(data).subscribe((response)=>{
                console.log(response);
                if (response.nCodigoError == 0 && response.sData[0].nMsg == 0) {
                  let idVenta = response.sData[0].nIdVenta;
                  let insert = false

                  this.rowData.forEach((dat:any)=>{
                    const total = dat.nCantidad * dat.nPrecioVenta;
                    cantidad = cantidad + dat.nCantidad;
                    const dataDetalle = {
                      "nIdVenta":idVenta,
                      "idProducto":dat.nIdProducto,
                      "nCantidad":dat.nCantidad,
                      "nDescuento":1,
                      "nPrecioCompra":dat.nPrecioCompra,
                      "nPrecioVenta":dat.nPrecioVenta,
                    }

                    console.log(dataDetalle)
                    this.apiVenta.agregarVentaDetalle(dataDetalle).subscribe((result) =>{
                      console.log(result);
                      if (result.nCodigoError == 0) {
                        insert = true;
                      }else{
                        insert = false;
                      }
                    })
                  })
                  this.rowData = [];
                  this.pSubTotal = 0;
                  this.pIVA = 0;
                  this.pTotal = 0;
                  console.log(insert)
                  // if (insert) {
                    
                    Swal.fire({
                      title: 'Su cambio fue de:',
                      text: '$30.00 MXN',
                      imageUrl: 'https://unsplash.it/400/200',
                      imageWidth: 200,
                      imageHeight: 100,
                      imageAlt: 'Custom image',
                    })
                  // }
                }

              })
              
              
            
            }else{
            
            }
            
            
          }else{
            //Se canceló la venta
          }
          
        })
      }
    }
  }


  async eliminarProducto(){
    let selectRow = this.gridApi.getSelectedRows();
    console.log(selectRow)
    if (selectRow.length > 0) {
      
      const { value: password } = await Swal.fire({
        allowOutsideClick: false,
        title: 'Para esta acción  es necesario de la autorización del encargado',
        input: 'password',
        inputLabel: 'Password',
        inputPlaceholder: '12345',
        inputAttributes: {
          // maxlength: 10,
          autocapitalize: 'off',
          autocorrect: 'off'
        }
      })
      
      if (password) {
        Swal.fire(`Entered password: ${password}`)

        this.apiUsuario.validaPermiso(password).subscribe(result => {
          console.log(result)
        })
        selectRow.forEach((element:any) => {
          let idProducto = element.nIdProducto
          this.rowData.forEach((val:any,index:number)=>{
            console.log(idProducto)
            console.log(val.nIdProducto)
            if (val.nIdProducto == idProducto) {
              console.log(index)
              console.log(this.rowData[index])
              this.rowData.splice(index, 1)
            }
          })
        });
        console.log(this.rowData)
        this.gridApi.setRowData(this.rowData) //Actualizar rowData
        this.pTotal = 0;
        this.rowData.forEach((element:any)=>{// Obtener el precio total de los productos seleccionados
          this.pTotal = this.pTotal + (Number(element.nPrecioVenta) * element.nCantidad)
          // console.log(this.pTotal)
        })
        this.pIVA = (this.pTotal * .16)
        this.pSubTotal = (this.pTotal - this.pIVA)
      }
    }
  }

  async probarImpresion(){


    const conector = new ConectorPluginV3();
    conector
    .Iniciar()
    .EstablecerAlineacion(ConectorPluginV3.ALINEACION_CENTRO)
    .EscribirTexto("Hola desde Sypos Soluciones. A.C")
    .Feed(1)
    .EscribirTexto("Este es un mensaje de prueba, para el sistema Sypos")
    .Feed(1)
    .DescargarImagenDeInternetEImprimir("https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png", ConectorPluginV3.TAMAÑO_IMAGEN_NORMAL, 400)
    .Iniciar()
    .Feed(1);

    const respuesta = await conector.imprimirEn(this.impresoraSeleccionada);

    if (respuesta == true) {
      console.log("Impresión con exito!!");
    } else {
      console.log("Impresión fallida!!");
    }
  }

  connetJPH(){
    
  }
  // PROPIEDADES DE AG-GRID TABLE

  public gridApi!: any

  lastId = 0
  currentPage: any;
  totalPages: any;
  itemPerPage: any = 50
  resizeCallback: any;

  onGridReady(params: any) {
    this.gridApi = params.api

    this.gridApi.sizeColumnsToFit()

    this.resizeCallback = () => {
      this.gridApi.sizeColumnsToFit()
    }
    window.addEventListener('resize', this.resizeCallback)

    this.currentPage = this.gridApi.paginationGetCurrentPage() + 1
    this.totalPages = this.gridApi.paginationGetTotalPages()

    this.lastId = this.rowData.length;
  }

  // @HostListener('mouseover') onMouseOver() {
  //   let part = this.el.nativeElement.querySelector('.card-text');
  //   this.renderer.setElementStyle(part, 'display', 'block');
  // }
}

let rowImmutableStore: any[];