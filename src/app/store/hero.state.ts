import { Action, State, StateContext } from "@ngxs/store";
import { HeroeStateModel } from "./hero.model";
import { HeroeData } from "./hero.actions";
import { HeroesService } from "../services/heroes.service";
import { Heroe } from "../classes/heroe";
import { Injectable } from '@angular/core';


@Injectable()
@State<HeroeStateModel>({
    name: 'heroes',
    defaults: {
        heroes :  new Array<Heroe>
    }
})



export class HeroeState {

    public HeroArray: Array<Heroe>;

    constructor(private HeroeService: HeroesService){}

    @Action(HeroeData)
    async get( ctx:  StateContext<HeroeStateModel>, action: HeroeData){

        this.HeroArray = await this.HeroeService.getHeroes(action.payload.searchString, action.payload.page);
        
        ctx.setState({
            heroes:[
                
                ...this.HeroArray

            ]
        })
    }

}
