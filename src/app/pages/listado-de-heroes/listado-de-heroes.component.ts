import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';
import { Heroe } from '../../classes/heroe';
import { Select, Store } from '@ngxs/store';
import { HeroeData } from '../../store/hero.actions';
import { Observable, lastValueFrom } from 'rxjs';
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
  @Select(HeroesSelector.heroesState) public Heroes$: Observable<Heroe[]>;
  @Select(HeroesSelector.totalState) public total$: Observable<number>;
  public total: number


    constructor(
      private heroesService: HeroesService,
      private teamsService: TeamsService,
      private router:Router, 
      private store: Store,
      private changeDetectorRef: ChangeDetectorRef) { }

    public page = this.heroesService.page


    async ngOnInit(): Promise<void> {
 
      // await this.getAllHeroes();
      let payload = {searchString: this.searchString, page: this.heroesService.page}
      await lastValueFrom(this.store.dispatch(new HeroeData(payload)));
      this.changeDetectorRef.detectChanges();
      
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
      this.total$.subscribe((data) =>this.total = data);
      return this.total
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
  
    go_to(id: string): void{
      this.router.navigateByUrl('/heroe/'+id);
    }


    // async getAllHeroes(): Promise<void>{
      
    //   if (this.heroesService.condicion){
    //     await lastValueFrom(this.store.dispatch(new AllHeroes))
    //     this.AllHeroes$ = this.store.select(state => state.AllHeroes.AllHeroes)
    //     this.changeDetectorRef.detectChanges(); 
    //     this.heroesService.condicion = false;
    //   }

    // }

    

}   




