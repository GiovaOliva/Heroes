import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';
import { HeroesService } from '../heroes.service';
import { Router } from '@angular/router';
import { Heroe } from '../classes/heroe';
import { Store } from '@ngxs/store';
import { HeroeData } from '../store/hero.actions';


@Component({
  selector: 'app-listado-de-heroes',
  templateUrl: './listado-de-heroes.component.html',
  styleUrls: ['./listado-de-heroes.component.scss']
})
export class ListadoDeHeroesComponent implements OnInit {
  public title = 'Tutorial de Angular - Héroes de Marvel';
  public searchString!: string;
  // The child component : spinner
  @ViewChild('spi') spinner!: SpinnerComponent;
  /* public heroes: Array<Heroe> = []; */

   
    constructor(public heroesService: HeroesService, private router:Router) { }

    submitSearch() {
      this.heroesService.resetPager();
      this.heroesService.getHeroes(this.searchString);
    }
  
    prevPage() {
      this.heroesService.getHeroes(this.searchString, this.heroesService.page - 1);
    }
  
    nextPage() {
      this.heroesService.getHeroes(this.searchString, this.heroesService.page + 1);
    }
  
    go_to(id: string){
      this.router.navigateByUrl('/heroe/'+id);
    }

    ngOnInit() {
      this.heroesService.getHeroes();
      
  

    }
}
