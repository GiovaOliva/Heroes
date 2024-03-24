import { Component, OnInit, ViewChild } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';
import { HeroesService } from '../heroes.service';
import { Router } from '@angular/router';
import { Heroe } from '../classes/heroe';
import { Store } from '@ngxs/store';
import { HeroeData } from '../store/hero.actions';
import { Observable, Subject, lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-listado-de-heroes',
  templateUrl: './listado-de-heroes.component.html',
  styleUrls: ['./listado-de-heroes.component.scss']
})
export class ListadoDeHeroesComponent implements OnInit {
  public title = 'Tutorial de Angular - Héroes de Marvel';
  public searchString: string;
  // The child component : spinner
  @ViewChild('spi') spinner!: SpinnerComponent;
  /* public heroes: Array<Heroe> = []; */
  hisColor$ = new Subject<string>();
  heroeArray$: Observable<Heroe[]>;

  
  
   
    constructor(private heroesService: HeroesService, private router:Router, public store: Store) { }

    
    async ngOnInit(): Promise<void> {
      
      const payload = {searchString: '', page: 0}
      await lastValueFrom(this.store.dispatch(new HeroeData(payload)));
      this.heroeArray$ = this.store.select(state => state.heroes.heroes)
   
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

    async submitSearch(): Promise<void> {
      this.heroesService.resetPager();
      const payload = {searchString: this.searchString}
      await lastValueFrom(this.store.dispatch(new HeroeData(payload)));
    }
  
    async prevPage(): Promise<void> {
        
        const payload = {page: this.heroesService.page - 1}
        await lastValueFrom(this.store.dispatch(new HeroeData(payload)));
      }
      
   
      // this.heroeArray = await this.heroesService.getHeroes(this.searchString, this.heroesService.page - 1);
    
  
    async nextPage(): Promise<void> {
      const payload = {page: this.heroesService.page + 1}
      await lastValueFrom(this.store.dispatch(new HeroeData(payload)));
  
      // this.heroeArray = await this.heroesService.getHeroes(this.searchString, this.heroesService.page + 1);
    }
  
    go_to(id: string){
      this.router.navigateByUrl('/heroe/'+id);
    }

} 




