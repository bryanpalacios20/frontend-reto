import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Cliente } from '../models/cliente';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url: String = `http://localhost:8080/productos`;

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url + '/');
  }

  saveProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.url + '/', producto);
  }

  editProducto(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(this.url + '/' + producto.id, producto);
  }

  deleteProducto(codigo: number): Observable<any> {
    return this.http.delete<any>(this.url + '/' + codigo);
  }

}
