import { Action, State, StateContext } from "@ngxs/store";
import { HeroeStateModel } from "./hero.model";
import { GetHeroe, HeroeData } from "./hero.actions";
import { HeroesService } from "../services/heroes.service";
import { Heroe } from "../classes/heroe";
import { Injectable } from '@angular/core';
import { TeamsService } from "../services/teams.service";


@Injectable()
@State<HeroeStateModel>({
    name: 'heroes',
    defaults: {
        heroes :  new Array<Heroe>,
        Heroe: undefined,
        total: 0
    }
})



export class HeroeState {

    public HeroArray: Array<Heroe>;

    constructor(
        private HeroeService: HeroesService,
        private TeamService: TeamsService
        ){}

    @Action(HeroeData)
    async get( ctx:  StateContext<HeroeStateModel>, action: HeroeData){
        this.HeroArray = [];
        let response = await this.HeroeService.getHeroes(action.payload.searchString, action.payload.page);
        console.log(response)
        response.arrayHeroe.forEach( (hero: any) => {
            let team = '';
            for ( const [key, value] of this.TeamService.teams){
                if (key == hero.id){
                    team = value
                }
            }
            let heroe: Heroe = {
                ...hero,
                teamColor: team
            }
            this.HeroArray.push(heroe);
        })

        
        ctx.setState({
            heroes:[
                
                ...this.HeroArray

            ],
            Heroe: undefined,
            total: Math.ceil(response.total /20)
        })
    }

    @Action(GetHeroe)
    async getHeroe(ctx: StateContext<HeroeStateModel>, action: GetHeroe) {
        let heroe = ctx.getState().heroes.find(heroe => heroe.id == action.payload)
        ctx.setState({
            ...ctx.getState(),
            Heroe: heroe
        });
    }

}
