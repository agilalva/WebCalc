import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CalcService {

    private actionsList: [{ action: string, exec: boolean, func: () => void }] = [
        { action: "CE", exec: true, func: () => this.clearEntry() },
        { action: "C", exec: true, func: () => this.clear() },
        { action: "Del", exec: true, func: () => this.delete() },
        { action: "/", exec: false, func: () => this.calcStorage /= this.currentValue },
        { action: "*", exec: false, func: () => this.calcStorage *= this.currentValue },
        { action: "-", exec: false, func: () => this.calcStorage -= this.currentValue },
        { action: "+", exec: false, func: () => this.calcStorage += this.currentValue },
        { action: "=", exec: true, func: () => this.equals() },
        { action: ".", exec: true, func: () => this.dot() },
        { action: "+/-", exec: true, func: () => this.sign() }
    ]

    private calcStorage: number = 0;
    private currentValue: number = 0;
    private resultSource = new Subject<string>();
    private selectedAction: any;

    constructor() { }

    get result$() {
        return this.resultSource.asObservable();
    }

    process(action: string) {
        let actionAvailable = this.actionsList.find((obj) => obj.action === action);
        if (actionAvailable) {
            if (actionAvailable.exec) {
                actionAvailable.func();
            } else if (this.selectedAction) {
                this.equals();
                this.selectedAction = actionAvailable.func;
            } else {
                if (this.calcStorage == 0) {
                    this.calcStorage = this.currentValue;
                }
                this.currentValue = 0;
                this.selectedAction = actionAvailable.func;
            }
        }
        else {
            this.display(action);
        }
    }

    clear() {
        this.currentValue = 0;
        this.calcStorage = 0;
        this.selectedAction = null;
        this.resultSource.next("0");
    }

    clearEntry() {
        this.currentValue = 0;
        this.resultSource.next("0");
    }

    delete() {
        console.log("deleted!");
    }

    display(value: string) {
        let newValue = Number(this.currentValue + value);
        this.currentValue = newValue;
        this.resultSource.next(this.currentValue.toString());
    }

    dot() {
        console.log("dotted!");
    }

    equals() {
        this.selectedAction();
        this.currentValue = 0;
        this.selectedAction = null;
        this.resultSource.next(this.calcStorage.toString());
    }

    sign() {
        console.log("sign changed!");
    }
}