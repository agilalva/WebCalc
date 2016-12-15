import { Component, Input, OnInit } from '@angular/core';

import { CalcService } from './calc.service';

@Component({
    moduleId: module.id,
    selector: 'calc-display',
    template: `
    <div class="display">
        <div class="content">{{displayText}}</div>
    </div>
    `
})
export class DisplayComponent implements OnInit {
    private displayText: string;

    constructor(private calcService: CalcService) { }

    ngOnInit() {
        // Waiting for changes
        this.calcService.result$.subscribe(value => {
            this.displayText = value;
        });
    }
}