import { Component, Input, OnInit } from '@angular/core';

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
    @Input() displayText: string = "0";

    constructor() { }

    ngOnInit() { }
}