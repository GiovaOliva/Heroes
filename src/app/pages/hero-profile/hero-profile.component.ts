import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ModalPollComponent } from '../modal-poll/modal-poll.component';
import { Heroe } from '../../classes/heroe';
import { ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { TeamsService } from 'src/app/services/teams.service';
import { Select, Store } from '@ngxs/store';
import { GetHeroe } from 'src/app/store/AllHeroes/heroes.actions';
import { HeroesSelector } from 'src/app/store/hero.selector';

@Component({
  selector: 'app-hero-profile',
  templateUrl: './hero-profile.component.html',
  styleUrls: ['./hero-profile.component.scss']
})
export class HeroProfileComponent implements OnInit {
  @ViewChild('modal') modal!: ModalPollComponent;
  private id : string;
  public question_modal: string;
  public team:string = "";
  hisColor$ = new Subject<string>();
  @Select(HeroesSelector.heroeState) public Heroe$: Observable<Heroe>;


  constructor(
    private route: ActivatedRoute,  
    private location: Location, 
    private changeDetectorRef: ChangeDetectorRef, 
    private teamsService: TeamsService,
    public store: Store,
    ) {}
  
  


  async ngOnInit(): Promise<void> {
    
    this.route.params.subscribe(params => {

      this.id = params['id'];

    });

    this.store.dispatch(new GetHeroe(this.id));
    this.Heroe$.subscribe(data => {
      
      if(data){
        this.team = data.teamColor
        this.changeDetectorRef.detectChanges();
        this.hisColor$.next(this.heroeCodColor(this.team));
      }

    })
    
    }

  heroeCodColor(team: string): string{
    let codColor = this.teamsService.getCodColor(team)
    return codColor
  }

  goBack(): void{
    this.location.back();
  }

  setTeam(team: string): void {

    this.team = team;
    this.teamsService.teams.set(this.id, this.team)
    this.changeDetectorRef.detectChanges(); 
    this.hisColor$.next(this.heroeCodColor(team));
    
  }

  launchModal():void{

    this.question_modal="¿En cual grupo quieres colocar a tu súper héroe?";
    this.modal.toggle_modal();

  }



  }

