export class Heroe {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public modified: Date,
        public thumbnail_path: string,
        public thumbnail_extension: string,
        public resourceURI: string,
        public teamColor: string,
    ) {}
}