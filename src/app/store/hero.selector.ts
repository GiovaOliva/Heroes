import { Selector } from "@ngxs/store";
import { HeroeState } from "./hero.state";
import { HeroeStateModel } from "./hero.model";
import { Heroe } from "../classes/heroe";

export class HeroesSelector {
    @Selector([HeroeState])
    static heroesState({heroes}: HeroeStateModel): Heroe[]{
        return heroes
    }

    @Selector([HeroeState])
    static heroeState({Heroe}: HeroeStateModel): any{
        return Heroe
    }

    @Selector([HeroeState])
    static totalState({total}: HeroeStateModel): number{
        return total
    }
}