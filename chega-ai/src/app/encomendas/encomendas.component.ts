import { Component, OnInit } from '@angular/core';
import { Morador, MoradorService } from '../services/morador.service';
import { Encomenda, EntregasService } from '../services/entrega.service';

@Component({
  selector: 'app-nova-encomenda',
   templateUrl: './encomendas.component.html',
  styleUrl: './encomendas.component.scss'
})
export class NovaEncomendaComponent implements OnInit {
  moradorSelecionado!: Morador;
  encomendaSelecionada!: Encomenda;

  constructor(
    private moradorService: MoradorService,
    private entregasService: EntregasService
  ) {}

  ngOnInit(): void {
    // Exemplo de carregamento fixo; substitua por busca real do ID
    this.moradorService.listarTodos().subscribe(moradores => {
      this.moradorSelecionado = moradores[0]; // só um exemplo
    });

    this.entregasService.listarTodos().subscribe(encomendas => {
      this.encomendaSelecionada = encomendas[0]; // só um exemplo
    });
  }
}
