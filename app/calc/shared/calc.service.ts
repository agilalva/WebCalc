import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CalcService {

    private actionsList: [{ action: string, func: (a?: string) => void }] = [
        { action: "CE", func: this.clearEntry },
        { action: "C", func: this.clear },
        { action: "Del", func: this.delete },
        { action: "/", func: this.divide },
        { action: "*", func: this.multiply },
        { action: "-", func: this.substract },
        { action: "+", func: this.add },
        { action: "=", func: this.equals },
        { action: ".", func: this.dot },
        { action: "+/-", func: this.sign }
    ]

    private resultSource = new BehaviorSubject<string>("0");

    constructor() { }

    get result$() {
        return this.resultSource.asObservable();
    }

    process(action: string) {
        let actionAvailable = this.actionsList.find((obj) => obj.action === action);
        if (actionAvailable) {
            actionAvailable.func(action);
        } else {
            this.display(action);
        }
    }

    add() {
        console.log("added!");
    }

    clear() {
        console.log("cleared!");
    }

    clearEntry() {
        console.log("entry cleared!");
    }

    delete() {
        console.log("deleted!");
    }

    display(value: string) {
        let oldValue = this.resultSource.getValue();
        let newValue = Number(oldValue + value);
        this.resultSource.next(newValue.toString());
    }

    divide() {
        console.log("divided!");
    }

    dot() {
        console.log("dotted!");
    }

    equals() {
        console.log("equaled!");
    }

    multiply() {
        console.log("multiplied!");
    }

    sign() {
        console.log("sign changed!");
    }

    substract() {
        console.log("substracted!");
    }
}