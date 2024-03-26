import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  
  public teamColors: Record<string, string> =  {
    azul: '#0000FF',
    violeta: '#8B00FF',
    naranjo: '#FFA500',
    verde: '#008000'
  };

  public teams = new Map();

  constructor() { }


  getTeamColor(id: string):string{
    if(this.teams.get(id)!=undefined){
      console.log(this.teams.get(id))
      return this.teams.get(id);
    }
    else{
      return "";
    }
  }

  getCodColor(teamName: string): string{
    return this.teamColors[teamName] || ""
  }


  

}
