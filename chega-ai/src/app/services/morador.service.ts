import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Morador {
entregas: any;
  id?: number;
  nome: string;
  apartamento: string;
  telefone: string;
}

@Injectable({
  providedIn: 'root'
})
export class MoradorService {
  private readonly baseUrl = 'http://localhost:8080/moradores'; // ajuste para a URL do seu backend

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Morador[]> {
    return this.http.get<Morador[]>(this.baseUrl);
  }

 cadastrar(morador: Morador): Observable<Morador> {
  return this.http.post<Morador>(`${this.baseUrl}/cadastrar`, morador);
}

buscarPorNome(nome: string): Observable<Morador[]> {
  return this.http.get<Morador[]>(`${this.baseUrl}/buscar?nome=${encodeURIComponent(nome)}`);
}


  buscar(id: number, morador: Morador): Observable<Morador> {
    return this.http.put<Morador>(`${this.baseUrl}/buscar/${id}`, morador);
  }

  atualizar(id: number, morador: Morador): Observable<Morador> {
    return this.http.put<Morador>(`${this.baseUrl}/atualizar/${id}`, morador);
  }

  deletar(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/deletar/${id}`);
}


}
