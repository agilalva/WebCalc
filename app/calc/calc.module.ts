import { NgModule } from '@angular/core';

import { ButtonComponent } from './shared/button.component';
import { CalcComponent } from './calc.component';
import { DisplayComponent } from './shared/display.component';

import { CalcService } from './shared/calc.service';

@NgModule({
    imports: [],
    exports: [CalcComponent],
    declarations: [
        ButtonComponent,
        CalcComponent,
        DisplayComponent
    ],
    providers: [CalcService],
})
export class CalcModule { }