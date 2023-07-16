import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  url:string;

  constructor(
    private _http:HttpClient
  ) {
    this.url=GLOBAL.API_URL;
   }

  getPokemons(nPokemons:number):Observable<any>{

    let headers = new HttpHeaders()
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin','*');

    return this._http.get(this.url + "?limit=" + nPokemons +" &offset=0",{headers});

  }
  getPokemon(id:string):Observable<any>{

    let headers = new HttpHeaders()
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin','*');

    return this._http.get(this.url + id, {headers});
  }

  getSpecie(url:string):Observable<any>{

    console.log(url);

    let headers = new HttpHeaders()
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin','*');

    return this._http.get(url, {headers});

  }
  getEvolutionChain(url:string):Observable<any>{

    console.log(url);

    let headers = new HttpHeaders()
    .set('content-type','application/json')
    .set('Access-Control-Allow-Origin','*');

    return this._http.get(url, {headers});

  }

}

