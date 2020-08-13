// tslint:disable-next-line: class-name
interface _HospitalUser {
    _id: string,
    name: string,
    img: string
}

export class Hospital {
    constructor(
        public name: string,
        // tslint:disable-next-line: variable-name
        public _id?: string,
        public img?: string,
        public user?: _HospitalUser
    ) {}
}
