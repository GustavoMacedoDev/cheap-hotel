import { Component, OnInit } from '@angular/core';
 
import {Router} from '@angular/router';
 
import {HotelService} from '../../services/hotel.service';
 
import {Hotel} from '../../services/hotel';
 
import {Response} from '../../services/response';
 
@Component({
    selector: 'app-consulta-hotel',
    templateUrl: './consulta.component.html',
    styleUrls:["./consulta.component.css"]
  })
  export class ConsultaComponent implements OnInit {
 
    public hoteis: Hotel[] = new Array();
    public titulo:string;
 
    constructor(public hotelService: HotelService,
                private router: Router){}
 
    ngOnInit() {
 
      /*SETA O TÍTULO */
      this.titulo = "Registros Cadastrados";
 
      /*CHAMA O SERVIÇO E RETORNA TODOS OS HOTEIS CADASTRADOS */
      this.hotelService.getHoteis().subscribe(res => this.hoteis = res);
    }
 
    /**EXCLUI UM REGISTRO QUANDO CLICAMOS NA OPÇÃO EXCLUIR DE UMA 
     * LINHA DA TABELA*/
    excluir(id:number, index:number):void {
 
      if(confirm("Deseja realmente excluir esse registro?")){
 
        /*CHAMA O SERVIÇO PARA REALIZAR A EXCLUSÃO */
        this.hotelService.excluirHotel(id).subscribe(response => {
 
              /**PEGA O RESPONSE DO SERVIÇO */
              let res:Response = <Response>response;
 
              /*1 = SUCESSO
              * MOSTRAMOS A MENSAGEM RETORNADA PELO SERVIÇO E DEPOIS REMOVEMOS
              O REGISTRO DA TABELA HTML*/
              if(res.codigo == 1){
                alert(res.mensagem);
                this.hoteis.splice(index,1);
              }
              else{
                /*0 = EXCEPTION GERADA NO SERVIÇO JAVA */
                alert(res.mensagem);
              }
          },
          (erro) => {                    
               /*MOSTRA ERROS NÃO TRATADOS */
               alert(erro);
          });        
      }
 
    }
 
    editar(id:number):void{
 
      this.router.navigate(['/cadastro-hotel',id]);
 
    }
 
  }