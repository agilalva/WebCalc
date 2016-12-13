import { Component, Input, OnInit } from '@angular/core';

import { CalcService } from './../shared/calc.service';

@Component({
    moduleId: module.id,
    selector: 'calc-button',
    templateUrl: 'button.component.html'
})
export class ButtonComponent implements OnInit {
    @Input() text: string;

    constructor(private calcService: CalcService) { }

    ngOnInit() { }

    onButtonClick() {
    }
}