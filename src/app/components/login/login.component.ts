import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUsuarioService } from 'src/app/services/apiUsuario/api-usuario.service';
import { TokenStorageService } from 'src/app/services/tokenStorage/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  frmLogin!: FormGroup;
  form: any = {
    username: null,
    password: null
  };
  myForm = new UntypedFormGroup({
      usuario: new UntypedFormControl('', [Validators.required]),
      password: new UntypedFormControl('', [Validators.required]),
  })

  constructor(
        private apiUsuario:ApiUsuarioService,
        private router:Router,
        private tokenStorage:TokenStorageService
  ) {

    apiUsuario.getIP().subscribe(result => {
      console.log(result);

    })

    this.frmLogin = new FormGroup({
        'usuario' : new FormControl('', Validators.required),
        'password' : new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
  }

  login(){
    console.log(this.form);
    const { usuario, password } = this.form;
    console.log(usuario);
    console.log(password);

    this.apiUsuario.login(usuario,password).subscribe(result => {
      console.log(result)
      console.log(result.sData.length)

      if (result.nCodigoError == 0 && result.sData.length > 0) {
        
          this.tokenStorage.saveUser(result.sData);
          localStorage.setItem('user', result.sData[0].sNombre)
          localStorage.setItem('dataSession', JSON.stringify(result.sData))
        Swal.fire({
          icon : 'success',
          title: 'Bienvenido a Sypos System',
          confirmButtonText: 'OK'
        }).then(result =>{
          console.log(result);
          this.reloadPage();
          // this.router.navigate(['/'])
          
          // this.router.navigate(['inicio']).then(()=>{
          //   window.location.reload();
          // })
        })
      }else{
        Swal.fire({
          icon: 'warning',
          title: result.sMensajeError
        })
      }
    })
  }

  reloadPage(): void {
    console.log("inicio")
    this.router.navigate(['/']).then(()=>{
      window.location.reload();
    })      
}

}
