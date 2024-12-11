import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModProductoComponent } from 'src/app/modals/mod-producto/mod-producto.component';
import { ApiProductoService } from 'src/app/services/apiProducto/api-producto.service';
import { SearchProducto } from '../../models/searchProducto.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  searchProducto = new SearchProducto();
  dataSearch:any
  rowData:any;
  datatable:any = {};
  dtOptions: any = {};
  isLoadingResults = false;
  loadingImgPrev: Boolean = false;
  sClave:string = "";
  message = '';
  isLoading = true;
  
  constructor(public dialog:MatDialog,private apiProducto:ApiProductoService) { 
    this.dtOptions = {
      pagingType: 'simple_numbers',
      "select": true,
      "pageLength": 5,
      "responsive":true,
      "autoWidth": true,
      "processing": true,
      "dom": 'Bfrtip',
      buttons: [
        'colvis',
        'copy',
        'print',
        'excel',
        'pdf',
      ],
      language: {
        "emptyTable":			"<i>No hay datos disponibles en la tabla.</i>",
        "info":		   		    "Del _START_ al _END_ de _TOTAL_ ",
        "infoEmpty":			"Mostrando 0 registros de un total de 0.",
        "infoFiltered":			"(filtrados de un total de _MAX_ registros)",
        "infoPostFix":			"(actualizados)",
        "lengthMenu":			"Mostrar _MENU_ registros",
        // "lengthMenu":			"[[10,25,50,-1], [10,25,50,'All']]",
      
        "loadingRecords":		"Cargando...",
        // "processing":			"Procesando...",
        "search":			    "<span style='font-size:15px;'>Buscar:</span>",
        "searchPlaceholder":	"Dato para buscar",
        "zeroRecords":			"No se han encontrado coincidencias.",
        "paginate": {
            "first":			"Primera",
            "last":				"Última",
            "next":				"Siguiente",
            "previous":			"Anterior"
        },
        "aria": {
            "sortAscending":	"Ordenación ascendente",
            "sortDescending":	"Ordenación descendente"
        },
        
      },
    };

    this.buscarProducto("");
    // this.apiProducto.buscarProducto("").subscribe(result =>{
    //   this.rowData = result.sData;
    // })
  }

  // OBTENER EL EVENTO CLICK
  @HostListener('dblclick')
  onDblClick() {
    $('#tblProductos tbody').on('dblclick','tr',function(e){
      console.log(e)
    })
  }
  
  ngOnInit(): void {
  }

  buscarProducto(event?:any){
    this.loadingImgPrev = true
    this.apiProducto.buscarProducto(event).subscribe(result =>{
      this.loadingImgPrev = false;
      this.isLoading = false;
      console.log(result)
      this.isLoadingResults = false
      this.rowData = result.sData
      $('#tblProductos tbody').empty();
      this.datatable = $('#tblProductos').DataTable();

      this.datatable.destroy();
      $('#tblProductos').DataTable( {
        
        responsive: true,
        autoWidth: false,
        processing: true,
        pageLength: 8,
        dom: 'Bfrtip',
        data: this.rowData,
        columnDefs: [
          {
              targets: -1,
              data : null,
              defaultContent: '<button>Click!</button>',
          }
        ],          
        columns:
        [
          { "data" : "nClave" },
          { "data" : "nomProducto", "width": "20%" },
          { "data" : "nPrecioCompra", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) },
          { "data" : "nPrecioVenta", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) },
          { "data" : "nEstatus"},
          { "data" : "dFecRegistro" },
          { "data" : "dFecMovimiento", "width":"15%" },
          // { "defaultContent": "<button  onclick="+this.editarProducto()+" class='btn btn-warning deleteBtn'>update</button>"},
          // {
          //   "data":null, "render":function(data,row){
          //     // console.log(data)
          //     return '<button onclick=this.updateClicked() class="btn btn-warning deleteBtn">Update</button>';
          //   }
          // }
        ],
        
        language: {
            "emptyTable":			"<i>No hay datos disponibles en la tabla.</i>",
            "info":		   		    "Del _START_ al _END_ de _TOTAL_ ",
            "infoEmpty":			"Mostrando 0 registros de un total de 0.",
            "infoFiltered":			"(filtrados de un total de _MAX_ registros)",
            "infoPostFix":			"(actualizados)",
            "loadingRecords":		"Cargando...",
            "search":			    "<span style='font-size:15px;'>Buscar:</span>",
            "searchPlaceholder":	"Dato para buscar",
            "zeroRecords":			"No se han encontrado coincidencias.",
            "paginate": {
                "first":			"Primera",
                "last":				"Última",
                "next":				"Siguiente",
                "previous":			"Anterior"
            },
            // "aria": {
            //     "sortAscending":	"Ordenación ascendente",
            //     "sortDescending":	"Ordenación descendente"
            // },
            
        },
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
          const self = this;
          $('td', row).off('click');
          $('td', row).on('click', () => {
            self.selectRowVenta(data);
          });
          return row;
        },
      });
    })
  }

  selectRowVenta(info: any): void {
    // console.log(info);
    const dialogRef = this.dialog.open(ModProductoComponent,{
      height: '70%',
      width: '70%',
      disableClose: true,
      data: {
        "sData":info
      }
    }).afterClosed().subscribe(result => {
      console.log(result)
      if (result == false) {
        this.buscarProducto("");
      }

    });

    
    // this.message = info.id + ' - ' + info.firstName;
  }

  addProducto(){
    this.dialog.open(ModProductoComponent,{
      height: '70%',
      width: '70%',
      disableClose: true,
      data: {
        // "sData":info
      }
    }).afterClosed().subscribe(result => {
      console.log(result)
      if (result != "") {
        this.buscarProducto("");
      }
    })
  }
}
