import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroe } from './classes/heroe';

@Injectable({
  providedIn: 'root'
})

export class HeroesService {

  private protocol = 'https:';
  private ApiUrl = '//gateway.marvel.com:443/v1/public/';
  public heroes: Array<Heroe> = [];

  public page = 0;
  public step = 20;
  public total = 0;

  group_colors: TeamColors = {
    azul: '#0000FF',
    violeta: '#8B00FF',
    naranjo: '#FFA500',
    verde: '#008000'
  };

  public teams = new Map();


  yourApiKey = 'ab30297f4880c92fff8d0a6fa9461ef1'; // Replace with your actual key

  constructor(private http: HttpClient) { }

  resetPager() {
    this.page = 0;
  }

  getHeroes (nameStartsWith?: string, page?: number) {
    console.log("TEAMS");
    console.log(Array.from(this.teams));
    if (page || page === 0) {
      this.page = page;
    }
    const url = this.protocol + this.ApiUrl + `characters?ts=1&apikey=${this.yourApiKey}&hash=e66f6d4113c62a340eccea2bbe11aef7`
    + '&offset=' + (this.page * this.step)
    + (nameStartsWith ? ('&nameStartsWith=' + nameStartsWith) : '');
    this.http.get(url).subscribe((response) => {
      this.heroes = [];
      const data = response as { data: any}
      this.total = Math.ceil(data.data.total / this.step);
      data.data.results.forEach( (result: any) => {
          this.heroes.push(new Heroe(
            result.id,
            result.name,
            result.description,
            result.modified,
            result.thumbnail.path,
            result.thumbnail.extension,
            result.resourceURI,
            this.getTeamColor(result.id)
          ));
        }
        
      );
    
    });
  }


  getTeamColor(id: string):string{
    if(this.teams.get(id)!=undefined){
      return this.teams.get(id);
    }
    else{
      return "";
    }
  }

  getHeroe(id: string) {
    const url = this.protocol + this.ApiUrl + 'characters/' + id + `characters?ts=1&apikey=${this.yourApiKey}&hash=e66f6d4113c62a340eccea2bbe11aef7`;
    return this.http.get(url);
  }

}

interface TeamColors {
  azul: string;
  violeta: string;
  naranjo: string;
  verde: string;
}

/*  ngOnInit() {
    this.http.get(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${this.yourApiKey}&hash=e66f6d4113c62a340eccea2bbe11aef7`)
      .subscribe((response) => {
        console.log('Respuesta de la API:', response);
        const data = response as { data: any }
        console.log(data.data.results)

      },
        (error) => {
          console.error('Error:', error); // Handle errors gracefully
        });
  }*/