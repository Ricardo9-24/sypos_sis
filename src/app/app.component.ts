import { Component, HostBinding, Input, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { filter,delay, map, mergeMap } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { TokenStorageService } from './services/tokenStorage/token-storage.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { InicioCajaComponent } from './modals/inicio-caja/inicio-caja.component';
import { BluetoothCore } from '@manekinekko/angular-web-bluetooth';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ],
  providers : [BluetoothCore]
})
export class AppComponent {
  expanded = true;

  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav; 
  title = 'syPosSis';
  isLogin:boolean = false;
  // Menus
  showSubmenuReportes = false;
  showSubmenuCatalogos = false;
  showSubmenuEstadisticas = true;
  usuarios = true;
  compras = true;
  cortesCaja = true;
  inventario = true;
  movimientos = true;
  ventas = true;
  clientes = true;
  
  apertura = false;

  userData: any;
  dataSession: any;
  sDataPermisos: any;

  sNombre:string = "";
  sApellido:string = "";
  sPuesto:string = "";

  // @Input() item!: NavItem;
  @Input() depth!: number;
  cajaData: any;
  static GATT_CHARACTERISTIC_BATTERY_LEVEL = 'battery_level';
  static GATT_PRIMARY_SERVICE = 'battery_service';
  
  constructor(
      private observer: BreakpointObserver, 
      private router:Router,
      private tokenStorageService:TokenStorageService,
      public dialog:MatDialog,
      public ble: BluetoothCore
    ){
    this.expanded = true;
    
    this.cajaData = this.tokenStorageService.getCaja();
    
    this.userData = this.tokenStorageService.getUser();
    console.log(this.userData)
    console.log(this.userData.length)
    
    // this.dataSession = localStorage.getItem('dataSession')
    // this.userData = JSON.parse(this.dataSession)
    // console.log(this.userData)

    if (this.cajaData != null && Object.keys(this.cajaData).length > 0) {
      this.apertura = true;
    }else{
      this.apertura = false;
    }

    if (this.userData != null && Object.keys(this.userData).length > 0) {
      this.isLogin = true;
      this.sNombre = this.userData[0].sNombre
      this.sApellido = this.userData[0].sApellido
      this.sPuesto = this.userData[0].sPerfilUsuario
    }
    this.getDevice();
    this.stream();
  }
  ngOnInit(): void {  }

  getDevice() {
    console.log(this.ble.getDevice$());
    // call this method to get the connected device
    return this.ble.getDevice$();
  }
  
  ngAfterViewInit() {
    
    if (this.userData != null && Object.keys(this.userData).length > 0) { //Object.keys -- Valida que el objeto exista
      
      this.observer.observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        // console.log(res)
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

      this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
      console.log(this.apertura);
      if (!this.apertura) { 
        this.dialog.open(InicioCajaComponent, {
          disableClose: true,
          height:'80%',
          width:'60%',
        })
      }
    }
  }

  logout(){
    Swal.fire({
      title: '¿Cerrar su sesión?',
      icon: 'warning',
      cancelButtonColor:'#ed2719',
      confirmButtonColor: '#004a9f',
      cancelButtonText: 'No, cancelar',
      confirmButtonText: 'Sí, cerrar',
      showCancelButton: true,
      // reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.tokenStorageService.singOut();
        this.router.navigate(['/login']).then(()=>{
          window.location.reload();
        })
      }
    });
  }

  stream() {
    // call this method to get a stream of values emitted by the device
    console.log(this.ble.streamValues$().pipe(map((value: DataView) => value.getUint8(0))));
    return this.ble.streamValues$().pipe(map((value: DataView) => value.getUint8(0)));
  }

  disconnectDevice() {
    console.log(this.ble.disconnectDevice());
    this.ble.disconnectDevice();
  }

  value() {
    console.log('Getting Battery level...');

    return this.ble

        // 1) call the discover method will trigger the discovery process (by the browser)
        .discover$({
          acceptAllDevices: true,
          optionalServices: [AppComponent.GATT_PRIMARY_SERVICE]
        })
        .pipe(

          // 2) get that service
          // mergeMap((gatt: any) => {
          //   return this.ble.getPrimaryService$(gatt, AppComponent.GATT_PRIMARY_SERVICE);
          // }),

          // 3) get a specific characteristic on that service
          // mergeMap((primaryService: BluetoothRemoteGATTService) => {
          //   return this.ble.getCharacteristic$(primaryService, AppComponent.GATT_CHARACTERISTIC_BATTERY_LEVEL);
          // }),

          // 4) ask for the value of that characteristic (will return a DataView)
          mergeMap((characteristic: any) => {
            return this.ble.readValue$(characteristic);
          }),

          // 5) on that DataView, get the right value
          map((value: DataView) => value.getUint8(0))
        )
  }

}
