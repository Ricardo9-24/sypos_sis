import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
// PAQUETES DEL FRAMEWORK
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialExampleModule } from './material.module';

// COMPONENTES
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { VentaComponent } from './components/venta/venta.component';
import { AltaProductoComponent } from './components/alta-producto/alta-producto.component';
import { ProductosComponent } from './components/productos/productos.component';
import { BuscarProductoComponent } from './modals/buscar-producto/buscar-producto.component';
import { TicketComponent } from './modals/ticket/ticket.component';

// PAQUETES EXTERNOS
import { NgxBarcode6Module } from 'ngx-barcode6';
import { QrCodeModule } from 'ng-qrcode';
import { DataTablesModule } from 'angular-datatables';
import { AgGridModule } from 'ag-grid-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
// import { FlexLayoutModule } from '@angular/flex-layout';

import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { PagoComponent } from './modals/pago/pago.component';
import { VentasComponent } from './components/reportes/ventas/ventas.component';
import { VentasDetalleComponent } from './components/reportes/ventas-detalle/ventas-detalle.component';
import { ComprasComponent } from './components/reportes/compras/compras.component';
import { ClientesComponent } from './components/catalogos/clientes/clientes.component';
import { ProveedoresComponent } from './components/catalogos/proveedores/proveedores.component';
import { InventarioComponent } from './components/reportes/inventario/inventario.component';
import { CajaComponent } from './components/catalogos/caja/caja.component';
import { VendedoresComponent } from './components/catalogos/vendedores/vendedores.component';
import { UsuariosComponent } from './components/catalogos/usuarios/usuarios.component';
import { MarcaComponent } from './components/catalogos/marca/marca.component';
import { ClasificacionComponent } from './components/catalogos/clasificacion/clasificacion.component';
import { SucursalesComponent } from './components/catalogos/sucursales/sucursales.component';
import { CortesCajaComponent } from './components/reportes/cortes-caja/cortes-caja.component';
import { MovimientosComponent } from './components/reportes/movimientos/movimientos.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { CotizacionesComponent } from './components/cotizaciones/cotizaciones.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { ModProductoComponent } from './modals/mod-producto/mod-producto.component';
import { UploadsComponent } from './components/uploads/uploads.component';
import { GenericSelectComponent } from './modals/buscar-producto/select-generic.component';
import { FiltroPipe } from './services/filtro/filtro.pipe';
import { LoginComponent } from './components/login/login.component';
import { InicioCajaComponent } from './modals/inicio-caja/inicio-caja.component';
import { BottomSheetComponent } from './components/bottom-sheet/bottom-sheet.component';
import { WebBluetoothModule } from '@manekinekko/angular-web-bluetooth';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    VentaComponent,
    BuscarProductoComponent,
    ProductosComponent,
    AltaProductoComponent,
    TicketComponent,
    PagoComponent,
    VentasComponent,
    VentasDetalleComponent,
    ComprasComponent,
    ClientesComponent,
    ProveedoresComponent,
    InventarioComponent,
    CajaComponent,
    VendedoresComponent,
    UsuariosComponent,
    MarcaComponent,
    ClasificacionComponent,
    SucursalesComponent,
    CortesCajaComponent,
    MovimientosComponent,
    PedidosComponent,
    CotizacionesComponent,
    EstadisticasComponent,
    ModProductoComponent,
    UploadsComponent,
    GenericSelectComponent,
    FiltroPipe,
    LoginComponent,
    InicioCajaComponent,
    BottomSheetComponent
  ],
  imports: [
    AgGridModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxBarcode6Module,
    BrowserAnimationsModule,
    QrCodeModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    DataTablesModule,
    NgSelectModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    NgxChartsModule,
    MaterialExampleModule,
    // FlexLayoutModule,
    WebBluetoothModule.forRoot()
    // WebBluetoothModule.forRoot({
    //   enableTracing: true // or false, this will enable logs in the browser's console
    // })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
