import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
   standalone: true,
  imports: [RouterLink,FormsModule,CommonModule,HttpClientModule ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
 email: string = '';
  senha: string = '';
  erroMensagem: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.erroMensagem = '';

    if (!this.email || !this.senha) {
      this.erroMensagem = 'Por favor, preencha e-mail e senha.';
      return;
    }

    this.authService.login({ email: this.email, senha: this.senha }).subscribe({
      next: () => {
        // Login ok: redireciona para página principal
        this.router.navigate(['/mainLogin']); // ou a rota que quiser
      },
      error: (err) => {
        // Pode customizar a mensagem dependendo do erro
        this.erroMensagem = 'Usuário ou senha inválidos.';
        console.error('Erro no login:', err);
      }
    });
  }
}
