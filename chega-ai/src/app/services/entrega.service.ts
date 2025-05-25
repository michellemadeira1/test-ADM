import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Encomenda {
moradores: any;
  id?: number;
  descricao: string;
  dataRecebimento: string;
  status: 'PENDENTE' | 'ENTREGUE' | 'CANCELADA'; // ajuste conforme o seu enum StatusEncomenda
  apartamento: string;
  nome: string;
  morador: any; // Substitua por um tipo mais específico se houver
  usuario: any; // Substitua por um tipo mais específico se houver
}

@Injectable({
  providedIn: 'root'
})
export class EntregasService {
  getEntregas() {
    throw new Error('Method not implemented.');
  }
  private readonly baseUrl = 'http://localhost:8080/encomendas';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Encomenda[]> {
    return this.http.get<Encomenda[]>(this.baseUrl);
  }

  buscarPorId(id: number): Observable<Encomenda> {
    return this.http.get<Encomenda>(`${this.baseUrl}/buscarPorId/${id}`);
  }

  cadastrarEncomenda(encomenda: Encomenda): Observable<Encomenda> {
    return this.http.post<Encomenda>(`${this.baseUrl}/cadastrar`, encomenda);
  }

  atualizar(id: number, encomenda: Encomenda): Observable<Encomenda> {
    return this.http.put<Encomenda>(`${this.baseUrl}/atualizar/${id}`, encomenda);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deletar/${id}`);
  }

  buscarPorStatus(status: string): Observable<Encomenda[]> {
    return this.http.get<Encomenda[]>(`${this.baseUrl}/status/${status}`);
  }
}
