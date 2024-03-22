import { Action, State, StateContext } from "@ngxs/store";
import { HeroeStateModel } from "./hero.model";
import { HeroeData } from "./hero.actions";
import { HeroesService } from "../heroes.service";
import { Heroe } from "../classes/heroe";
import { Injectable } from '@angular/core';



@Injectable()
@State<HeroeStateModel>({
    name: 'heroes',
    defaults: {
        heroArray :  new Array<Heroe>
    }
})

export class HeroeState {

    public Arrayheroes: Array<Heroe> = [];
    public page = 0;
    public step = 20;
    public total = 0;
    constructor(private HeroService: HeroesService){}

    @Action(HeroeData)
    get( ctx:  StateContext<HeroeStateModel>, action: HeroeData){
        let offset = action.payload;
        const state = ctx.getState();
        ctx.setState({
            ...state,
            heroArray:[
                ...state.heroArray,
                ...this.Arrayheroes
                
            ]
        })
      }
}

