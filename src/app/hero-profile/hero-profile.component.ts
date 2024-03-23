import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ModalPollComponent } from '../modal-poll/modal-poll.component';
import { Heroe } from '../classes/heroe';
import { ActivatedRoute} from '@angular/router';
import { HeroesService } from '../heroes.service';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';

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

  constructor(private route: ActivatedRoute, private heroesService: HeroesService, private location: Location, private changeDetectorRef: ChangeDetectorRef) { }
  
  


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.heroesService.getHeroe(this.id).subscribe(response => {
        const data = response as { data: any; };
        const temp = data.data.results[0];
        console.log(temp);
        this.heroe = new Heroe(temp.id, temp.name, temp.description, temp.modified, temp.thumbnail.path, temp.thumbnail.extension, temp.resourceURI, this.heroesService.getTeamColor(temp.id));
        console.log("Tiene equipo?");
        console.log(this.heroe.teamColor);
        this.team = this.heroe.teamColor;
        this.changeDetectorRef.detectChanges();
        this.hisColor$.next(this.heroeCodColor(this.team));
        })
      });
      
    };

 

  heroeCodColor(team: string): string{
    let codColor = this.heroesService.getCodColor(team)
    return codColor
  }

  goBack() {
    this.location.back();
  }

  getTeam(team: string): void {
    console.log("Color:", team);
    this.team = team;
    console.log(this.heroe.id)
    this.heroesService.teams.set(this.heroe.id, this.team); // Assuming teams is a Map
    this.changeDetectorRef.detectChanges(); // Update
    this.hisColor$.next(this.heroeCodColor(team));
    
  }

  launchModal():void{
    //this.question_modal="¿Dónde ubicarías a tu súper héroe?";
    this.question_modal="¿En cual grupo quieres colocar a tu súper héroe?";
    this.modal.toggle_modal();
    console.log(this.team)
  }



  }

