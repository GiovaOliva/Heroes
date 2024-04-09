import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ModalPollComponent } from '../modal-poll/modal-poll.component';
import { Heroe } from '../../classes/heroe';
import { ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { TeamsService } from 'src/app/services/teams.service';
import { Store } from '@ngxs/store';
import { GetHeroe } from 'src/app/store/hero.actions';
import { HeroesSelector } from 'src/app/store/hero.selector';
import { SetTeam } from 'src/app/store/hero.actions';

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
  public hisColor$ = new Subject<string>();
  public heroe: Heroe;


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
    this.heroe = this.store.selectSnapshot(HeroesSelector.heroeState)
    this.team = this.heroe.teamColor
    this.changeDetectorRef.detectChanges();
    this.hisColor$.next(this.heroeCodColor(this.team))
    
    }

  heroeCodColor(team: string): string{

    return this.teamsService.getCodColor(team)
  
  }

  goBack(): void{

    this.location.back();
  
  }

  setTeam(team: string): void {

    this.team = team;
    this.store.dispatch(new SetTeam({id: this.id, team: this.team}))
    
    this.changeDetectorRef.detectChanges(); 
    this.hisColor$.next(this.heroeCodColor(team));
    this.store.dispatch(new GetHeroe(this.id));
    this.heroe = this.store.selectSnapshot(HeroesSelector.heroeState)
    
  }

  launchModal():void{

    this.question_modal="¿En cual grupo quieres colocar a tu súper héroe?";
    this.modal.toggle_modal();

  }

  }

