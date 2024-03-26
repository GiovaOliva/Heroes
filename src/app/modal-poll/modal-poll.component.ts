import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HeroProfileComponent } from '../pages/hero-profile/hero-profile.component';

@Component({
  selector: 'app-modal-poll',
  templateUrl: './modal-poll.component.html',
  styleUrls: ['./modal-poll.component.scss']
})
export class ModalPollComponent implements OnInit {
  public show_modal: boolean = false;
  @Input() public title_modal! : string;
  @Input() public team_selected! : string;
  @Output() setTeam:EventEmitter<string> = new EventEmitter<string>();

  constructor(private HeroProfile: HeroProfileComponent) { }

  ngOnInit() {
  }

  
  send_team(team: string): void {
    console.log("Im in child: ");
    this.HeroProfile.hisColor$.next(this.HeroProfile.heroeCodColor(team));
    console.log(team);
    this.setTeam.emit(team);
    this.toggle_modal();
  }
  
  toggle_modal(): void {
    this.show_modal = !this.show_modal;
  }
}
