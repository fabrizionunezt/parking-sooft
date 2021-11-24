import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-contenedor',
  templateUrl: './contenedor.component.html',
  styleUrls: ['./contenedor.component.scss'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ height: 0, opacity: 0 }),
            animate('1s ease-out', 
                    style({ height: 300, opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ height: 300, opacity: 1 }),
            animate('1s ease-in', 
                    style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class ContenedorComponent implements OnInit {

  showLoading: boolean=true;
  constructor() {
    
  }
 
  ngOnInit(): void {
   this.establecerTiempoVIsualizacion();
  }
  establecerTiempoVIsualizacion(){
    setTimeout(() =>{
      this.showLoading=false;
    }, 5000);
  }


}
