import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaProductoComponent } from './components/alta-producto/alta-producto.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ProductosComponent } from './components/productos/productos.component';
import { VentaComponent } from './components/venta/venta.component';
import { VentasComponent } from './components/reportes/ventas/ventas.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { ModProductoComponent } from './modals/mod-producto/mod-producto.component';
import { UploadsComponent } from './components/uploads/uploads.component';
import { ComprasComponent } from './components/reportes/compras/compras.component';
import { LoginComponent } from './components/login/login.component';
import { ClientesComponent } from './components/catalogos/clientes/clientes.component';


const routes: Routes = [
  {path:'inicio', component:InicioComponent},
  {path:'venta', component:VentaComponent},
  {path:'productos', component:ProductosComponent},
  {path:'altaProducto', component:AltaProductoComponent},
  {path:'modProducto', component:ModProductoComponent},
  {path:'ventas', component:VentasComponent},
  {path:'estadistica', component:EstadisticasComponent},
  {path:'upload', component:UploadsComponent},
  {path:'compras', component:ComprasComponent},
  {path:'login', component:LoginComponent},
  {path:'clientes', component:ClientesComponent},
  {path:'',redirectTo:'inicio',pathMatch:"full"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
