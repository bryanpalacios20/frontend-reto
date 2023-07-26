import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Venta } from '../models/venta';
import { DetalleVenta } from '../models/detalleVenta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private url: String = `http://localhost:8080/ventas`;

  constructor(private http: HttpClient) { }

  getVentasByFechas(fecha:String): Observable<DetalleVenta[]> {
    return this.http.get<DetalleVenta[]>(this.url + '/fecha/'+fecha);
  }

  getVentaById(codigo: number): Observable<any> {
    return this.http.get<DetalleVenta[]>(this.url + '/' + codigo);
  }

  saveVenta(venta: Venta): Observable<Venta> {
    return this.http.post<Venta>(this.url + '/', venta);
  }
}
