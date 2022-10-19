import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  readonly url = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  public getProductos(): Observable<any> {
    return this.http.get(`${this.url}/api/Productos/ObtenerProductos`);
  }

  public AgregarProductos(producto: any): Observable<any> {
    return this.http.post(`${this.url}/api/Productos/AgregarProducto`, producto);
  }

  public editarProducto(producto: any): Observable<any> {
    return this.http.put(`${this.url}/api/Productos/ActualizarProducto?id=` + producto.id, producto);
  }

  public eliminarProducto(producto: any): Observable<any> {
    return this.http.delete(`${this.url}/api/Productos/EliminarProducto?id=` + producto.id);
  }
}