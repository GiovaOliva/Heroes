

export class AllHeroes{
    
    static readonly type = '[AllHeroes] Get';

    
}

export class GetHeroe{
    static readonly type = '[GetHeroe] Get';

    constructor(public readonly payload: string){}
}

export class UpdateHeroe{
    static readonly type = '[UpdateHeroe] Update';

    constructor(public readonly payload: {id: string, team: string}){}
}