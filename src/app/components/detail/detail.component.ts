import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  id: string;
  elPokemon: any = {};
  laSpecie: any = {};
  evolutionChain: any = {};


  /////////////////////////////
  estadoCarga: boolean = true;
  nBloquesDatoAcargar: number = 3;
  nBloquesCargados: number = 0;
  /////////////////////////////



  constructor(
    private _route: ActivatedRoute,
    private _pokemonService: PokemonService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.getDatos();
  }

  getDatos(): void {

    this._route.params.subscribe({

      next: (params) => { this.id = params['id'] }
      ,
      error: (error) => { this._router.navigate(['/error']) }
      ,
      complete: () => { console.log("pokemonssss recibidossss") }

    });

    this._pokemonService.getPokemon((this.id)).subscribe({
      next: result => {
        this.elPokemon = result;
        console.log(result);
        console.log("url de species  " + this.elPokemon.species.url)
        //con la url de species consigo la evolution chain
      }
      ,
      error: e => { this._router.navigate(['/error']) }
      ,
      complete: () => {
        this.controlCarga();
        console.log("pokemon recibido por el suscriptor")
        //pokemon recibido, en tonces llamo a la especie
        this._pokemonService.getSpecie(this.elPokemon.species.url).subscribe({

          next: result => {
            this.laSpecie = result;

          }
          ,
          error: e => { this._router.navigate(['/error']) }
          ,
          complete: () => {
            console.log("especie rescibida por el suscriptor");
            console.log("la especie " + this.laSpecie);
            this.controlCarga();
            //aqui estoy segura de que la especie ha llegado...entonce llamo a evolution
            /*  
              this._pokemonService.getEvolutionChain(this.laSpecie.evolutionChain.url).subscribe({
  
                next: result => {
                  this.evolutionChain = result;
                }
                ,
                error: e => { this._router.navigate(['/error']) }
                ,
                complete: () => {
                  this.controlCarga();
                  console.log("cadena evolutiva recibida");
                  console.log("la cadena " + this.evolutionChain);
  
                }
  
              });
              */
          }

        });


      }

    });



  }

  controlCarga(): void {
    this.nBloquesCargados++;
    if (this.nBloquesCargados == this.nBloquesDatoAcargar) {
      this.estadoCarga = true;
    }
  }

}
