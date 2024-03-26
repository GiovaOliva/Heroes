import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ModalPollComponent } from '../modal-poll/modal-poll.component';
import { Heroe } from '../../classes/heroe';
import { ActivatedRoute} from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-hero-profile',
  templateUrl: './hero-profile.component.html',
  styleUrls: ['./hero-profile.component.scss']
})
export class HeroProfileComponent implements OnInit {
  @ViewChild('modal') modal!: ModalPollComponent;
  private id : string;
  public heroe: Heroe;
  public question_modal: string;
  public team:string = "";
  hisColor$ = new Subject<string>();

  constructor(
    private route: ActivatedRoute, 
    private heroesService: HeroesService, 
    private location: Location, 
    private changeDetectorRef: ChangeDetectorRef, 
    private teamsService: TeamsService) {}
  
  


  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    })
    this.heroe = await this.heroesService.getHeroe(this.id);
    console.log("Tiene equipo?");
    console.log(this.heroe.teamColor);
    this.team = this.heroe.teamColor;
    this.changeDetectorRef.detectChanges();
    this.hisColor$.next(this.heroeCodColor(this.team));
      
    };

 

  heroeCodColor(team: string): string{
    let codColor = this.teamsService.getCodColor(team)
    return codColor
  }

  goBack(): void{
    this.location.back();
  }

  setTeam(team: string): void {
    console.log("Color:", team);
    this.team = team;
    this.teamsService.teams.set(this.heroe.id, this.team);
    this.changeDetectorRef.detectChanges(); 
    this.hisColor$.next(this.heroeCodColor(team));
    
  }

  launchModal():void{
    //this.question_modal="¿Dónde ubicarías a tu súper héroe?";
    this.question_modal="¿En cual grupo quieres colocar a tu súper héroe?";
    this.modal.toggle_modal();
  }



  }

