import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedServiceService } from 'src/app/services/shared-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  mostrarPassword= true;
  dniUsuario = new FormControl('', [Validators.required]);
  passUsuario = new FormControl('', [Validators.required]);
  passwordIng = '';
  dniUsuarioIng = '';
  datosIncorrectos = false;
  constructor(private router: Router, private svcShared: SharedServiceService) { }

  ngOnInit(): void {
  }

  iniciarSesion(){
    var usuarioCorrecto = this.svcShared.listadoUsuarios.find(x => x.dni == this.dniUsuarioIng && x.password == this.passwordIng);
    if(usuarioCorrecto){
      var usuarioLogueado = {usuarioLogueado:true};
      localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioLogueado));
      this.router.navigate(['/']);
    }else{
      this.datosIncorrectos = true;
    }
    this.dniUsuario.reset();
    this.passUsuario.reset();
  }

}
