import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Usuario {
  nome: string;
  email: string;
  senha: string;
}

export interface LoginDTO {
  email: string;
  senha: string;
}

export interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/usuarios'; // Ajuste a URL se necessário

  constructor(private http: HttpClient) {}

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/cadastrar`, usuario);
  }

  login(loginDTO: LoginDTO): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${this.apiUrl}/login`, loginDTO);
  }
}
