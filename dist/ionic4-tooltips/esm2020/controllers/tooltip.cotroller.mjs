import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class TooltipController {
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
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TooltipController, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb3Ryb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9pb25pYzQtdG9vbHRpcHMvc3JjL2NvbnRyb2xsZXJzL3Rvb2x0aXAuY290cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBTXpDLE1BQU0sT0FBTyxpQkFBaUI7SUFIOUI7UUFJUyxrQkFBYSxHQUFXLElBQUksQ0FBQztRQUM3QixtQkFBYyxHQUFzQixFQUFFLENBQUM7S0FxQi9DO0lBbkJDLFVBQVUsQ0FBQyxRQUF5QjtRQUNsQyxJQUFJLFFBQVEsQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNoRixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDaEI7UUFFRCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsYUFBYSxDQUFDLFFBQXlCO1FBQ3JDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQ3pCLENBQUMsT0FBd0IsRUFBRSxFQUFFO1lBQzNCLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQ0YsQ0FBQztJQUNKLENBQUM7O3FHQXRCVSxpQkFBaUI7c0dBQWpCLGlCQUFpQixXQUFqQixpQkFBaUIsbUJBRmhCLE1BQU07dUZBRVAsaUJBQWlCO2NBSDdCLFVBQVU7ZUFBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1Rvb2x0aXBEaXJlY3RpdmV9IGZyb20gJy4uL2RpcmVjdGl2ZXMvdG9vbHRpcC5kaXJlY3RpdmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgVG9vbHRpcENvbnRyb2xsZXIge1xuICBwdWJsaWMgYWxsb3dNdWx0aXBsZTpib29sZWFuID0gdHJ1ZTtcbiAgcHVibGljIGFjdGl2ZVRvb2x0aXBzOlRvb2x0aXBEaXJlY3RpdmVbXSA9IFtdO1xuXG4gIGFkZFRvb2x0aXAoaW5zdGFuY2U6VG9vbHRpcERpcmVjdGl2ZSk6dm9pZCB7XG4gICAgaWYgKGluc3RhbmNlLmhpZGVPdGhlcnMgfHwgIXRoaXMuYWxsb3dNdWx0aXBsZSAmJiB0aGlzLmFjdGl2ZVRvb2x0aXBzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuaGlkZUFsbCgpO1xuICAgIH1cblxuICAgIHRoaXMuYWN0aXZlVG9vbHRpcHMucHVzaChpbnN0YW5jZSk7XG4gIH1cblxuICByZW1vdmVUb29sdGlwKGluc3RhbmNlOlRvb2x0aXBEaXJlY3RpdmUpOnZvaWQge1xuICAgIHRoaXMuYWN0aXZlVG9vbHRpcHMuc3BsaWNlKHRoaXMuYWN0aXZlVG9vbHRpcHMuaW5kZXhPZihpbnN0YW5jZSksIDEpO1xuICB9XG5cbiAgaGlkZUFsbCgpOnZvaWQge1xuICAgIHRoaXMuYWN0aXZlVG9vbHRpcHMuZm9yRWFjaChcbiAgICAgICh0b29sdGlwOlRvb2x0aXBEaXJlY3RpdmUpID0+IHtcbiAgICAgICAgdG9vbHRpcC5yZW1vdmVUb29sdGlwKCk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxufVxuIl19