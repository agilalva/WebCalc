import { Injectable } from '@angular/core';

@Injectable()
export class CalcService {

    constructor() { }

    process(action: string) {
        console.log(action);
    }
}