import { Component, OnInit, VERSION } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  version = VERSION.major //Version 14
  title = "SyPos"
  constructor() { }

  ngOnInit(): void {
    //Cambio de Repositorio
  }

}
