import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ModalPollComponent } from '../modal-poll/modal-poll.component';
import { Heroe } from '../../classes/heroe';
import { ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { Observable, Subject, lastValueFrom } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TeamsService } from 'src/app/services/teams.service';
import { Store } from '@ngxs/store';
import { GetHeroe, UpdateHeroe } from 'src/app/store/AllHeroes/heroes.actions';

@Component({
  selector: 'app-hero-profile',
  templateUrl: './hero-profile.component.html',
  styleUrls: ['./hero-profile.component.scss']
})
export class HeroProfileComponent implements OnInit {
  @ViewChild('modal') modal!: ModalPollComponent;
  private id : string;
  heroe$: Observable <Heroe>;
  public question_modal: string;
  public team:string = "";
  public heroe: any;
  hisColor$ = new Subject<string>();


  constructor(
    private route: ActivatedRoute,  
    private location: Location, 
    private changeDetectorRef: ChangeDetectorRef, 
    private teamsService: TeamsService,
    public store: Store
    ) {}
  
  


  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.store.dispatch(new GetHeroe(this.id));
    this.heroe$= await lastValueFrom(this.store.select(state => state.AllHeroes.Heroe).pipe(tap((heroe) => {
      this.heroe = heroe;
    })));
    
    this.changeDetectorRef.detectChanges();
    this.hisColor$.next(this.heroeCodColor(this.team));
    
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
    this.store.dispatch(new UpdateHeroe({id: this.id, team: this.team}));
    this.changeDetectorRef.detectChanges(); 
    this.hisColor$.next(this.heroeCodColor(team));
    
  }

  launchModal():void{
    //this.question_modal="¿Dónde ubicarías a tu súper héroe?";
    this.question_modal="¿En cual grupo quieres colocar a tu súper héroe?";
    this.modal.toggle_modal();
  }



  }

