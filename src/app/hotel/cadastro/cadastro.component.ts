import { Component, OnInit } from '@angular/core';
 
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
 
import {HotelService} from '../../services/hotel.service';
 
import {Hotel} from '../../services/hotel';
 
import {Response} from '../../services/response';
 
import { Observable } from 'rxjs';
 
@Component({
    selector: 'app-cadastro-hotel',
    templateUrl: './cadastro.component.html',
    styleUrls:["./cadastro.component.css"]
  })
  export class CadastroComponent implements OnInit {
 
    public titulo:string;
    public hotel:Hotel = new Hotel();
 
    constructor(private hotelService: HotelService,
                private router: Router,
                private activatedRoute: ActivatedRoute){}
 
    /*CARREGADO NA INICIALIZAÇÃO DO COMPONENTE */
    ngOnInit() {
 
      this.activatedRoute.params.subscribe(parametro=>{
 
        if(parametro["idHotel"] == undefined){
 
          this.titulo = "Novo Cadastro de Hotel";
        }
        else{
 
          this.titulo = "Editar Cadastro de Hotel";
          this.hotelService.getHotel(Number(parametro["idHotel"])).subscribe(res => this.hotel = res);
        }
 
 
      });      
    }
 
    /*FUNÇÃO PARA SALVAR UM NOVO REGISTRO OU ALTERAÇÃO EM UM REGISTRO EXISTENTE */
    salvar():void {
 
      /*SE NÃO TIVER CÓDIGO VAMOS INSERIR UM NOVO REGISTRO */
      if(this.hotel.idHotel == undefined){
 
        /*CHAMA O SERVIÇO PARA ADICIONAR UMA NOVA PESSOA */
        this.hotelService.addHotel(this.hotel).subscribe(response => {
 
           //PEGA O RESPONSE DO RETORNO DO SERVIÇO
           let res:Response = <Response>response;
 
           /*SE RETORNOU 1 DEVEMOS MOSTRAR A MENSAGEM DE SUCESSO
           E LIMPAR O FORMULÁRIO PARA INSERIR UM NOVO REGISTRO*/
           if(res.codigo == 1){
            alert(res.mensagem);
            this.hotel = new Hotel();
           }
           else{
             /*
             ESSA MENSAGEM VAI SER MOSTRADA CASO OCORRA ALGUMA EXCEPTION
             NO SERVIDOR (CODIGO = 0)*/
             alert(res.mensagem);
           }
         },
         (erro) => {   
           /**AQUI VAMOS MOSTRAR OS ERROS NÃO TRATADOS
             EXEMPLO: SE APLICAÇÃO NÃO CONSEGUIR FAZER UMA REQUEST NA API                        */                 
            alert(erro);
         });
 
      }
      else{
 
        /*AQUI VAMOS ATUALIZAR AS INFORMAÇÕES DE UM REGISTRO EXISTENTE */
        this.hotelService.atualizarHotel(this.hotel).subscribe(response => {
 
        //PEGA O RESPONSE DO RETORNO DO SERVIÇO
        let res:Response = <Response>response;
 
         /*SE RETORNOU 1 DEVEMOS MOSTRAR A MENSAGEM DE SUCESSO
           E REDIRECIONAR O USUÁRIO PARA A PÁGINA DE CONSULTA*/
        if(res.codigo == 1){
          alert(res.mensagem);
          this.router.navigate(['/consulta-hotel']);
        }
         else{
          /*ESSA MENSAGEM VAI SER MOSTRADA CASO OCORRA ALGUMA EXCEPTION
          NO SERVIDOR (CODIGO = 0)*/
           alert(res.mensagem);
         }
       },
       (erro) => {                    
         /**AQUI VAMOS MOSTRAR OS ERROS NÃO TRATADOS
          EXEMPLO: SE APLICAÇÃO NÃO CONSEGUIR FAZER UMA REQUEST NA API                        */                 
          alert(erro);
       });
      }
 
    }
 
  }