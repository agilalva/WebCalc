import { Component, Input } from '@angular/core';

import { CalcService } from './../shared/calc.service';

@Component({
    moduleId: module.id,
    selector: 'calc-button',
    template: '<button (click)="onButtonClick()">{{text}}</button>'
})
export class ButtonComponent {
    @Input() text: string;

    constructor(private calcService: CalcService) { }

    onButtonClick() {
        this.calcService.process(this.text);
    }
}