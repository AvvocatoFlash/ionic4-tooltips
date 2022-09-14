import { AfterViewInit, ApplicationRef, ComponentFactoryResolver, ElementRef, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TooltipController } from '../controllers/tooltip.cotroller';
import { TooltipEvent } from '../models/tooltip-event.model';
import * as i0 from "@angular/core";
export declare class TooltipDirective implements OnInit, AfterViewInit, OnDestroy {
    private el;
    private appRef;
    private platform;
    private cfr;
    private tooltipCtrl;
    private vcr;
    debounce: number;
    desktopEvent: TooltipEvent;
    event: TooltipEvent;
    hideOthers: boolean;
    leftOffset: number;
    mobileEvent: TooltipEvent;
    positionV: string;
    positionH: string;
    role: string;
    tooltip: string;
    tooltipHtml: string;
    tooltipStyles: {
        [key: string]: string;
    };
    topOffset: number;
    set navTooltip(val: boolean);
    get navTooltip(): boolean;
    set arrow(val: boolean);
    get arrow(): boolean;
    duration: number;
    set active(val: boolean);
    get active(): boolean;
    private _active;
    private _arrow;
    private _canShow;
    private _debouncedPromise;
    private _navTooltip;
    private _tooltipElement;
    private _tooltipTimeout;
    constructor(el: ElementRef, appRef: ApplicationRef, platform: Platform, cfr: ComponentFactoryResolver, tooltipCtrl: TooltipController, vcr: ViewContainerRef);
    ngOnInit(): void;
    /**
     * Show the tooltip immediately after initiating view if set to
     */
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /**
     * Set the canShow property
     * Ensure that tooltip is shown only if the tooltip string is not falsey
     */
    set canShow(show: boolean);
    /**
     * @return TRUE if the tooltip can be shown
     */
    get canShow(): boolean;
    /**
     * Handles the click/press event and shows a tooltip.
     * If a tooltip already exists, it will just reset it's timer.
     */
    trigger(): void;
    /**
     * Creates a new tooltip component and adjusts it's properties to show properly.
     */
    showTooltip(): void;
    onClick(): void;
    onPress(): void;
    onMouseEnter(): void;
    onMouseLeave(): void;
    private _createTooltipComponent;
    private _getTooltipPosition;
    removeTooltip(): void;
    private _resetTimer;
    static ɵfac: i0.ɵɵFactoryDeclaration<TooltipDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<TooltipDirective, "[tooltip]", never, { "debounce": "debounce"; "desktopEvent": "desktopEvent"; "event": "event"; "hideOthers": "hideOthers"; "leftOffset": "leftOffset"; "mobileEvent": "mobileEvent"; "positionV": "positionV"; "positionH": "positionH"; "role": "role"; "tooltip": "tooltip"; "tooltipHtml": "tooltipHtml"; "tooltipStyles": "tooltipStyles"; "topOffset": "topOffset"; "navTooltip": "navTooltip"; "arrow": "arrow"; "duration": "duration"; "active": "active"; }, {}, never, never, false>;
}
