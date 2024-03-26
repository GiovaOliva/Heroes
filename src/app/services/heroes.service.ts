  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Heroe } from '../classes/heroe';
  import { lastValueFrom } from 'rxjs';
import { TeamsService } from './teams.service';

  @Injectable({
    providedIn: 'root'
  })

  export class HeroesService {

    private protocol = 'https:';
    private ApiUrl = '//gateway.marvel.com:443/v1/public/';
    private ApiKey = 'ab30297f4880c92fff8d0a6fa9461ef1'; 
    private response: any;

    public page = 0;
    public step = 20;
    public total = 0;

    public heroes: Array<Heroe> = [];
    public heroe: Heroe;

    constructor(
      private http: HttpClient, 
      private teamService: TeamsService) {}


    async getHeroes (nameStartsWith?: string, page?: number) :Promise <Heroe[]> {      
      if (page || page === 0) {
        this.page = page;
      }
      const url = this.protocol + this.ApiUrl + `characters?ts=1&apikey=${this.ApiKey}&hash=e66f6d4113c62a340eccea2bbe11aef7`
      + '&offset=' + (this.page * this.step)
      + (nameStartsWith ? ('&nameStartsWith=' + nameStartsWith) : '');
      this.response = await lastValueFrom(this.http.get(url));
      this.heroes = [];
      this.total = Math.ceil(this.response.data.total / this.step);
      this.response.data.results.forEach( (result : any) => {
        let team = '';
        for (const [key, value] of this.teamService.teams){
          if( key === result.id+ 'characters'){
            team = value
          }
        }
        this.heroes.push(new Heroe(
          result.id,
          result.name,
          result.description,
          result.modified,
          result.thumbnail.path,
          result.thumbnail.extension,
          result.resourceURI,
          team || this.teamService.getTeamColor(result.id),
        ))
      })

      return this.heroes;

    }
      

    async getHeroe(id: string): Promise<Heroe> {
      const url = this.protocol + this.ApiUrl + 'characters/' + id + `characters?ts=1&apikey=${this.ApiKey}&hash=e66f6d4113c62a340eccea2bbe11aef7`;
      this.response = await lastValueFrom(this.http.get(url));
      const temp = this.response.data.results[0];
      this.heroe = new Heroe(
       temp.id,
       temp.name,
       temp.description,
       temp.modified,
       temp.thumbnail.path,
       temp.thumbnail.extension,
       temp.resourceURI,
       this.teamService.getTeamColor(temp.id)
      )
      return this.heroe
    }


    resetPager() {
      this.page = 0;
    }

  }


