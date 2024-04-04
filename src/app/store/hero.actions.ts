
export class HeroeData {
    static readonly type = '[Heroes] GetData'

    constructor(public readonly payload: {searchString?: string, page?: number}){

    }
   
}

export class GetHeroe{
    static readonly type = '[GetHeroe] Get';

    constructor(public readonly payload: string){}
}
