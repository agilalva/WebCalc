import { Component, Input, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'calc-display',
    templateUrl: 'display.component.html'
})
export class DisplayComponent implements OnInit {
    @Input() displayText: string = "0";

    constructor() { }

    ngOnInit() { }
}