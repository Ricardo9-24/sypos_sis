import { Component, OnInit } from '@angular/core';
import { ColumnApi, GridApi, } from 'ag-grid-community';
import { ApiCatologoService } from 'src/app/services/apiCatalogo/api-catologo.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  gridApi: GridApi | undefined;
  gridColumnApi: ColumnApi = new ColumnApi; 
  rowData:any = [];
  // modules = AllModules;
  components: any;
  constructor(
    private apiCatalogo:ApiCatologoService
  ) { 

    apiCatalogo.getCliente(0).subscribe(result => {
      console.log(result);
      this.rowData = result.sData;
    })
  }

  ngOnInit(): void {
  }

  columnDefs = [
    {
      headerName: "ID",
      field:"nIdCliente"
    },
    {
      headerName: "Nombre",
      field:"sNombre"
    },

  ]

  onGridReady(params:any){
    this.gridColumnApi = params.columnApi;
    this.gridApi = params.api;
    this.gridApi?.sizeColumnsToFit();
  }

  exportAsExcel(filename?: string): void {
    this.gridApi?.exportDataAsExcel({
      columnKeys: this.generateColumnsForExcel(),
      processCellCallback: function (params) {
        if (params.column.getColId() === 'currentPrice') {
          return params.value?.amount + ' ' + params.value?.currency;
        }
        return params.value;
      },
    });
  }

  generateColumnsForExcel(): string[] {
    const keys = this.gridColumnApi
      .getAllDisplayedColumns()
      .map((column) => column.getColId());

    const amountIndex: number = keys.findIndex(
      (column) => column === 'newPrice'
    );
    keys.splice(amountIndex + 1, 0, 'currency');

    return keys;
  }
}
