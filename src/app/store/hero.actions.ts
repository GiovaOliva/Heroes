
export class HeroeData {
    static readonly type = '[Heroes] GetData'

    constructor(public readonly payload: {searchString?: string, page?: number}){}
   
}

export class GetHeroe{
    
    static readonly type = '[GetHeroe] Get';

    constructor(public readonly payload: string){}
}

export class SetTeam{
    static readonly type = '[SetTeam] Set';

    constructor(public readonly payload: {id: string, team:string}){}
}
