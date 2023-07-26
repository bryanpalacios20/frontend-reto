import { Component, OnInit } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { Cliente } from 'src/app/models/cliente';
import { DetalleVenta } from 'src/app/models/detalleVenta';
import { ClienteService } from 'src/app/services/cliente.service';
import { ProductoService } from 'src/app/services/producto.service';
import { VentaService } from 'src/app/services/venta.service';
@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  cssUrl: string;
  ventas: DetalleVenta[]=[];
  ventaSeleccionada: DetalleVenta[]=[];
  fechaActual: Date;
  fechaActualSeleccionada: string;
  isLoading:boolean=false;
  fecha:String;
  total:number;
  clienteSeleccionado: Cliente;
  fechaEscogida: string="";

  constructor(
    public sanitizer: DomSanitizer,
    public ventaServices: VentaService,
    public productoServices: ProductoService,
    public clienteServices: ClienteService
    ) {
    this.cssUrl = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css';
  }
  ngOnInit(): void {
    let dateZonePedido = (new Date()).toLocaleString('ln', { timeZone: 'America/Lima' }).toString();
    let fecha_nueva = dateZonePedido.substring(0, dateZonePedido.indexOf(', '));
    let fecha=fecha_nueva.split("/");
    this.fechaActualSeleccionada=fecha[2]+"-"+fecha[1]+"-"+fecha[0];
    this.buscarVentasPorFecha();
  }

  verDetalle(idVenta: number){
    this.isLoading=false;
    this.total=0;
    this.ventaServices.getVentaById(idVenta).subscribe(response => {
      this.isLoading=true;
      this.fecha= response[0].venta.fecha;
      this.ventaSeleccionada=response;
      this.clienteSeleccionado= response[0].venta.cliente;
      this.ventaSeleccionada.map(v=> this.total= v.producto.precio * v.cantidad );
    });
  }

  buscarVentasPorFecha(){
    if(this.fechaEscogida!=""){
      this.fechaActualSeleccionada= this.fechaEscogida;
    }
    this.ventaServices.getVentasByFechas(this.fechaActualSeleccionada).subscribe(response => {
      this.ventas=response;
    });
  }
}
