import { Component, OnInit } from '@angular/core';
import { ApiProductoService } from 'src/app/services/apiProducto/api-producto.service';
import { currencyFormatter, currencyFormatterMXN, numberComparator } from 'src/app/utils/formatters';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {
  
  // VARIABLES PARA LISTAR PRODUCTOS
  // rowData: any[] = [];
  // frameworkComponents: any;
  // PrecioVentaTotal: number = 0;
  // medidasCotizadasList: any;


  
  constructor(private apiProducto:ApiProductoService) { }

  ngOnInit(): void {
    // this.buscarProducto("");
  }


  // ================   APARTADO PARA LISTAR PRODUCTOS CON AG GRID    ================// 

  // buscarProducto(event?:any){
  //   this.apiProducto.buscarProducto(event).subscribe(result =>{
  //     console.log(result)
  //     this.rowData = result.sData;
  //   });
    
  // }

  // onFilterTextBoxChanged() {
  //   this.gridApi.setQuickFilter(
  //     (document.getElementById('filter-text-box') as HTMLInputElement).value
  //   );
  // }

  // onPrintQuickFilterTexts() {
  //   this.gridApi.forEachNode(function (rowNode:any, index:any) {
  //     console.log(
  //       'Row ' +
  //         index +
  //         ' quick filter text is ' +
  //         rowNode.quickFilterAggregateText
  //     );
  //   });
  // }

  // columnDefs = [

  //   { field: 'nClave', width: 220, headerName: 'Clave', sortable: true, editable: false },
  //   { field: 'nomProducto', width: 200, headerName: 'producto', sortable: true, filter: true },
  //   { field: 'nPrecioCompra', headerName: 'M. Interna', sortable: true, precision: 2, filter: true, type: 'numeric' },
  //   { field: 'nPrecioVenta', headerName: 'M. Externa', sortable: true, precision: 2, filter: true, type: 'numeric' },
  //   { field: 'nEstatus', headerName: 'Estatus', sortable: true, filter: true },
  //   { field: 'dFecRegistro', headerName: 'F. Registro', sortable: true, filter: true, },
  //   { field: 'dFecMovimiento', headerName: 'F. Movimiento', sortable: true, filter: true, },
  //   {
  //     field: 'nPrecioCompra',
  //     // width: 150,
  //     headerName: 'Precio compra',
  //     precision: 2,
  //     type: 'number',
  //     sortable: true,
  //     comparator: numberComparator,
  //     valueFormatter: (params: any) => currencyFormatterMXN(params.data.nPrecioCompra),
  //   },
  //   {
  //     field: 'nPrecioVenta',
  //     // width: 150,
  //     headerName: 'Precio Venta',
  //     precision: 2,
  //     type: 'number',
  //     sortable: true,
  //     comparator: numberComparator,
  //     valueFormatter: (params: any) => currencyFormatterMXN(params.data.nPrecioVenta),
  //   },
  //   {
  //     field: 'checkbox',
  //     width: 60,
  //     headerName: '',
  //     checkboxSelection: true,
  //     headerCheckboxSelection: true,
  //   }
  // ]

  // defaultColDef = {
  //   flex: 1,
  //   resizable: true,
  // };

  // private gridApi!: any

  // lastId = 0
  // currentPage: any;
  // totalPages: any;
  // itemPerPage: any = 20

  // resizeCallback: any;

  // onGridReady(params: any) {
  //   this.gridApi = params.api

  //   this.gridApi.sizeColumnsToFit()

  //   this.resizeCallback = () => {
  //     this.gridApi.sizeColumnsToFit()
  //   }
  //   window.addEventListener('resize', this.resizeCallback)

  //   this.currentPage = this.gridApi.paginationGetCurrentPage() + 1
  //   this.totalPages = this.gridApi.paginationGetTotalPages()

  //   // this.lastId = this.rowData.length;
  // }

  // updatePerPage() {
  //   this.gridApi.paginationSetPageSize(Number(this.itemPerPage))
  // }

  // onSelectionChanged(event: any) {
  //   const selectedRows = this.gridApi.getSelectedRows();
  //   // this.numMaterialesSelect = selectedRows.length;
  // }

  // gotoFirst() {
  //   this.gridApi.paginationGoToFirstPage()
  // }

  // gotoPrev() {
  //   this.gridApi.paginationGoToPreviousPage()
  // }

  // gotoLast() {
  //   this.gridApi.paginationGoToLastPage()
  // }

  // gotoNext() {
  //   this.gridApi.paginationGoToNextPage()
  // }

  // gotoPage() {
  //   let page = this.currentPage
  //   if (page < 1) page = 1
  //   if (page > this.totalPages) page = this.totalPages

  //   this.gridApi.paginationGoToPage(page - 1)
  //   this.currentPage = page
  // }

  // onPaginationChanged() {
  //   if (this.gridApi) {
  //     this.currentPage = this.gridApi.paginationGetCurrentPage() + 1
  //     this.totalPages = this.gridApi.paginationGetTotalPages()
  //   }
  // }

  // newRow: any = {}

  // reloadData() {
  //   this.gridApi.setRowData(this.rowData)
  // }

}
