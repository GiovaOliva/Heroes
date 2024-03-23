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
  public heroeArray :  Heroe[];
  
   
    constructor(private heroesService: HeroesService, private router:Router) { }

    
    async ngOnInit() {
      
      this.heroeArray = await this.heroesService.getHeroes();
      console.log(this.heroeArray);

    }

    heroeCodColor(team: string): string{
      let codColor = this.heroesService.getCodColor(team)
      return codColor
    }

    getPage(): number{
      let page = this.heroesService.page;
      return page
    }
    getTotal(): number{
      let total = this.heroesService.total;
      return total
    }

    async submitSearch() {
      this.heroesService.resetPager();
      this.heroeArray = await this.heroesService.getHeroes(this.searchString);
    }
  
    async prevPage() {
      this.heroeArray = await this.heroesService.getHeroes(this.searchString, this.heroesService.page - 1);
    }
  
    async nextPage() {
      this.heroeArray = await this.heroesService.getHeroes(this.searchString, this.heroesService.page + 1);
    }
  
    go_to(id: string){
      this.router.navigateByUrl('/heroe/'+id);
    }

}
