import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiVentaService } from 'src/app/services/apiVenta/api-venta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas-detalle',
  templateUrl: './ventas-detalle.component.html',
  styleUrls: ['./ventas-detalle.component.css']
})
export class VentasDetalleComponent implements OnInit {
  isLoadingResults = true;
  rowData:any = {};
  datatable:any = {};
  dtOptions:DataTables.Settings = {};
  idVenta:number = 0

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, public dialog:MatDialog, private apiVenta:ApiVentaService) { 
    this.idVenta = data.sData.nIdVenta;
    
    this.getVentaDetalle()
  }

  ngOnInit(): void {
  }

  getVentaDetalle(){

    this.apiVenta.selectVenta(this.idVenta).subscribe(result =>{
      this.isLoadingResults = false;
      this.rowData = result.sData;

      if (result.nCodigoError == 0) {
        
        $('#tblVentaDetalle tbody').empty();
        this.datatable = $('#tblVentaDetalle').DataTable();
        
        this.datatable.destroy();
        
        $('#tblVentaDetalle').DataTable({
          responsive: true,
          autoWidth: false,
          processing: true,
          pageLength: 8,
          dom: 'Bfrtip',
          data: this.rowData,
          columnDefs: [{
            targets: -1,
            data : null,
            defaultContent: '<button>Click!</button>',
          }],
          columns:
          [
            { "data" : "nIdVentaDetalle" },
            { "data" : "sProducto", "width": "20%" },
            { "data" : "nCantidad" },
            { "data" : "nDescuento" },
            { "data" : "nPrecioCompra", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) },
            { "data" : "nPrecioVenta", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) },
            // { "data" : "nTotal", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) },
            { "data" : "dFecRegistro"},
          ],
          language: {
            "emptyTable":			  "<i>No hay datos disponibles en la tabla.</i>",
            "info":		   		    "Del _START_ al _END_ de _TOTAL_ ",
            "infoEmpty":			  "Mostrando 0 registros de un total de 0.",
            "infoFiltered":			"(filtrados de un total de _MAX_ registros)",
            "infoPostFix":			"(actualizados)",
            "loadingRecords":		"Cargando...",
            "search":			      "<span style='font-size:15px;'>Buscar:</span>",
            "searchPlaceholder":	"Dato para buscar",
            "zeroRecords":			"No se han encontrado coincidencias.",
            "paginate": {
              "first":			  "Primera",
              "last":				  "Última",
              "next":				  "Siguiente",
              "previous":			"Anterior"
            },
            
          },
        }
        );
      }else{
        Swal.fire({
          title:'Ha ocurrido un error',
          text:'Comuniquese con el admininistrador',
          icon:'warning'
        });

        this.dialog.closeAll()
      }
    });
  }  
}
