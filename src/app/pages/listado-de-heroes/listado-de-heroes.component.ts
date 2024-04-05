import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';
import { Heroe } from '../../classes/heroe';
import { Store } from '@ngxs/store';
import { HeroeData } from '../../store/hero.actions';
import { lastValueFrom } from 'rxjs';
import { TeamsService } from 'src/app/services/teams.service';
import { HeroesSelector } from 'src/app/store/hero.selector';

@Component({
  selector: 'app-listado-de-heroes',
  templateUrl: './listado-de-heroes.component.html',
  styleUrls: ['./listado-de-heroes.component.scss']
})

export class ListadoDeHeroesComponent implements OnInit {
  
  public title = 'Tutorial de Angular - Héroes de Marvel';
  public searchString: string
  public heroes: Array<Heroe>
  public total: number

    constructor(
      private heroesService: HeroesService,
      private teamsService: TeamsService,
      private router:Router, 
      private store: Store,
      ) { }

    async ngOnInit(): Promise<void> {
 
      await this.actualizarHeroes({searchString: this.searchString, page: this.heroesService.page})
      
    } 

    async submitSearch(): Promise<void> {
      
      this.heroesService.resetPager();
      await this.actualizarHeroes({searchString: this.searchString});
    
    }
  
    async prevPage(): Promise<void> {
        
      await this.actualizarHeroes({searchString: this.searchString, page: this.heroesService.page - 1});
        
      }
      
    async nextPage(): Promise<void> {
      
      await this.actualizarHeroes({searchString: this.searchString, page: this.heroesService.page + 1});
    
    }
    
    async actualizarHeroes(payload: object): Promise<void> { 

      await lastValueFrom(this.store.dispatch(new HeroeData(payload)));
      this.heroes = this.store.selectSnapshot(HeroesSelector.heroesState);
      this.total = this.store.selectSnapshot(HeroesSelector.totalState);
   
    }
    
    go_to(id: string): void{

      this.router.navigateByUrl('/heroe/'+id);
    
    }

    heroeCodColor(team: string): string{

      return this.teamsService.getCodColor(team)

    }

    getPage(): number{

      return this.heroesService.page;

    }

  }   