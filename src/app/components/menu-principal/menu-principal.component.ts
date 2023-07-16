import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

  elPokemon: string = "";

  constructor(
    private _router: Router,
    
  ){}

  onSubmit(): void {

    //de esta forma en la url navega hasta el id que metemos pero no se recarga la página
    this._router.navigate(['detail/' + this.elPokemon]).then(
      () => {
        window.location.reload() //forzamos la recarga 
      }
    );
    this.elPokemon ="";

  }
  verPokemon(id:string) : void{
   
    this._router.navigate(['detail/' + id]).then(
      () => {
        window.location.reload()
      }
    );
    this.elPokemon ="";

  }




  ngOnInit(): void {


  }

}
