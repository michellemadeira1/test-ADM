import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NovaEncomendaComponent } from './encomendas.component';  // Corrija o nome e caminho conforme seu arquivo real

describe('EncomendasComponent', () => {
  let component:NovaEncomendaComponent;
  let fixture: ComponentFixture<NovaEncomendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NovaEncomendaComponent]  // Aqui vai o componente que será testado
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaEncomendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
