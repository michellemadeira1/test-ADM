import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Encomenda, EntregasService } from '../services/entrega.service';
import { Morador, MoradorService } from '../services/morador.service';

@Component({
  selector: 'app-entregas',
  standalone: true,
  imports: [
    RouterLink,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './entregas.component.html',
  styleUrls: ['./entregas.component.scss']
})
export class EntregasComponent implements OnInit {
   moradores: Morador[] = [];
  moradorSelecionado?: number;  // armazenará o id do morador selecionado

  descricao: string = '';
  dataRecebimento: string = '';

  constructor(private moradorService: MoradorService) {}

  ngOnInit(): void {
  this.carregarMoradores();
}


carregarMoradores() {
  this.moradorService.listarTodos().subscribe({
    next: (dados) => {
      console.log('Moradores carregados:', dados);
      this.moradores = dados;
    },
    error: (err) => console.error('Erro ao buscar moradores:', err)
  });
}


  cadastrarPedido() {
    // Aqui você pode capturar moradorSelecionado, descricao e dataRecebimento para enviar ao backend
    console.log('Morador selecionado:', this.moradorSelecionado);
    console.log('Descrição:', this.descricao);
    console.log('Data Recebimento:', this.dataRecebimento);

    // Código para enviar os dados ao backend via service (exemplo)
  }

}
