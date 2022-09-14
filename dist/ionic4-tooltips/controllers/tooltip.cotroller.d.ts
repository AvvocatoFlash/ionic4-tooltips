import { TooltipDirective } from '../directives/tooltip.directive';
import * as i0 from "@angular/core";
export declare class TooltipController {
    allowMultiple: boolean;
    activeTooltips: TooltipDirective[];
    addTooltip(instance: TooltipDirective): void;
    removeTooltip(instance: TooltipDirective): void;
    hideAll(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TooltipController, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TooltipController>;
}
