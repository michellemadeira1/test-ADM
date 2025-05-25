

import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Encomenda, EntregasService } from '../services/entrega.service';
import { Morador, MoradorService } from '../services/morador.service';



@Component({
  selector: 'app-main-login',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './main-login.component.html',
  styleUrls: ['./main-login.component.scss'],
  providers: [DatePipe]
})
export class MainLoginComponent implements OnInit {
   entregas: Encomenda[] = [];
   moradores: any[] = [];

  constructor(
    private entregaService: EntregasService,
    private moradorService: MoradorService
  ) {}
ngOnInit(): void {
 this.moradorService.listarTodos().subscribe({
  next: (moradores) => {
    this.moradores = moradores;
  },
  error: (erro) => {
    console.error('Erro ao carregar moradores:', erro);
  }
  });
}



}
