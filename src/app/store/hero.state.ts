import { Action, State, StateContext } from "@ngxs/store";
import { HeroeStateModel } from "./hero.model";
import { GetHeroe, HeroeData, SetTeam } from "./hero.actions";
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
        total: 0,
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
        response.arrayHeroe.forEach( (hero: Heroe) => {
            let heroe: Heroe = {
                ...hero
            }
            this.HeroArray.push(heroe);
        })

        
        ctx.setState({
            heroes:[
                
                ...this.HeroArray

            ],
            Heroe: undefined,
            total: Math.ceil(response.total /20),

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

    @Action(SetTeam)
    async setTeam(ctx: StateContext<HeroeStateModel>, action: SetTeam) {
        let index = ctx.getState().heroes.findIndex( heroe => heroe.id == action.payload.id);
        this.HeroArray = [...ctx.getState().heroes]
        let heroe = { ...this.HeroArray[index]}
        const body = {id: action.payload.id, team: action.payload.team}
        if (heroe.teamColor == ''){
            this.TeamService.postHeroeTeam(body)
        }else{
            this.TeamService.patchHeroeTeam(body)            
        }
        heroe.teamColor = action.payload.team;
        this.HeroArray[index] = heroe;      
        ctx.patchState({
           ...ctx.getState,
           heroes: this.HeroArray,
        })
    }

}

