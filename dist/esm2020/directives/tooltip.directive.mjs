import { ApplicationRef, ComponentFactoryResolver, Directive, ElementRef, HostListener, Input, ViewContainerRef, } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TooltipBox } from '../components/tooltip-box/tooltip-box.component';
import { TooltipController } from '../controllers/tooltip.cotroller';
import { TooltipEvent } from '../models/tooltip-event.model';
import * as i0 from "@angular/core";
import * as i1 from "@ionic/angular";
import * as i2 from "../controllers/tooltip.cotroller";
export class TooltipDirective {
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
/** @nocollapse */ TooltipDirective.ɵfac = function TooltipDirective_Factory(t) { return new (t || TooltipDirective)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.ApplicationRef), i0.ɵɵdirectiveInject(i1.Platform), i0.ɵɵdirectiveInject(i0.ComponentFactoryResolver), i0.ɵɵdirectiveInject(i2.TooltipController), i0.ɵɵdirectiveInject(i0.ViewContainerRef)); };
/** @nocollapse */ TooltipDirective.ɵdir = /** @pureOrBreakMyCode */ i0.ɵɵdefineDirective({ type: TooltipDirective, selectors: [["", "tooltip", ""]], hostBindings: function TooltipDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function TooltipDirective_click_HostBindingHandler() { return ctx.onClick(); })("press", function TooltipDirective_press_HostBindingHandler() { return ctx.onPress(); })("mouseenter", function TooltipDirective_mouseenter_HostBindingHandler() { return ctx.onMouseEnter(); })("mouseleave", function TooltipDirective_mouseleave_HostBindingHandler() { return ctx.onMouseLeave(); });
    } }, inputs: { debounce: "debounce", desktopEvent: "desktopEvent", event: "event", hideOthers: "hideOthers", leftOffset: "leftOffset", mobileEvent: "mobileEvent", positionV: "positionV", positionH: "positionH", role: "role", tooltip: "tooltip", tooltipHtml: "tooltipHtml", tooltipStyles: "tooltipStyles", topOffset: "topOffset", navTooltip: "navTooltip", arrow: "arrow", duration: "duration", active: "active" } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TooltipDirective, [{
        type: Directive,
        args: [{
                selector: '[tooltip]',
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i0.ApplicationRef }, { type: i1.Platform }, { type: i0.ComponentFactoryResolver }, { type: i2.TooltipController }, { type: i0.ViewContainerRef }]; }, { debounce: [{
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9pb25pYzQtdG9vbHRpcHMvc3JjL2RpcmVjdGl2ZXMvdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLGNBQWMsRUFDZCx3QkFBd0IsRUFFeEIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUdMLGdCQUFnQixHQUNqQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGlEQUFpRCxDQUFDO0FBQzNFLE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBQ25FLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQzs7OztBQUszRCxNQUFNLE9BQU8sZ0JBQWdCO0lBdUQzQixZQUNVLEVBQWEsRUFDYixNQUFxQixFQUNyQixRQUFpQixFQUNqQixHQUE0QixFQUM1QixXQUE2QixFQUM3QixHQUFvQjtRQUxwQixPQUFFLEdBQUYsRUFBRSxDQUFXO1FBQ2IsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUNyQixhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLFFBQUcsR0FBSCxHQUFHLENBQXlCO1FBQzVCLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUM3QixRQUFHLEdBQUgsR0FBRyxDQUFpQjtRQTVEckIsYUFBUSxHQUFVLENBQUMsQ0FBQztRQUNwQixpQkFBWSxHQUFnQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBVS9DLGtCQUFhLEdBQTRCLEVBQUUsQ0FBQztRQXFCNUMsYUFBUSxHQUFHLElBQUksQ0FBQztRQWNqQixZQUFPLEdBQVcsS0FBSyxDQUFDO1FBQ3hCLFdBQU0sR0FBVyxLQUFLLENBQUM7UUFDdkIsYUFBUSxHQUFXLElB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QUFTLDRFQUFULGFBQVMsc0ZBQVQsa0JBQWMsc0ZBQWQsa0JBQWM7O3VGQUFkLGdCQUFnQjtjQUg1QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7YUFDdEI7dU5BRVUsUUFBUTtrQkFBaEIsS0FBSztZQUNHLFlBQVk7a0JBQXBCLEtBQUs7WUFDRyxLQUFLO2tCQUFiLEtBQUs7WUFDRyxVQUFVO2tCQUFsQixLQUFLO1lBQ0csVUFBVTtrQkFBbEIsS0FBSztZQUNHLFdBQVc7a0JBQW5CLEtBQUs7WUFDRyxTQUFTO2tCQUFqQixLQUFLO1lBQ0csU0FBUztrQkFBakIsS0FBSztZQUNHLElBQUk7a0JBQVosS0FBSztZQUNHLE9BQU87a0JBQWYsS0FBSztZQUNHLFdBQVc7a0JBQW5CLEtBQUs7WUFDRyxhQUFhO2tCQUFyQixLQUFLO1lBQ0csU0FBUztrQkFBakIsS0FBSztZQUdGLFVBQVU7a0JBRGIsS0FBSztZQVVGLEtBQUs7a0JBRFIsS0FBSztZQVNHLFFBQVE7a0JBQWhCLEtBQUs7WUFHRixNQUFNO2tCQURULEtBQUs7WUEySU4sT0FBTztrQkFETixZQUFZO21CQUFDLE9BQU87WUFRckIsT0FBTztrQkFETixZQUFZO21CQUFDLE9BQU87WUFRckIsWUFBWTtrQkFEWCxZQUFZO21CQUFDLFlBQVk7WUFRMUIsWUFBWTtrQkFEWCxZQUFZO21CQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBBcHBsaWNhdGlvblJlZixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBDb21wb25lbnRSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1BsYXRmb3JtfSBmcm9tICdAaW9uaWMvYW5ndWxhcic7XG5cbmltcG9ydCB7VG9vbHRpcEJveH0gZnJvbSAnLi4vY29tcG9uZW50cy90b29sdGlwLWJveC90b29sdGlwLWJveC5jb21wb25lbnQnO1xuaW1wb3J0IHtUb29sdGlwQ29udHJvbGxlcn0gZnJvbSAnLi4vY29udHJvbGxlcnMvdG9vbHRpcC5jb3Ryb2xsZXInO1xuaW1wb3J0IHtUb29sdGlwRXZlbnR9IGZyb20gJy4uL21vZGVscy90b29sdGlwLWV2ZW50Lm1vZGVsJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3Rvb2x0aXBdJyxcbn0pXG5leHBvcnQgY2xhc3MgVG9vbHRpcERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgZGVib3VuY2U6bnVtYmVyID0gMDtcbiAgQElucHV0KCkgZGVza3RvcEV2ZW50OlRvb2x0aXBFdmVudCA9IFRvb2x0aXBFdmVudC5IT1ZFUjtcbiAgQElucHV0KCkgZXZlbnQ6VG9vbHRpcEV2ZW50O1xuICBASW5wdXQoKSBoaWRlT3RoZXJzOmJvb2xlYW47XG4gIEBJbnB1dCgpIGxlZnRPZmZzZXQ6bnVtYmVyO1xuICBASW5wdXQoKSBtb2JpbGVFdmVudDpUb29sdGlwRXZlbnQ7XG4gIEBJbnB1dCgpIHBvc2l0aW9uVjpzdHJpbmc7XG4gIEBJbnB1dCgpIHBvc2l0aW9uSDpzdHJpbmc7XG4gIEBJbnB1dCgpIHJvbGU6c3RyaW5nO1xuICBASW5wdXQoKSB0b29sdGlwOnN0cmluZztcbiAgQElucHV0KCkgdG9vbHRpcEh0bWw6c3RyaW5nO1xuICBASW5wdXQoKSB0b29sdGlwU3R5bGVzOnsgW2tleTpzdHJpbmddOnN0cmluZzsgfSA9IHt9O1xuICBASW5wdXQoKSB0b3BPZmZzZXQ6bnVtYmVyO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBuYXZUb29sdGlwKHZhbDpib29sZWFuKSB7XG4gICAgdGhpcy5fbmF2VG9vbHRpcCA9IHR5cGVvZiB2YWwgIT09ICdib29sZWFuJyB8fCB2YWwgIT09IGZhbHNlO1xuICB9XG5cbiAgZ2V0IG5hdlRvb2x0aXAoKTpib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fbmF2VG9vbHRpcDtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBhcnJvdyh2YWw6Ym9vbGVhbikge1xuICAgIHRoaXMuX2Fycm93ID0gdHlwZW9mIHZhbCAhPT0gJ2Jvb2xlYW4nIHx8IHZhbCAhPT0gZmFsc2U7XG4gIH1cblxuICBnZXQgYXJyb3coKTpib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fYXJyb3c7XG4gIH1cblxuICBASW5wdXQoKSBkdXJhdGlvbiA9IDMwMDA7XG5cbiAgQElucHV0KClcbiAgc2V0IGFjdGl2ZSh2YWw6Ym9vbGVhbikge1xuICAgIHRoaXMuX2FjdGl2ZSA9IHR5cGVvZiB2YWwgIT09ICdib29sZWFuJyB8fCB2YWwgIT09IGZhbHNlO1xuXG4gICAgdGhpcy5fYWN0aXZlICYmIHRoaXMuY2FuU2hvdyA/XG4gICAgICB0aGlzLnNob3dUb29sdGlwKCkgOiB0aGlzLnJlbW92ZVRvb2x0aXAoKTtcbiAgfVxuXG4gIGdldCBhY3RpdmUoKTpib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWN0aXZlOmJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfYXJyb3c6Ym9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9jYW5TaG93OmJvb2xlYW4gPSB0cnVlO1xuICBwcml2YXRlIF9kZWJvdW5jZWRQcm9taXNlID0gbnVsbDtcbiAgcHJpdmF0ZSBfbmF2VG9vbHRpcDpib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgX3Rvb2x0aXBFbGVtZW50OkNvbXBvbmVudFJlZjxUb29sdGlwQm94PjtcbiAgcHJpdmF0ZSBfdG9vbHRpcFRpbWVvdXQ6YW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWw6RWxlbWVudFJlZixcbiAgICBwcml2YXRlIGFwcFJlZjpBcHBsaWNhdGlvblJlZixcbiAgICBwcml2YXRlIHBsYXRmb3JtOlBsYXRmb3JtLFxuICAgIHByaXZhdGUgY2ZyOkNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIHRvb2x0aXBDdHJsOlRvb2x0aXBDb250cm9sbGVyLFxuICAgIHByaXZhdGUgdmNyOlZpZXdDb250YWluZXJSZWYsXG4gICkge1xuXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuZXZlbnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLmV2ZW50ID0gdGhpcy5wbGF0Zm9ybS5pcygnbW9iaWxlJykgP1xuICAgICAgICB0aGlzLm1vYmlsZUV2ZW50IDogdGhpcy5kZXNrdG9wRXZlbnQ7XG4gICAgfVxuXG4gICAgLy8gaWYgdGhlIHRpbWVyIGhhc24ndCBleHBpcmVkIG9yIGFjdGl2ZSBpcyB0cnVlIHdoZW4gdGhlIGNvbXBvbmVudCBnZXRzIGRlc3Ryb3llZCwgdGhlIHRvb2x0aXAgd2lsbCByZW1haW4gaW4gdGhlIERPTVxuICAgIC8vIHRoaXMgcmVtb3ZlcyBpdFxuICAgIHRoaXMucmVtb3ZlVG9vbHRpcCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNob3cgdGhlIHRvb2x0aXAgaW1tZWRpYXRlbHkgYWZ0ZXIgaW5pdGlhdGluZyB2aWV3IGlmIHNldCB0b1xuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIGlmICh0aGlzLl9hY3RpdmUpIHtcbiAgICAgIHRoaXMudHJpZ2dlcigpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLl90b29sdGlwRWxlbWVudCAmJiB0eXBlb2YgdGhpcy5fdG9vbHRpcEVsZW1lbnQuZGVzdHJveSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5fdG9vbHRpcEVsZW1lbnQuZGVzdHJveSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGNhblNob3cgcHJvcGVydHlcbiAgICogRW5zdXJlIHRoYXQgdG9vbHRpcCBpcyBzaG93biBvbmx5IGlmIHRoZSB0b29sdGlwIHN0cmluZyBpcyBub3QgZmFsc2V5XG4gICAqL1xuICBzZXQgY2FuU2hvdyhzaG93OiBib29sZWFuKSB7XG4gICAgdGhpcy5fY2FuU2hvdyA9IHNob3c7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiBUUlVFIGlmIHRoZSB0b29sdGlwIGNhbiBiZSBzaG93blxuICAgKi9cbiAgZ2V0IGNhblNob3coKTpib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY2FuU2hvdyAmJlxuICAgICAgKCh0eXBlb2YgdGhpcy50b29sdGlwID09PSAnc3RyaW5nJyAmJiB0aGlzLnRvb2x0aXAgIT09ICcnKVxuICAgICAgICB8fCAodHlwZW9mIHRoaXMudG9vbHRpcEh0bWwgPT09ICdzdHJpbmcnICYmIHRoaXMudG9vbHRpcEh0bWwgIT09ICcnKSk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgY2xpY2svcHJlc3MgZXZlbnQgYW5kIHNob3dzIGEgdG9vbHRpcC5cbiAgICogSWYgYSB0b29sdGlwIGFscmVhZHkgZXhpc3RzLCBpdCB3aWxsIGp1c3QgcmVzZXQgaXQncyB0aW1lci5cbiAgICovXG4gIHRyaWdnZXIoKTp2b2lkIHtcbiAgICBpZiAodGhpcy5jYW5TaG93KSB7XG4gICAgICBpZiAodGhpcy5fdG9vbHRpcEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5fcmVzZXRUaW1lcigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zaG93VG9vbHRpcCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IHRvb2x0aXAgY29tcG9uZW50IGFuZCBhZGp1c3RzIGl0J3MgcHJvcGVydGllcyB0byBzaG93IHByb3Blcmx5LlxuICAgKi9cbiAgc2hvd1Rvb2x0aXAoKTp2b2lkIHtcbiAgICB0aGlzLl9kZWJvdW5jZWRQcm9taXNlID0gc2V0VGltZW91dChcbiAgICAgICgpID0+IHtcbiAgICAgICAgdGhpcy5fZGVib3VuY2VkUHJvbWlzZSA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5fY3JlYXRlVG9vbHRpcENvbXBvbmVudCgpO1xuXG4gICAgICAgIGNvbnN0IHRvb2x0aXBDb21wb25lbnQ6IFRvb2x0aXBCb3ggPSB0aGlzLl90b29sdGlwRWxlbWVudC5pbnN0YW5jZTtcblxuICAgICAgICB0b29sdGlwQ29tcG9uZW50LnJvbGUgPSB0aGlzLnJvbGU7XG4gICAgICAgIHRvb2x0aXBDb21wb25lbnQudGV4dCA9IHRoaXMudG9vbHRpcDtcbiAgICAgICAgdG9vbHRpcENvbXBvbmVudC50b29sdGlwU3R5bGVzID0gdGhpcy50b29sdGlwU3R5bGVzO1xuICAgICAgICB0b29sdGlwQ29tcG9uZW50LnRvb2x0aXBIdG1sID0gdGhpcy50b29sdGlwSHRtbDtcbiAgICAgICAgdG9vbHRpcENvbXBvbmVudC5pbml0LnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHRvb2x0aXBQb3NpdGlvbiA9IHRoaXMuX2dldFRvb2x0aXBQb3NpdGlvbigpO1xuXG4gICAgICAgICAgdG9vbHRpcENvbXBvbmVudC5wb3NMZWZ0ID0gdG9vbHRpcFBvc2l0aW9uLmxlZnQ7XG4gICAgICAgICAgdG9vbHRpcENvbXBvbmVudC5wb3NUb3AgPSB0b29sdGlwUG9zaXRpb24udG9wO1xuXG4gICAgICAgICAgdG9vbHRpcENvbXBvbmVudC5mYWRlU3RhdGUgPSAndmlzaWJsZSc7XG5cbiAgICAgICAgICBpZiAodGhpcy5hcnJvdykge1xuICAgICAgICAgICAgbGV0IGFycm93UG9zaXRpb247XG4gICAgICAgICAgICBpZiAodGhpcy5wb3NpdGlvblYgPT09ICd0b3AnKSB7XG4gICAgICAgICAgICAgIGFycm93UG9zaXRpb24gPSAnYm90dG9tJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wb3NpdGlvblYgPT09ICdib3R0b20nKSB7XG4gICAgICAgICAgICAgIGFycm93UG9zaXRpb24gPSAndG9wJztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wb3NpdGlvbkggPT09ICdsZWZ0Jykge1xuICAgICAgICAgICAgICBhcnJvd1Bvc2l0aW9uID0gJ3JpZ2h0JztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGFycm93UG9zaXRpb24gPSAnbGVmdCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b29sdGlwQ29tcG9uZW50LmFycm93ID0gYXJyb3dQb3NpdGlvbjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIXRoaXMuX2FjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5fdG9vbHRpcFRpbWVvdXQgPSBzZXRUaW1lb3V0KFxuICAgICAgICAgICAgICB0aGlzLnJlbW92ZVRvb2x0aXAuYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgdGhpcy5kdXJhdGlvbixcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICB0aGlzLmRlYm91bmNlXG4gICAgKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpOnZvaWQge1xuICAgIGlmICh0aGlzLmV2ZW50ID09PSBUb29sdGlwRXZlbnQuQ0xJQ0spIHtcbiAgICAgIHRoaXMudHJpZ2dlcigpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ3ByZXNzJylcbiAgb25QcmVzcygpOnZvaWQge1xuICAgIGlmICh0aGlzLmV2ZW50ID09PSBUb29sdGlwRXZlbnQuUFJFU1MpIHtcbiAgICAgIHRoaXMudHJpZ2dlcigpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKVxuICBvbk1vdXNlRW50ZXIoKTp2b2lkIHtcbiAgICBpZiAodGhpcy5ldmVudCA9PT0gVG9vbHRpcEV2ZW50LkhPVkVSKSB7XG4gICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXG4gIG9uTW91c2VMZWF2ZSgpOnZvaWQge1xuICAgIGlmICh0aGlzLmV2ZW50ID09PSBUb29sdGlwRXZlbnQuSE9WRVIpIHtcbiAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlVG9vbHRpcENvbXBvbmVudCgpIHtcbiAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jZnIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoVG9vbHRpcEJveCk7XG4gICAgdGhpcy5fdG9vbHRpcEVsZW1lbnQgPSB0aGlzLnZjci5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50RmFjdG9yeSk7XG4gICAgdGhpcy50b29sdGlwQ3RybC5hZGRUb29sdGlwKHRoaXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0VG9vbHRpcFBvc2l0aW9uKCkge1xuICAgIGNvbnN0IHRvb2x0aXBOYXRpdmVFbGVtZW50OkhUTUxFbGVtZW50ID0gdGhpcy5fdG9vbHRpcEVsZW1lbnQuaW5zdGFuY2UuZ2V0TmF0aXZlRWxlbWVudCgpLFxuICAgICAgZWw6SFRNTEVsZW1lbnQgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsXG4gICAgICByZWN0OkNsaWVudFJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIGxldCBwb3NpdGlvbkxlZnQ6bnVtYmVyLFxuICAgICAgcG9zaXRpb25Ub3A6bnVtYmVyLFxuICAgICAgc3BhY2luZyA9IDEwO1xuXG4gICAgaWYgKHRoaXMubmF2VG9vbHRpcCkge1xuICAgICAgdGhpcy5wb3NpdGlvblYgPSAnYm90dG9tJztcbiAgICAgIHRoaXMuYXJyb3cgPSBmYWxzZTtcbiAgICAgIHNwYWNpbmcgPSAyMDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wb3NpdGlvbkggPT09ICdyaWdodCcpIHtcbiAgICAgIHBvc2l0aW9uTGVmdCA9IHJlY3QucmlnaHQgKyBzcGFjaW5nO1xuICAgIH0gZWxzZSBpZiAodGhpcy5wb3NpdGlvbkggPT09ICdsZWZ0Jykge1xuICAgICAgcG9zaXRpb25MZWZ0ID0gcmVjdC5sZWZ0IC0gc3BhY2luZyAtIHRvb2x0aXBOYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgLy8gLTc5LCAxOVxuICAgIH0gZWxzZSBpZiAodGhpcy5uYXZUb29sdGlwKSB7XG4gICAgICBwb3NpdGlvbkxlZnQgPSByZWN0LmxlZnQgKyBlbC5vZmZzZXRXaWR0aCAvIDI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBvc2l0aW9uTGVmdCA9IHJlY3QubGVmdDtcbiAgICB9XG5cblxuICAgIGlmICh0aGlzLnBvc2l0aW9uViA9PT0gJ3RvcCcpIHtcbiAgICAgIHBvc2l0aW9uVG9wID0gcmVjdC50b3AgLSBzcGFjaW5nIC0gdG9vbHRpcE5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICAgIH0gZWxzZSBpZiAodGhpcy5wb3NpdGlvblYgPT09ICdib3R0b20nKSB7XG4gICAgICBwb3NpdGlvblRvcCA9IHJlY3QuYm90dG9tICsgc3BhY2luZztcbiAgICB9IGVsc2Uge1xuICAgICAgcG9zaXRpb25Ub3AgPSByZWN0LnRvcCArIGVsLm9mZnNldEhlaWdodCAvIDIgLSB0b29sdGlwTmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQgLyAyO1xuICAgIH1cblxuICAgIHRoaXMudG9wT2Zmc2V0Kys7XG4gICAgaWYgKHRoaXMudG9wT2Zmc2V0KSB7XG4gICAgICBwb3NpdGlvblRvcCArPSArdGhpcy50b3BPZmZzZXQ7XG4gICAgfVxuXG4gICAgdGhpcy5sZWZ0T2Zmc2V0Kys7XG4gICAgaWYgKHRoaXMubGVmdE9mZnNldCkge1xuICAgICAgcG9zaXRpb25MZWZ0ICs9ICt0aGlzLmxlZnRPZmZzZXQ7XG4gICAgfVxuXG4gICAgaWYgKHBvc2l0aW9uTGVmdCArIHRvb2x0aXBOYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoICsgc3BhY2luZyA+IHRoaXMucGxhdGZvcm0ud2lkdGgoKSkge1xuICAgICAgcG9zaXRpb25MZWZ0ID0gdGhpcy5wbGF0Zm9ybS53aWR0aCgpIC0gdG9vbHRpcE5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggLSBzcGFjaW5nO1xuICAgIH0gZWxzZSBpZiAocG9zaXRpb25MZWZ0ICsgdG9vbHRpcE5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggLSBzcGFjaW5nIDwgMCkge1xuICAgICAgcG9zaXRpb25MZWZ0ID0gc3BhY2luZztcbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb25Ub3AgKyB0b29sdGlwTmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQgKyBzcGFjaW5nID4gdGhpcy5wbGF0Zm9ybS5oZWlnaHQoKSkge1xuICAgICAgcG9zaXRpb25Ub3AgPSB0aGlzLnBsYXRmb3JtLmhlaWdodCgpIC0gdG9vbHRpcE5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0IC0gc3BhY2luZztcbiAgICB9IGVsc2UgaWYgKHBvc2l0aW9uVG9wICsgdG9vbHRpcE5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0IC0gc3BhY2luZyA8IDApIHtcbiAgICAgIHBvc2l0aW9uVG9wID0gc3BhY2luZztcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgbGVmdDogcG9zaXRpb25MZWZ0LFxuICAgICAgdG9wOiAgcG9zaXRpb25Ub3AsXG4gICAgfTtcbiAgfVxuXG4gIHJlbW92ZVRvb2x0aXAoKSB7XG4gICAgaWYgKHRoaXMuX2RlYm91bmNlZFByb21pc2UpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9kZWJvdW5jZWRQcm9taXNlKTtcblxuICAgICAgdGhpcy5fZGVib3VuY2VkUHJvbWlzZSA9IG51bGw7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl90b29sdGlwRWxlbWVudCkge1xuICAgICAgdGhpcy5fdG9vbHRpcEVsZW1lbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl90b29sdGlwVGltZW91dCA9IHVuZGVmaW5lZDtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl90b29sdGlwRWxlbWVudC5pbnN0YW5jZS5mYWRlU3RhdGUgPSAnaW52aXNpYmxlJztcblxuICAgIHRoaXMuY2FuU2hvdyA9IGZhbHNlO1xuXG4gICAgLy8gd2FpdCBmb3IgYW5pbWF0aW9uIHRvIGZpbmlzaCB0aGVuIGNsZWFyIGV2ZXJ5dGhpbmcgb3V0XG4gICAgc2V0VGltZW91dChcbiAgICAgICgpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMuX3Rvb2x0aXBFbGVtZW50ICYmXG4gICAgICAgICAgdHlwZW9mIHRoaXMuX3Rvb2x0aXBFbGVtZW50LmRlc3Ryb3kgPT09ICdmdW5jdGlvbidcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5fdG9vbHRpcEVsZW1lbnQuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudG9vbHRpcEN0cmwucmVtb3ZlVG9vbHRpcCh0aGlzKTtcbiAgICAgICAgdGhpcy5fdG9vbHRpcEVsZW1lbnQgPSB0aGlzLl90b29sdGlwVGltZW91dCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5jYW5TaG93ID0gdHJ1ZTtcbiAgICAgIH0sXG4gICAgICAzMDBcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVzZXRUaW1lcigpOnZvaWQge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLl90b29sdGlwVGltZW91dCk7XG4gICAgdGhpcy5fdG9vbHRpcFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgfSwgdGhpcy5kdXJhdGlvbik7XG4gIH1cbn1cbiJdfQ==