// src/app/components/morador/morador.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Morador, MoradorService } from '../services/morador.service';

@Component({
  selector: 'app-morador',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './morador.component.html',
  styleUrls: ['./morador.component.scss']
})
export class MoradorComponent implements OnInit {
  moradorForm: FormGroup;
  moradores: Morador[] = [];
  moradoresFiltrados: Morador[] = [];

  mostrarModal = false;
  mostrarModalEdicao = false;
  moradorSelecionado?: Morador;

  mostrarNotificacao = false;
  mensagemNotificacao = '';
  erroMensagem = '';

  constructor(private fb: FormBuilder, private moradorService: MoradorService) {
    this.moradorForm = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      apartamento: ['', Validators.required],
      telefone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)]],
    });
  }

  ngOnInit() {
    this.carregarMoradores();
  }

  get f() {
    return this.moradorForm.controls;
  }

  carregarMoradores() {
    this.moradorService.listarTodos().subscribe({
      next: (dados) => {
        this.moradores = dados;
        this.moradoresFiltrados = [...dados];
      },
      error: () => this.erroMensagem = 'Erro ao carregar moradores.',
    });
  }

  cadastrarMorador() {
    if (this.moradorForm.invalid) {
      this.erroMensagem = 'Preencha todos os campos corretamente.';
      return;
    }

    const morador: Morador = {
      nome: this.moradorForm.value.nome,
      apartamento: this.moradorForm.value.apartamento,
      telefone: this.moradorForm.value.telefone,
      entregas: undefined
    };

    this.moradorService.cadastrar(morador).subscribe({
      next: (novoMorador) => {
        this.moradores.push(novoMorador);
        this.moradorForm.reset();
        this.erroMensagem = '';
        alert('Morador cadastrado com sucesso!');
        this.atualizarLista();
      },
      error: (err) => {
        this.erroMensagem = 'Erro ao cadastrar morador: ' + (err.error?.message || err.message || 'Erro desconhecido');
      }
    });
  }

 editarMorador(morador: Morador) {
  this.mostrarModalEdicao = true;

  this.moradorForm.setValue({
    id: morador.id,
    nome: morador.nome,
    apartamento: morador.apartamento,
    telefone: morador.telefone
  });
}

fecharModalEdicao() {
  this.mostrarModalEdicao = false;
  this.moradorForm.reset();
}


 atualizarMorador() {
  if (this.moradorForm.invalid) {
    this.erroMensagem = 'Preencha todos os campos corretamente.';
    return;
  }

  const morador: Morador = this.moradorForm.value;

  if (!morador.id) {
    this.erroMensagem = 'ID do morador não encontrado.';
    return;
  }

  this.moradorService.atualizar(morador.id, morador).subscribe({
    next: (moradorAtualizado) => {
      const index = this.moradores.findIndex(m => m.id === moradorAtualizado.id);
      if (index !== -1) {
        this.moradores[index] = moradorAtualizado;
      }
      this.atualizarLista();
      this.moradorForm.reset();
      this.exibirNotificacao('Morador atualizado com sucesso!');
    },
    error: (err) => {
      console.error('Erro ao atualizar morador:', err);
      this.erroMensagem = 'Erro ao atualizar morador: ' + (err.error?.message || err.message || 'Erro desconhecido');
    }
  });
}



  confirmarExclusao(morador: Morador) {
    this.moradorSelecionado = morador;
    this.mostrarModal = true;
  }

  excluirMorador() {
    if (!this.moradorSelecionado?.id) return;

    this.moradorService.deletar(this.moradorSelecionado.id).subscribe({
      next: () => {
        this.moradores = this.moradores.filter(m => m.id !== this.moradorSelecionado?.id);
        this.atualizarLista();
        this.exibirNotificacao('Morador excluído com sucesso!');
        this.cancelarExclusao();
      },
      error: () => this.erroMensagem = 'Erro ao excluir morador.',
    });
  }

  cancelarExclusao() {
    this.mostrarModal = false;
    this.moradorSelecionado = undefined;
  }

  filtrarMoradores(event: Event) {
    const texto = (event.target as HTMLInputElement).value.toLowerCase();
    this.moradoresFiltrados = this.moradores.filter(m =>
      (m.nome?.toLowerCase() ?? '').includes(texto) ||
      (m.apartamento?.toLowerCase() ?? '').includes(texto) ||
      (m.telefone?.toLowerCase() ?? '').includes(texto)
    );
  }

  fecharNotificacao() {
    this.mostrarNotificacao = false;
  }

  private atualizarLista() {
    this.moradoresFiltrados = [...this.moradores];
    this.erroMensagem = '';
  }

  private exibirNotificacao(mensagem: string) {
    this.mensagemNotificacao = mensagem;
    this.mostrarNotificacao = true;
    setTimeout(() => this.mostrarNotificacao = false, 3000);
  }
}
