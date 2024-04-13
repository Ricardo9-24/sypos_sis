import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiVentaService } from 'src/app/services/apiVenta/api-venta.service';
import { VentasDetalleComponent } from '../ventas-detalle/ventas-detalle.component';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  rowData:any;
  datatable:any = {};
  dtOptions:DataTables.Settings = {};
  isLoadingResults = true;
  ntotal: number = 0;
  isLoading = true;

  constructor(public dialog:MatDialog,private apiVentas:ApiVentaService) {
    this.buscarVentas(0);
   }

  ngOnInit(): void {
  }

  buscarVentas(event?:any){
    
    this.apiVentas.selectVenta(event).subscribe(result =>{
      this.isLoadingResults = false;
      this.isLoading = false;
      this.rowData = result.sData;

      this.rowData.forEach((element:any) =>{
        // console.log(element)
        this.ntotal = (this.ntotal + Number(element.nTotal))
      })
      // console.log(this.ntotal)
      // console.log(result)
      $('#tblVentas tbody').empty();
      this.datatable = $('#tblVentas').DataTable();

      this.datatable.destroy();
      
        $('#tblVentas').DataTable({
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
              { "data" : "nIdVenta" },
              { "data" : "sCliente" },
              { "data" : "sFormaPago" },
              { "data" : "nProductos" },
              { "data" : "nSubtotal", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) },
              { "data" : "nIVA", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) },
              { "data" : "nTotal", render: $.fn.dataTable.render.number( ',', '.', 2, '$' ) },
              { "data" : "dFecRegistro", "width": "20%" },
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
          rowCallback: (row: Node, data: any[] | Object, index: number) => {
            const self = this;
            $('td', row).off('click');
            $('td', row).on('click', () => {
              self.selectRowVenta(data);
            });
            return row;
          },
          
        }
      );
    });
  }

  selectRowVenta(info: any): void {
    console.log(info);
    this.dialog.open(VentasDetalleComponent,{
      height: '70%',
      width: '85%',
      data: {
        "sData":info
      }
    })
    // this.message = info.id + ' - ' + info.firstName;
  }
}
