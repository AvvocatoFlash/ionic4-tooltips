import { trigger, state, style, transition, animate } from '@angular/animations';
import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, HostBinding, Input, Injectable, Directive, HostListener, NgModule } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1$1 from '@ionic/angular';

function TooltipBox_div_1_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "div", 3);
    }
    if (rf & 2) {
        const ctx_r0 = i0.ɵɵnextContext();
        i0.ɵɵproperty("innerHTML", ctx_r0.tooltipHtml, i0.ɵɵsanitizeHtml);
    }
}
function TooltipBox_ng_template_2_Template(rf, ctx) {
    if (rf & 1) {
        i0.ɵɵelement(0, "div", 4);
    }
    if (rf & 2) {
        const ctx_r2 = i0.ɵɵnextContext();
        i0.ɵɵproperty("innerHtml", ctx_r2.text, i0.ɵɵsanitizeHtml);
    }
}
class TooltipBox {
    constructor(elementRef, rnd) {
        this.elementRef = elementRef;
        this.rnd = rnd;
        this.fadeState = 'invisible';
        this.role = 'status';
        this.tooltipStyles = {};
        this.init = new Promise((resolve) => {
            this.initResolve = resolve;
        });
    }
    set arrow(side) {
        this.rnd.setAttribute(this.getNativeElement(), 'class', 'has-arrow ' + 'arrow-' + side);
    }
    set posTop(val) {
        this.rnd.setStyle(this.getNativeElement(), 'top', val + 'px');
    }
    set posLeft(val) {
        this.rnd.setStyle(this.getNativeElement(), 'left', val + 'px');
    }
    getNativeElement() {
        return this.elementRef.nativeElement;
    }
    ngAfterViewInit() {
        this.initResolve();
    }
}
/** @nocollapse */ TooltipBox.ɵfac = function TooltipBox_Factory(t) { return new (t || TooltipBox)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2)); };
/** @nocollapse */ TooltipBox.ɵcmp = /** @pureOrBreakMyCode */ i0.ɵɵdefineComponent({ type: TooltipBox, selectors: [["tooltip-box"]], hostVars: 1, hostBindings: function TooltipBox_HostBindings(rf, ctx) {
        if (rf & 2) {
            i0.ɵɵsyntheticHostProperty("@fade", ctx.fadeState);
        }
    }, inputs: { role: "role", text: "text", tooltipHtml: "tooltipHtml", tooltipStyles: "tooltipStyles", arrow: "arrow", posTop: "posTop", posLeft: "posLeft" }, decls: 4, vars: 4, consts: [[1, "tooltip-box", 3, "ngStyle"], [3, "innerHTML", 4, "ngIf", "ngIfElse"], ["txt", ""], [3, "innerHTML"], [3, "innerHtml"]], template: function TooltipBox_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0);
            i0.ɵɵtemplate(1, TooltipBox_div_1_Template, 1, 1, "div", 1);
            i0.ɵɵtemplate(2, TooltipBox_ng_template_2_Template, 1, 1, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            const _r1 = i0.ɵɵreference(3);
            i0.ɵɵproperty("ngStyle", ctx.tooltipStyles);
            i0.ɵɵattribute("aria-role", ctx.role);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.tooltipHtml)("ngIfElse", _r1);
        }
    }, dependencies: [i1.NgIf, i1.NgStyle], styles: ["[_nghost-%COMP%]{background-color:#000c;color:#fff;display:inline-block;position:fixed;padding:15px 25px;font-size:15px;z-index:3}.has-arrow[_nghost-%COMP%]:before{content:\"\";border:5px solid transparent;position:absolute;width:0;height:0}.has-arrow.arrow-top[_nghost-%COMP%]:before{border-bottom:5px solid rgba(0,0,0,.8);top:-10px}.has-arrow.arrow-left[_nghost-%COMP%]:before{border-right:5px solid rgba(0,0,0,.8);left:-10px}.has-arrow.arrow-right[_nghost-%COMP%]:before{border-left:5px solid rgba(0,0,0,.8);right:-10px}.has-arrow.arrow-bottom[_nghost-%COMP%]:before{border-top:5px solid rgba(0,0,0,.8);bottom:-10px}"], data: { animation: [
            trigger('fade', [
                state('visible', style({ opacity: 1 })),
                state('invisible', style({ opacity: 0 })),
                transition('visible <=> invisible', animate('300ms linear'))
            ])
        ] }, changeDetection: 0 });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TooltipBox, [{
            type: Component,
            args: [{ selector: 'tooltip-box', animations: [
                        trigger('fade', [
                            state('visible', style({ opacity: 1 })),
                            state('invisible', style({ opacity: 0 })),
                            transition('visible <=> invisible', animate('300ms linear'))
                        ])
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"tooltip-box\"\n     [attr.aria-role]=\"role\"\n     [ngStyle]=\"tooltipStyles\">\n  <div *ngIf=\"tooltipHtml; else txt\" [innerHTML]=\"tooltipHtml\"></div>\n\n  <ng-template #txt><div [innerHtml]=\"text\"></div></ng-template>\n</div>\n", styles: [":host{background-color:#000c;color:#fff;display:inline-block;position:fixed;padding:15px 25px;font-size:15px;z-index:3}:host.has-arrow:before{content:\"\";border:5px solid transparent;position:absolute;width:0;height:0}:host.has-arrow.arrow-top:before{border-bottom:5px solid rgba(0,0,0,.8);top:-10px}:host.has-arrow.arrow-left:before{border-right:5px solid rgba(0,0,0,.8);left:-10px}:host.has-arrow.arrow-right:before{border-left:5px solid rgba(0,0,0,.8);right:-10px}:host.has-arrow.arrow-bottom:before{border-top:5px solid rgba(0,0,0,.8);bottom:-10px}\n"] }]
        }], function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, { fadeState: [{
                type: HostBinding,
                args: ['@fade']
            }], role: [{
                type: Input
            }], text: [{
                type: Input
            }], tooltipHtml: [{
                type: Input
            }], tooltipStyles: [{
                type: Input
            }], arrow: [{
                type: Input
            }], posTop: [{
                type: Input
            }], posLeft: [{
                type: Input
            }] });
})();

var TooltipEvent;
(function (TooltipEvent) {
    TooltipEvent["CLICK"] = "click";
    TooltipEvent["HOVER"] = "hover";
    TooltipEvent["PRESS"] = "press";
})(TooltipEvent || (TooltipEvent = {}));

class TooltipController {
    constructor() {
        this.allowMultiple = true;
        this.activeTooltips = [];
    }
    addTooltip(instance) {
        if (instance.hideOthers || !this.allowMultiple && this.activeTooltips.length > 0) {
            this.hideAll();
        }
        this.activeTooltips.push(instance);
    }
    removeTooltip(instance) {
        this.activeTooltips.splice(this.activeTooltips.indexOf(instance), 1);
    }
    hideAll() {
        this.activeTooltips.forEach((tooltip) => {
            tooltip.removeTooltip();
        });
    }
}
/** @nocollapse */ TooltipController.ɵfac = function TooltipController_Factory(t) { return new (t || TooltipController)(); };
/** @nocollapse */ TooltipController.ɵprov = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjectable({ token: TooltipController, factory: TooltipController.ɵfac, providedIn: 'root' });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TooltipController, [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], null, null);
})();

class TooltipDirective {
    constructor(el, appRef, platform, cfr, tooltipCtrl, vcr) {
        this.el = el;
        this.appRef = appRef;
        this.platform = platform;
        this.cfr = cfr;
        this.tooltipCtrl = tooltipCtrl;
        this.vcr = vcr;
        this.debounce = 0;
        this.desktopEvent = TooltipEvent.HOVER;
        this.tooltipStyles = {};
        this.duration = 3000;
        this._active = false;
        this._arrow = false;
        this._canShow = true;
        this._debouncedPromise = null;
        this._navTooltip = false;
    }
    set navTooltip(val) {
        this._navTooltip = typeof val !== 'boolean' || val !== false;
    }
    get navTooltip() {
        return this._navTooltip;
    }
    set arrow(val) {
        this._arrow = typeof val !== 'boolean' || val !== false;
    }
    get arrow() {
        return this._arrow;
    }
    set active(val) {
        this._active = typeof val !== 'boolean' || val !== false;
        this._active && this.canShow ?
            this.showTooltip() : this.removeTooltip();
    }
    get active() {
        return this._active;
    }
    ngOnInit() {
        if (typeof this.event === 'undefined') {
            this.event = this.platform.is('mobile') ?
                this.mobileEvent : this.desktopEvent;
        }
        // if the timer hasn't expired or active is true when the component gets destroyed, the tooltip will remain in the DOM
        // this removes it
        this.removeTooltip();
    }
    /**
     * Show the tooltip immediately after initiating view if set to
     */
    ngAfterViewInit() {
        if (this._active) {
            this.trigger();
        }
    }
    ngOnDestroy() {
        if (this._tooltipElement && typeof this._tooltipElement.destroy === 'function') {
            this._tooltipElement.destroy();
        }
    }
    /**
     * Set the canShow property
     * Ensure that tooltip is shown only if the tooltip string is not falsey
     */
    set canShow(show) {
        this._canShow = show;
    }
    /**
     * @return TRUE if the tooltip can be shown
     */
    get canShow() {
        return this._canShow &&
            ((typeof this.tooltip === 'string' && this.tooltip !== '')
                || (typeof this.tooltipHtml === 'string' && this.tooltipHtml !== ''));
    }
    /**
     * Handles the click/press event and shows a tooltip.
     * If a tooltip already exists, it will just reset it's timer.
     */
    trigger() {
        if (this.canShow) {
            if (this._tooltipElement) {
                this._resetTimer();
            }
            else {
                this.showTooltip();
            }
        }
    }
    /**
     * Creates a new tooltip component and adjusts it's properties to show properly.
     */
    showTooltip() {
        this._debouncedPromise = setTimeout(() => {
            this._debouncedPromise = null;
            this._createTooltipComponent();
            const tooltipComponent = this._tooltipElement.instance;
            tooltipComponent.role = this.role;
            tooltipComponent.text = this.tooltip;
            tooltipComponent.tooltipStyles = this.tooltipStyles;
            tooltipComponent.tooltipHtml = this.tooltipHtml;
            tooltipComponent.init.then(() => {
                const tooltipPosition = this._getTooltipPosition();
                tooltipComponent.posLeft = tooltipPosition.left;
                tooltipComponent.posTop = tooltipPosition.top;
                tooltipComponent.fadeState = 'visible';
                if (this.arrow) {
                    let arrowPosition;
                    if (this.positionV === 'top') {
                        arrowPosition = 'bottom';
                    }
                    else if (this.positionV === 'bottom') {
                        arrowPosition = 'top';
                    }
                    else if (this.positionH === 'left') {
                        arrowPosition = 'right';
                    }
                    else {
                        arrowPosition = 'left';
                    }
                    tooltipComponent.arrow = arrowPosition;
                }
                if (!this._active) {
                    this._tooltipTimeout = setTimeout(this.removeTooltip.bind(this), this.duration);
                }
            });
        }, this.debounce);
    }
    onClick() {
        if (this.event === TooltipEvent.CLICK) {
            this.trigger();
        }
    }
    onPress() {
        if (this.event === TooltipEvent.PRESS) {
            this.trigger();
        }
    }
    onMouseEnter() {
        if (this.event === TooltipEvent.HOVER) {
            this.active = true;
        }
    }
    onMouseLeave() {
        if (this.event === TooltipEvent.HOVER) {
            this.active = false;
        }
    }
    _createTooltipComponent() {
        const componentFactory = this.cfr.resolveComponentFactory(TooltipBox);
        this._tooltipElement = this.vcr.createComponent(componentFactory);
        this.tooltipCtrl.addTooltip(this);
    }
    _getTooltipPosition() {
        const tooltipNativeElement = this._tooltipElement.instance.getNativeElement(), el = this.el.nativeElement, rect = el.getBoundingClientRect();
        let positionLeft, positionTop, spacing = 10;
        if (this.navTooltip) {
            this.positionV = 'bottom';
            this.arrow = false;
            spacing = 20;
        }
        if (this.positionH === 'right') {
            positionLeft = rect.right + spacing;
        }
        else if (this.positionH === 'left') {
            positionLeft = rect.left - spacing - tooltipNativeElement.offsetWidth;
            // -79, 19
        }
        else if (this.navTooltip) {
            positionLeft = rect.left + el.offsetWidth / 2;
        }
        else {
            positionLeft = rect.left;
        }
        if (this.positionV === 'top') {
            positionTop = rect.top - spacing - tooltipNativeElement.offsetHeight;
        }
        else if (this.positionV === 'bottom') {
            positionTop = rect.bottom + spacing;
        }
        else {
            positionTop = rect.top + el.offsetHeight / 2 - tooltipNativeElement.offsetHeight / 2;
        }
        this.topOffset++;
        if (this.topOffset) {
            positionTop += +this.topOffset;
        }
        this.leftOffset++;
        if (this.leftOffset) {
            positionLeft += +this.leftOffset;
        }
        if (positionLeft + tooltipNativeElement.offsetWidth + spacing > this.platform.width()) {
            positionLeft = this.platform.width() - tooltipNativeElement.offsetWidth - spacing;
        }
        else if (positionLeft + tooltipNativeElement.offsetWidth - spacing < 0) {
            positionLeft = spacing;
        }
        if (positionTop + tooltipNativeElement.offsetHeight + spacing > this.platform.height()) {
            positionTop = this.platform.height() - tooltipNativeElement.offsetHeight - spacing;
        }
        else if (positionTop + tooltipNativeElement.offsetHeight - spacing < 0) {
            positionTop = spacing;
        }
        return {
            left: positionLeft,
            top: positionTop,
        };
    }
    removeTooltip() {
        if (this._debouncedPromise) {
            clearTimeout(this._debouncedPromise);
            this._debouncedPromise = null;
        }
        if (!this._tooltipElement) {
            this._tooltipElement = undefined;
            this._tooltipTimeout = undefined;
            return;
        }
        this._tooltipElement.instance.fadeState = 'invisible';
        this.canShow = false;
        // wait for animation to finish then clear everything out
        setTimeout(() => {
            if (this._tooltipElement &&
                typeof this._tooltipElement.destroy === 'function') {
                this._tooltipElement.destroy();
            }
            this.tooltipCtrl.removeTooltip(this);
            this._tooltipElement = this._tooltipTimeout = undefined;
            this.canShow = true;
        }, 300);
    }
    _resetTimer() {
        clearTimeout(this._tooltipTimeout);
        this._tooltipTimeout = setTimeout(() => {
            this.active = false;
        }, this.duration);
    }
}
/** @nocollapse */ TooltipDirective.ɵfac = function TooltipDirective_Factory(t) { return new (t || TooltipDirective)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.ApplicationRef), i0.ɵɵdirectiveInject(i1$1.Platform), i0.ɵɵdirectiveInject(i0.ComponentFactoryResolver), i0.ɵɵdirectiveInject(TooltipController), i0.ɵɵdirectiveInject(i0.ViewContainerRef)); };
/** @nocollapse */ TooltipDirective.ɵdir = /** @pureOrBreakMyCode */ i0.ɵɵdefineDirective({ type: TooltipDirective, selectors: [["", "tooltip", ""]], hostBindings: function TooltipDirective_HostBindings(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵlistener("click", function TooltipDirective_click_HostBindingHandler() { return ctx.onClick(); })("press", function TooltipDirective_press_HostBindingHandler() { return ctx.onPress(); })("mouseenter", function TooltipDirective_mouseenter_HostBindingHandler() { return ctx.onMouseEnter(); })("mouseleave", function TooltipDirective_mouseleave_HostBindingHandler() { return ctx.onMouseLeave(); });
        }
    }, inputs: { debounce: "debounce", desktopEvent: "desktopEvent", event: "event", hideOthers: "hideOthers", leftOffset: "leftOffset", mobileEvent: "mobileEvent", positionV: "positionV", positionH: "positionH", role: "role", tooltip: "tooltip", tooltipHtml: "tooltipHtml", tooltipStyles: "tooltipStyles", topOffset: "topOffset", navTooltip: "navTooltip", arrow: "arrow", duration: "duration", active: "active" } });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TooltipDirective, [{
            type: Directive,
            args: [{
                    selector: '[tooltip]',
                }]
        }], function () { return [{ type: i0.ElementRef }, { type: i0.ApplicationRef }, { type: i1$1.Platform }, { type: i0.ComponentFactoryResolver }, { type: TooltipController }, { type: i0.ViewContainerRef }]; }, { debounce: [{
                type: Input
            }], desktopEvent: [{
                type: Input
            }], event: [{
                type: Input
            }], hideOthers: [{
                type: Input
            }], leftOffset: [{
                type: Input
            }], mobileEvent: [{
                type: Input
            }], positionV: [{
                type: Input
            }], positionH: [{
                type: Input
            }], role: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], tooltipHtml: [{
                type: Input
            }], tooltipStyles: [{
                type: Input
            }], topOffset: [{
                type: Input
            }], navTooltip: [{
                type: Input
            }], arrow: [{
                type: Input
            }], duration: [{
                type: Input
            }], active: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['click']
            }], onPress: [{
                type: HostListener,
                args: ['press']
            }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }] });
})();

class TooltipsModule {
    static forRoot() {
        return {
            ngModule: TooltipsModule,
            providers: [
                TooltipController
            ],
        };
    }
}
/** @nocollapse */ TooltipsModule.ɵfac = function TooltipsModule_Factory(t) { return new (t || TooltipsModule)(); };
/** @nocollapse */ TooltipsModule.ɵmod = /** @pureOrBreakMyCode */ i0.ɵɵdefineNgModule({ type: TooltipsModule });
/** @nocollapse */ TooltipsModule.ɵinj = /** @pureOrBreakMyCode */ i0.ɵɵdefineInjector({ imports: [CommonModule] });
(function () {
    (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TooltipsModule, [{
            type: NgModule,
            args: [{
                    declarations: [
                        TooltipDirective,
                        TooltipBox
                    ],
                    entryComponents: [
                        TooltipBox
                    ],
                    exports: [
                        TooltipDirective
                    ],
                    imports: [
                        CommonModule
                    ]
                }]
        }], null, null);
})();
(function () {
    (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(TooltipsModule, { declarations: [TooltipDirective,
            TooltipBox], imports: [CommonModule], exports: [TooltipDirective] });
})();

/*
 * Public API Surface of ionic-tooltips
 */

/**
 * Generated bundle index. Do not edit.
 */

export { TooltipBox, TooltipController, TooltipDirective, TooltipsModule };
//# sourceMappingURL=ionic4-tooltips.mjs.map
