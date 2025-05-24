import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Usuario, UsuarioService } from '../services/usuario.service';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule,HttpClientModule ],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
  usuario = {
    nome: '',
    email: '',
    senha: ''
  };

  mensagemErro = '';

  constructor(private http: HttpClient) {}

  cadastrar(): void {
    this.http.post('http://localhost:8080/usuarios/cadastrar', this.usuario).subscribe({
      next: (response) => {
        alert('Usuário cadastrado com sucesso!');
        console.log(response);
      },
      error: (erro) => {
        console.error(erro);
        this.mensagemErro = 'Erro ao cadastrar. Verifique os dados.';
      }
    });
  }
}
