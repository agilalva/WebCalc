import { Component, Input, OnInit } from '@angular/core';

import { CalcService } from './../shared/calc.service';

@Component({
    moduleId: module.id,
    selector: 'calc-button',
    template: '<button (click)="onButtonClick()">{{text}}</button>'
})
export class ButtonComponent implements OnInit {
    @Input() text: string;

    constructor(private calcService: CalcService) { }

    ngOnInit() { }

    onButtonClick() {
        this.calcService.process(this.text);
    }
}