import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';
import { Heroe } from '../../classes/heroe';
import { Store } from '@ngxs/store';
import { HeroeData } from '../../store/hero.actions';
import { Observable, lastValueFrom } from 'rxjs';
import { TeamsService } from 'src/app/services/teams.service';


@Component({
  selector: 'app-listado-de-heroes',
  templateUrl: './listado-de-heroes.component.html',
  styleUrls: ['./listado-de-heroes.component.scss']
})
export class ListadoDeHeroesComponent implements OnInit {
  
  public title = 'Tutorial de Angular - Héroes de Marvel';
  heroeArray$: Observable<Heroe[]>;
  public searchString: string

    constructor(
      private heroesService: HeroesService,
      private teamsService: TeamsService,
      private router:Router, public store: Store) { }

    public page = this.heroesService.page


    async ngOnInit(): Promise<void> {
 
      const payload = {searchString: this.searchString, page: this.page}
      await lastValueFrom(this.store.dispatch(new HeroeData(payload)));
      this.heroeArray$ = this.store.select(state => state.heroes.heroes)
   
    }

    heroeCodColor(team: string): string{
      let codColor = this.teamsService.getCodColor(team)
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

    async submitSearch(): Promise<void> {
      this.heroesService.resetPager();
      const payload = {searchString: this.searchString}
      await lastValueFrom(this.store.dispatch(new HeroeData(payload)));
    }
  
    async prevPage(): Promise<void> {
        
        const payload = {searchString: this.searchString, page: this.heroesService.page - 1}
        await lastValueFrom(this.store.dispatch(new HeroeData(payload)));
      }
      
   
      // this.heroeArray = await this.heroesService.getHeroes(this.searchString, this.heroesService.page - 1);
    
  
    async nextPage(): Promise<void> {
      const payload = {searchString: this.searchString, page: this.heroesService.page + 1}
      await lastValueFrom(this.store.dispatch(new HeroeData(payload)));
    }
          // this.heroeArray = await this.heroesService.getHeroes(this.searchString, this.heroesService.page + 1);
  
    go_to(id: string){
      this.router.navigateByUrl('/heroe/'+id);
    }

} 




