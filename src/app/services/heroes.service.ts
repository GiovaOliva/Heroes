import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroe } from '../classes/heroe';
import { lastValueFrom } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })

  export class HeroesService {

    public page = 0;
    public step = 20;


    constructor(
      private http: HttpClient
      ) {}


    async getHeroes (nameStartsWith?: string, page?: number) :Promise <any> {      
     
      if (page || page === 0) {
        this.page = page;
      }

      const url = 'http://localhost:3000/api/marvel'+ '?offset=' + (this.page * this.step)
      + (nameStartsWith ? ('&searchString=' + nameStartsWith) : '');
      
      return await lastValueFrom(this.http.get(url));

    }
      
    resetPager() {
      this.page = 0;
    }

  }


