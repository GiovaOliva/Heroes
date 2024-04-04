import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroe } from '../classes/heroe';
import { lastValueFrom } from 'rxjs';
import { TeamsService } from './teams.service';

  @Injectable({
    providedIn: 'root'
  })

  export class HeroesService {

   
    // private response: any;

    public page = 0;
    public step = 20;
    public total = 0;

    public heroes: Array<Heroe> = [];
    public condicion = true;

    constructor(
      private http: HttpClient
      ) {}


    async getHeroes (nameStartsWith?: string, page?: number) :Promise <any> {      
      if (page || page === 0) {
        this.page = page;
      }
      const url = 'http://localhost:3000/api/marvel'+ '?offset=' + (this.page * this.step)
      + (nameStartsWith ? ('&searchString=' + nameStartsWith) : '');
      
      // this.response = await lastValueFrom(this.http.get(url));
      // this.heroes = [];
      // this.total = Math.ceil(this.response.total / this.step)
      // this.response.heroes.forEach( (result:any) => {
      //   let team = '';
      //   for (const [key, value] of this.teamService.teams){
      //     if( key == result.id){
      //       team = value
      //     }
      //   }
      //   let heroe: Heroe = {
      //     ...result,
      //     teamColor: team || this.teamService.getTeamColor(result.id)
      //   }
      //   this.heroes.push(heroe);
      // })

      return await lastValueFrom(this.http.get(url));

    }
      

    // async getHeroe(id: string): Promise<Heroe> {
    //   const url = 'http://localhost:3000/api/marvel/'+id
    //   this.response = await lastValueFrom(this.http.get(url));
    //   const temp = this.response
    //   let heroe: Heroe = {
    //     id: temp.id,
    //     name: temp.name,
    //     description: temp.description,
    //     modified: temp.modified,
    //     thumbnail_path: temp.thumbnail_path,
    //     thumbnail_extension: temp.thumbnail_extension,
    //     resourceURI: temp.resourceURI,
    //     teamColor: this.teamService.getTeamColor(temp.id)
    //   }
    //   return heroe; 
    // }

    // async getAllHeroes(): Promise<Heroe[]>{
    //   console.log('estoy ejecuntando la funcion')
    //   let response: any
    //   const url = 'http://localhost:3000/api/marvel'
    //   response = await lastValueFrom(this.http.get<any>(url));
    //   response.forEach( (result: any) => {
    //     let heroe: Heroe = {
    //       id: result.id,
    //       name: result.name,
    //       description: result.description,
    //       modified: result.modified,
    //       thumbnail_path: result.thumbnail_path,
    //       thumbnail_extension: result.thumbnail_extension,
    //       resourceURI: result.resourceURI,
    //       teamColor: this.teamService.getTeamColor(result.id)
    //     }
    //     this.heroes.push(heroe);
    //   });
    //   return this.heroes        
    // };

    


    resetPager() {
      this.page = 0;
    }

  }


