import { Injectable } from '@angular/core';
import { UsuarioService, LoginDTO, TokenResponse } from './usuario.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private usuarioService: UsuarioService) {}

  login(credentials: LoginDTO): Observable<TokenResponse> {
    return this.usuarioService.login(credentials).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
        this.loggedIn.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
