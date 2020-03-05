import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
//import { HttpHeaders} from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
 
import { Observable } from 'rxjs';
 
import {Hotel} from '../services/hotel';
import {ConfigService} from './config.service';
 
@Injectable()
export class HotelService {
 
    private baseUrlService:string = '';
    private headers:Headers;
    private options:HttpRequest<Headers>;
 
    constructor(private httpClient: HttpClient,
                private configService: ConfigService) { 
 
        /**SETANDO A URL DO SERVIÇO REST QUE VAI SER ACESSADO */
        this.baseUrlService = configService.getUrlService() + '/hotel/';
 
        /*ADICIONANDO O JSON NO HEADER */
        this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8' });                
        //this.options = new HttpRequest({ headers: this.headers });
    }
 
    /**CONSULTA HOTEIS CADASTRADOS */
    getHoteis(): Observable<Hotel[]>{        
        return this.httpClient.get<Hotel[]>(this.baseUrlService);
    }
 
    /**ADICIONA UM NOVO HOTEL */
    addHotel(hotel: Hotel){
 
        return this.httpClient.post(this.baseUrlService, JSON.stringify(hotel));
    }
    /**EXCLUI UM HOTEL */
    excluirHotel(id:number){
 
        return this.httpClient.delete(this.baseUrlService + id);
    }
 
    /**CONSULTA UM HOTEL PELO CÓDIGO */
    getHotel(id:number): Observable<Hotel>{
 
        return this.httpClient.get<Hotel>(this.baseUrlService + id);
    }
 
    /**ATUALIZA INFORMAÇÕES DO HOTEL */
    atualizarHotel(hotel:Hotel){
 
        return this.httpClient.put(this.baseUrlService, JSON.stringify(hotel));
    }
 
}