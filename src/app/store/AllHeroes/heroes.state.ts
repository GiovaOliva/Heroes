import { Action, State, StateContext } from "@ngxs/store";
import { AllHeroesStateModel } from "./heroes.model";
import { Heroe } from "src/app/classes/heroe";
import { Injectable } from '@angular/core';
import { HeroesService } from "src/app/services/heroes.service";
import { AllHeroes, GetHeroe, UpdateHeroe } from "./heroes.actions";




@Injectable()
@State<AllHeroesStateModel>({
    name: 'AllHeroes',
    defaults: {
        AllHeroes: new Array<Heroe>,
        Heroe: undefined
    }

})


export class AllHeroesState {

    AllHeroes: Heroe[];



    constructor(private HeroeService: HeroesService) { }

    @Action(AllHeroes)
    async get(ctx: StateContext<AllHeroesStateModel>, action: AllHeroes) {

        this.AllHeroes = await this.HeroeService.getAllHeroes();
        ctx.setState({
            ...ctx.getState(),
            AllHeroes: [
                ...this.AllHeroes
            ],
            Heroe: undefined
        })
        console.log('guarde la data en el store')
    }


    @Action(GetHeroe)
    async getHeroe(ctx: StateContext<AllHeroesStateModel>, action: GetHeroe) {
        let heroe = ctx.getState().AllHeroes.find(heroe => heroe.id == action.payload)
        ctx.setState({
            ...ctx.getState(),
            Heroe: heroe
        });
    }


    @Action(UpdateHeroe)
    async updateHeroe( ctx: StateContext<AllHeroesStateModel>, action: UpdateHeroe ){
        let index = ctx.getState().AllHeroes.findIndex( heroe => heroe.id == action.payload.id);
        this.AllHeroes = [...ctx.getState().AllHeroes]
        let heroe = { ...this.AllHeroes[index]}
        heroe.teamColor = action.payload.team;
        this.AllHeroes[index] = heroe;
        
        ctx.patchState({
            AllHeroes: [
                ...this.AllHeroes
            ],
            Heroe: heroe
        })
    }

}