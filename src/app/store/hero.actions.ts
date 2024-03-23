


export class HeroeData {
    static readonly type = '[Heroes] GetData'

    constructor(public readonly payload: {searchString: string, page: number}){

    }
   
}