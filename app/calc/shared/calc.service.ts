import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CalcService {

    // List of standard functions available for this calc
    private actionsList: [{ action: string, exec: boolean, func: () => void }] = [
        { action: 'CE', exec: true, func: () => this.clearEntry() },
        { action: 'C', exec: true, func: () => this.clear() },
        { action: 'Del', exec: true, func: () => this.delete() },
        { action: '/', exec: false, func: () => this.calcStorage /= this.getCurrentValue() },
        { action: '*', exec: false, func: () => this.calcStorage *= this.getCurrentValue() },
        { action: '-', exec: false, func: () => this.calcStorage -= this.getCurrentValue() },
        { action: '+', exec: false, func: () => this.calcStorage += this.getCurrentValue() },
        { action: '=', exec: true, func: () => this.equals() },
        { action: '.', exec: true, func: () => this.dot() },
        { action: '+/-', exec: true, func: () => this.sign() }
    ]

    private calcStorage: number = 0;
    private isNewValue = true;
    private resultSource = new BehaviorSubject<string>('0');
    private selectedAction: () => void;

    /**
     * Data stream available for components
     */
    get result$() {
        return this.resultSource.asObservable();
    }

    /**
    * 
    */
    process(action: string) {
        let actionAvailable = this.actionsList.find((obj) => obj.action === action);
        if (actionAvailable) {
            if (actionAvailable.exec) {
                actionAvailable.func();
            } else if (this.selectedAction) {
                this.equals();
                this.selectedAction = actionAvailable.func;
            } else {
                this.isNewValue = true;
                this.calcStorage = this.getCurrentValue();
                this.selectedAction = actionAvailable.func;
            }
        }
        else {
            this.display(action);
        }
    }

    /**
     * 'C' function. Resets all data.
     */
    private clear() {
        this.isNewValue = true;
        this.calcStorage = 0;
        this.selectedAction = null;
        this.resultSource.next('0');
    }

    /**
     * 'CE' function. Resets the last entry
     */
    private clearEntry() {
        this.isNewValue = true;
        this.resultSource.next('0');
    }

    /**
     * 'Del' function. Deletes char by char from right to left.
     */
    private delete() {
        let oldValue = this.resultSource.getValue();
        let newValue = '0';
        if (oldValue.length > 1) {
            newValue = oldValue.slice(0, -1);
        } else {
            this.isNewValue = true;
        }
        this.resultSource.next(newValue);
    }

    /**
     * Displays the values
     */
    private display(value: string) {
        let oldValue = this.resultSource.getValue();
        if (this.isNewValue) {
            this.isNewValue = false;
            this.resultSource.next(value);
        }
        else {
            this.resultSource.next(oldValue + value);
        }
    }

    /**
     * '.' function. Adds decimal separator
     */
    private dot() {
        let oldValue = this.resultSource.getValue();
        if (oldValue.indexOf('.') == -1) {
            this.resultSource.next(oldValue + '.');
        }
    }

    /**
     * '=' function. Solves and displays the result
     */
    private equals() {
        if (this.selectedAction) {
            this.selectedAction();
            this.isNewValue = true;
            this.selectedAction = null;
            let newValue = this.calcStorage.toString();
            if (newValue.length > 12) {
                newValue = this.calcStorage.toPrecision(12);
            }
            this.resultSource.next(newValue);
        }
    }

    /**
     * Gets the display's value as a number
     */
    private getCurrentValue(): number {
        return Number(this.resultSource.getValue());
    }

    /**
     * '+/-' function. Changes the number's sign
     */
    private sign() {
        let oldValue = this.resultSource.getValue();
        let newValue = Number(oldValue) * -1;
        this.resultSource.next(newValue.toString());
    }
}