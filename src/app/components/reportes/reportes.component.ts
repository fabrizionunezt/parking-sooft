import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ChartDataSets } from 'chart.js';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { Auditoria } from 'src/app/models/auditoria.model';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Ingresos', 'Motos'], ['Ingresos', 'Autos'], ['Ingresos', 'Camionetas']];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  opcionesFechas: string[] = ['Dia', 'Semana', 'Mes'];
  tituloCicloSel: string = '';
  fechaDesdeR: Date = new Date();
  fechaHastaR: Date = new Date();
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          max: 50,
          min: 0
        }
      }]
    }
  };
  public barChartLabels: Label[] = ['Tipos de Vehiculos'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [];
  displayedColumns: string[] = [
    'patenteVehiculo',
    'dniPropietario',
    'tipoVehiculo',
    'colorVehiculo',
    'fechaIngreso',
    'fechaEgreso',
    'montoCobrado',
  ];
  dataSource: MatTableDataSource<Auditoria> = new MatTableDataSource();

  constructor(private svcShared: SharedServiceService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    
    this.obtenerRango();
  }

  filtrarCiclo(fecha: string) {

  }
  obtenerRango() {
    if (!this.fechaDesdeR || !this.fechaHastaR)
      return;
    if (this.fechaHastaR.getMonth() != this.fechaDesdeR.getMonth()) {
      this.tituloCicloSel = `Ciclo seleccionado: Desde el ${this.fechaDesdeR.getDate()} de ${monthNames[this.fechaDesdeR.getMonth()]} hasta el ${this.fechaHastaR.getDate()} de ${monthNames[this.fechaHastaR.getMonth()]}`;
    } else if (this.fechaHastaR.getTime() == this.fechaDesdeR.getTime()) {
      this.tituloCicloSel = `Ciclo seleccionado: El ${this.fechaDesdeR.getDate()} de ${monthNames[this.fechaDesdeR.getMonth()]}`;
    }
    else {
      this.tituloCicloSel = `Ciclo seleccionado: Desde el ${this.fechaDesdeR.getDate()}  hasta el ${this.fechaHastaR.getDate()} de ${monthNames[this.fechaHastaR.getMonth()]}`;
    }
    this.dataSource.data = this.svcShared.listadoAud.filter(x => {
      var dateString = x.fechaIngreso.substr(0, 10);
      var dateParts = dateString.split("/");
      var fechaSel = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
      var fechaRD = new Date(this.fechaDesdeR.getFullYear(),this.fechaDesdeR.getMonth(),this.fechaDesdeR.getDate());
      var fechaRH = new Date(this.fechaHastaR.getFullYear(),this.fechaHastaR.getMonth(),this.fechaHastaR.getDate());
      return (fechaRD <= fechaSel && fechaRH >= fechaSel);
    });
    this.obtenerDatosGraficos();
  }
  ajustarGrafico(cantMax: number) {
    this.barChartOptions = {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            max: cantMax,
            min: 0
          }
        }]
      }
    };
  }
  obtenerDatosGraficos(){
    var motosA: Auditoria[] = this.dataSource.data.filter(x => x.tipoVehiculo == 'Moto');
    var autosA: Auditoria[] = this.dataSource.data.filter(x => x.tipoVehiculo == 'Auto');
    var camionetasA: Auditoria[] = this.dataSource.data.filter(x => x.tipoVehiculo == 'Camioneta');
    var montoMotos = 0;
    var montoAutos = 0;
    var montoCamionetas = 0;

    for (const iterator of motosA) {
      var monto =iterator.montoCobrado.replace(',','.');
      montoMotos += +monto;
    }
    for (const iterator of autosA) {
      var monto =iterator.montoCobrado.replace(',','.');
      montoAutos += +monto;
    }
    for (const iterator of camionetasA) {
      var monto =iterator.montoCobrado.replace(',','.');
      montoCamionetas += +monto;
    }

    var cantidades = [motosA.length,autosA.length,camionetasA.length];
    var cantidad = Math.max.apply(null, cantidades);
    var cantidadMax = 10;
    if(cantidad > 10)
      cantidadMax = Math.round(((cantidad/ 100) * 10 + cantidad) / 10) * 10;
    this.ajustarGrafico(cantidadMax);
    this.barChartData = [
      { data: [motosA.length], label: 'Motos' },
      { data: [autosA.length], label: 'Autos' },
      { data: [camionetasA.length], label: 'Camionetas' }
    ];
    this.pieChartData = [
      montoMotos,
      montoAutos,
      montoCamionetas
    ];

  }
  
  ngOnInit(): void {
  }

  descargarCsv() {
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Auditoria estacionamiento',
      useBom: true,
      noDownload: false,
      headers: [
        'Patente Vehiculo',
        'DNI Propietario',
        'Tipo Vehiculo',
        'Color Vehiculo',
        'Fecha Ingreso',
        'Fecha Egreso',
        'Monto Cobrado',],
      useHeader: false,
      nullToEmptyString: true,
    };

    new AngularCsv(this.dataSource.data, 'registroVehiculos', options);
  }
}
