import { AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export declare class TooltipBox implements AfterViewInit {
    elementRef: ElementRef;
    private rnd;
    fadeState: string;
    role: string;
    text: string;
    tooltipHtml: string;
    tooltipStyles: {
        [key: string]: string;
    };
    set arrow(side: string);
    set posTop(val: number);
    set posLeft(val: number);
    private initResolve;
    init: Promise<void>;
    constructor(elementRef: ElementRef, rnd: Renderer2);
    getNativeElement(): HTMLElement;
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TooltipBox, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TooltipBox, "tooltip-box", never, { "role": "role"; "text": "text"; "tooltipHtml": "tooltipHtml"; "tooltipStyles": "tooltipStyles"; "arrow": "arrow"; "posTop": "posTop"; "posLeft": "posLeft"; }, {}, never, never, false>;
}
