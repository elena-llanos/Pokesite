import { PokemonService } from './../../services/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { GLOBAL } from 'src/app/services/global';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  aPokemons: Array<any>;

  //////////////////////// Mat-Paginator
  length = 120;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [12, 18, 24];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent;
  filteredArray:Array<any> = [];

  onPaginateChange(e: PageEvent){
    this.filteredArray = this.aPokemons.slice(
      e.pageIndex *  e.pageSize , 
      e.pageIndex * e.pageSize + e.pageSize
    )

  }
  
  handlePageEvent(e: PageEvent) {
    
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }
  //////////////////////////////////////


  constructor(
    private _pokemonService: PokemonService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getDatos();
  }


  getDatos(): void {

    this._pokemonService.getPokemons(32).subscribe({

      next: (result) => {
        console.log(result.results)
        this.aPokemons = result.results;
        this.filteredArray = this.aPokemons.slice(0,this.pageSize)
        
        for (let pokemon of this.aPokemons) {
          pokemon.id = this.getPokemonId(pokemon.url);
          pokemon.urlImages = GLOBAL.URL_IMAGES + pokemon.id + '.png'
        }
        console.log(this.aPokemons);
      }
      ,
      error: (error) => { this._router.navigate(['error']) }
      ,
      complete: () => { console.log("Observer got data") }
    });

  }

  getPokemonId(url: string): string {
    let id: string = url.slice(34, -1);
    return id;

  }


}

