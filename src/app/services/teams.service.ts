import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

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

  public url = `http://localhost:3000/api/team`;

  constructor(
    private http: HttpClient
  ) { }


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

  async postHeroeTeam(body: {id: string, team: string}): Promise<void>{

    console.log(await lastValueFrom(this.http.post(this.url, body)));
  
  }

  async patchHeroeTeam(body: {id: string, team: string}): Promise<void>{

    console.log(await lastValueFrom(this.http.patch(this.url, body)));
  }

  

}
