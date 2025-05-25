import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Encomenda, EntregasService } from '../services/entrega.service';
import { Morador, MoradorService } from '../services/morador.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface Entrega {
  id: number;
  dataRecebimento: Date;
  descricao: string;
  morador: {
    nome: string;
    apartamento: string;
  };
}
@Component({
  selector: 'app-entregas',
   standalone: true,
  imports: [RouterLink,  HttpClientModule,FormsModule,CommonModule],
  templateUrl: './entregas.component.html',
 styleUrls: ['./entregas.component.scss']
})



export class EntregasComponent implements OnInit {
   moradores: Morador[] = [];
   entregas: Encomenda[] = [];
  moradorSelecionado?: number;

  descricao: string = '';
  dataRecebimento: string = '';

  constructor(
    private moradorService: MoradorService,
    private entregasService: EntregasService
  ) {}

  ngOnInit(): void {
    this.carregarMoradores();
  }

  carregarMoradores(): void {
    this.moradorService.listarTodos().subscribe({
      next: (dados) => {
        this.moradores = dados;
      },
      error: (erro) => {
        console.error('Erro ao buscar moradores:', erro);
      }
    });
  }

  cadastrarPedido(): void {
  if (!this.moradorSelecionado || !this.descricao || !this.dataRecebimento) {
    alert('Preencha todos os campos!');
    return;
  }

  const novaEncomenda: Encomenda = {
    descricao: this.descricao,
    dataRecebimento: this.dataRecebimento,
    status: 'PENDENTE',
    morador: { id: this.moradorSelecionado },
    usuario: { id: 1 } // substitua pelo usuário logado se houver auth
    ,
    moradores: undefined,
    apartamento: '',
    nome: ''
  };

  this.entregasService.cadastrarEncomenda(novaEncomenda).subscribe({
    next: (encomenda) => {
      alert('Pedido cadastrado com sucesso!');
      // Limpar campos após o cadastro
      this.descricao = '';
      this.dataRecebimento = '';
      this.moradorSelecionado = undefined;
    },
    error: (erro) => {
      console.error('Erro ao cadastrar pedido:', erro);
      if (erro.status === 400) {
        alert('Dados inválidos. Verifique os campos e tente novamente.');
      } else if (erro.status === 0) {
        alert('Não foi possível conectar ao servidor. Verifique sua conexão.');
      } else {
        alert('Erro ao cadastrar pedido. Tente novamente mais tarde.');
      }
    }
  });
}

}
