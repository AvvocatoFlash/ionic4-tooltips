import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function TooltipBox_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 3);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", ctx_r0.tooltipHtml, i0.ɵɵsanitizeHtml);
} }
function TooltipBox_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 4);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHtml", ctx_r2.text, i0.ɵɵsanitizeHtml);
} }
export class TooltipBox {
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
/** @nocollapse */ TooltipBox.ɵcmp = /** @pureOrBreakMyCode */ i0.ɵɵdefineComponent({ type: TooltipBox, selectors: [["tooltip-box"]], hostVars: 1, hostBindings: function TooltipBox_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵsyntheticHostProperty("@fade", ctx.fadeState);
    } }, inputs: { role: "role", text: "text", tooltipHtml: "tooltipHtml", tooltipStyles: "tooltipStyles", arrow: "arrow", posTop: "posTop", posLeft: "posLeft" }, decls: 4, vars: 4, consts: [[1, "tooltip-box", 3, "ngStyle"], [3, "innerHTML", 4, "ngIf", "ngIfElse"], ["txt", ""], [3, "innerHTML"], [3, "innerHtml"]], template: function TooltipBox_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtemplate(1, TooltipBox_div_1_Template, 1, 1, "div", 1);
        i0.ɵɵtemplate(2, TooltipBox_ng_template_2_Template, 1, 1, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        const _r1 = i0.ɵɵreference(3);
        i0.ɵɵproperty("ngStyle", ctx.tooltipStyles);
        i0.ɵɵattribute("aria-role", ctx.role);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.tooltipHtml)("ngIfElse", _r1);
    } }, dependencies: [i1.NgIf, i1.NgStyle], styles: ["[_nghost-%COMP%]{background-color:#000c;color:#fff;display:inline-block;position:fixed;padding:15px 25px;font-size:15px;z-index:3}.has-arrow[_nghost-%COMP%]:before{content:\"\";border:5px solid transparent;position:absolute;width:0;height:0}.has-arrow.arrow-top[_nghost-%COMP%]:before{border-bottom:5px solid rgba(0,0,0,.8);top:-10px}.has-arrow.arrow-left[_nghost-%COMP%]:before{border-right:5px solid rgba(0,0,0,.8);left:-10px}.has-arrow.arrow-right[_nghost-%COMP%]:before{border-left:5px solid rgba(0,0,0,.8);right:-10px}.has-arrow.arrow-bottom[_nghost-%COMP%]:before{border-top:5px solid rgba(0,0,0,.8);bottom:-10px}"], data: { animation: [
            trigger('fade', [
                state('visible', style({ opacity: 1 })),
                state('invisible', style({ opacity: 0 })),
                transition('visible <=> invisible', animate('300ms linear'))
            ])
        ] }, changeDetection: 0 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TooltipBox, [{
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC1ib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaW9uaWM0LXRvb2x0aXBzL3NyYy9jb21wb25lbnRzL3Rvb2x0aXAtYm94L3Rvb2x0aXAtYm94LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2lvbmljNC10b29sdGlwcy9zcmMvY29tcG9uZW50cy90b29sdGlwLWJveC90b29sdGlwLWJveC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pGLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixXQUFXLEVBQ1gsS0FBSyxFQUNMLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQzs7OztJQ05yQix5QkFBbUU7OztJQUFoQyxpRUFBeUI7OztJQUUxQyx5QkFBOEI7OztJQUF6QiwwREFBa0I7O0FEcUIzQyxNQUFNLE9BQU8sVUFBVTtJQXVDckIsWUFDUyxVQUFxQixFQUNwQixHQUFhO1FBRGQsZUFBVSxHQUFWLFVBQVUsQ0FBVztRQUNwQixRQUFHLEdBQUgsR0FBRyxDQUFVO1FBeENELGNBQVMsR0FBVSxXQUFXLENBQUM7UUFFNUMsU0FBSSxHQUFVLFFBQVEsQ0FBQztRQUd2QixrQkFBYSxHQUE0QixFQUFFLENBQUM7UUFxQ25ELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQ3JCLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDVixJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQztRQUMvQixDQUFDLENBQ0EsQ0FBQztJQUNKLENBQUM7SUF4Q0QsSUFDSSxLQUFLLENBQUMsSUFBVztRQUNuQixJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FDbkIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQ3ZCLE9BQU8sRUFDUCxZQUFZLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FDL0IsQ0FBQztJQUNKLENBQUM7SUFFRCxJQUNJLE1BQU0sQ0FBQyxHQUFVO1FBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUNmLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUN2QixLQUFLLEVBQ0wsR0FBRyxHQUFHLElBQUksQ0FDWCxDQUFDO0lBQ0osQ0FBQztJQUVELElBQ0ksT0FBTyxDQUFDLEdBQVU7UUFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQ2YsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQ3ZCLE1BQU0sRUFDTixHQUFHLEdBQUcsSUFBSSxDQUNYLENBQUM7SUFDSixDQUFDO0lBaUJELGdCQUFnQjtRQUNkLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7SUFDdkMsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQzs7dUZBeERVLFVBQVU7NEZBQVYsVUFBVTs7O1FDMUJ2Qiw4QkFFK0I7UUFDN0IsMkRBQW1FO1FBRW5FLDRHQUE4RDtRQUNoRSxpQkFBTTs7O1FBSkQsMkNBQXlCO1FBRHpCLHFDQUF1QjtRQUVwQixlQUFtQjtRQUFuQixzQ0FBbUIsaUJBQUE7MHJCRGNiO1lBQ1YsT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDZCxLQUFLLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN2QyxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUN6QyxVQUFVLENBQUMsdUJBQXVCLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQzdELENBQUM7U0FDSDt1RkFHVSxVQUFVO2NBZnRCLFNBQVM7MkJBQ0ssYUFBYSxjQUtkO29CQUNWLE9BQU8sQ0FBQyxNQUFNLEVBQUU7d0JBQ2QsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDdkMsS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDekMsVUFBVSxDQUFDLHVCQUF1QixFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztxQkFDN0QsQ0FBQztpQkFDSCxtQkFDZSx1QkFBdUIsQ0FBQyxNQUFNO3FGQUd4QixTQUFTO2tCQUE5QixXQUFXO21CQUFDLE9BQU87WUFFWCxJQUFJO2tCQUFaLEtBQUs7WUFDRyxJQUFJO2tCQUFaLEtBQUs7WUFDRyxXQUFXO2tCQUFuQixLQUFLO1lBQ0csYUFBYTtrQkFBckIsS0FBSztZQUdGLEtBQUs7a0JBRFIsS0FBSztZQVVGLE1BQU07a0JBRFQsS0FBSztZQVVGLE9BQU87a0JBRFYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFuaW1hdGUsIHN0YXRlLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIElucHV0LFxuICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogICAgJ3Rvb2x0aXAtYm94JyxcbiAgdGVtcGxhdGVVcmw6ICd0b29sdGlwLWJveC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogW1xuICAgICd0b29sdGlwLWJveC5jb21wb25lbnQuc2NzcydcbiAgXSxcbiAgYW5pbWF0aW9uczogW1xuICAgIHRyaWdnZXIoJ2ZhZGUnLCBbXG4gICAgICBzdGF0ZSgndmlzaWJsZScsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSksXG4gICAgICBzdGF0ZSgnaW52aXNpYmxlJywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKSxcbiAgICAgIHRyYW5zaXRpb24oJ3Zpc2libGUgPD0+IGludmlzaWJsZScsIGFuaW1hdGUoJzMwMG1zIGxpbmVhcicpKVxuICAgIF0pXG4gIF0sXG4gIGNoYW5nZURldGVjdGlvbjpDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgVG9vbHRpcEJveCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBASG9zdEJpbmRpbmcoJ0BmYWRlJykgZmFkZVN0YXRlOnN0cmluZyA9ICdpbnZpc2libGUnO1xuXG4gIEBJbnB1dCgpIHJvbGU6c3RyaW5nID0gJ3N0YXR1cyc7XG4gIEBJbnB1dCgpIHRleHQ6c3RyaW5nO1xuICBASW5wdXQoKSB0b29sdGlwSHRtbDpzdHJpbmc7XG4gIEBJbnB1dCgpIHRvb2x0aXBTdHlsZXM6eyBba2V5OnN0cmluZ106c3RyaW5nOyB9ID0ge307XG5cbiAgQElucHV0KClcbiAgc2V0IGFycm93KHNpZGU6c3RyaW5nKSB7XG4gICAgdGhpcy5ybmQuc2V0QXR0cmlidXRlKFxuICAgICAgdGhpcy5nZXROYXRpdmVFbGVtZW50KCksXG4gICAgICAnY2xhc3MnLFxuICAgICAgJ2hhcy1hcnJvdyAnICsgJ2Fycm93LScgKyBzaWRlXG4gICAgKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBwb3NUb3AodmFsOm51bWJlcikge1xuICAgIHRoaXMucm5kLnNldFN0eWxlKFxuICAgICAgdGhpcy5nZXROYXRpdmVFbGVtZW50KCksXG4gICAgICAndG9wJyxcbiAgICAgIHZhbCArICdweCdcbiAgICApO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IHBvc0xlZnQodmFsOm51bWJlcikge1xuICAgIHRoaXMucm5kLnNldFN0eWxlKFxuICAgICAgdGhpcy5nZXROYXRpdmVFbGVtZW50KCksXG4gICAgICAnbGVmdCcsXG4gICAgICB2YWwgKyAncHgnXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdFJlc29sdmU6RnVuY3Rpb247XG5cbiAgcHVibGljIGluaXQ6UHJvbWlzZTx2b2lkPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZWxlbWVudFJlZjpFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcm5kOlJlbmRlcmVyMlxuICApIHtcbiAgICB0aGlzLmluaXQgPSBuZXcgUHJvbWlzZTx2b2lkPihcbiAgICAgIChyZXNvbHZlKSA9PiB7XG4gICAgICAgIHRoaXMuaW5pdFJlc29sdmUgPSByZXNvbHZlO1xuICAgIH1cbiAgICApO1xuICB9XG5cbiAgZ2V0TmF0aXZlRWxlbWVudCgpOkhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTp2b2lkIHtcbiAgICB0aGlzLmluaXRSZXNvbHZlKCk7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJ0b29sdGlwLWJveFwiXG4gICAgIFthdHRyLmFyaWEtcm9sZV09XCJyb2xlXCJcbiAgICAgW25nU3R5bGVdPVwidG9vbHRpcFN0eWxlc1wiPlxuICA8ZGl2ICpuZ0lmPVwidG9vbHRpcEh0bWw7IGVsc2UgdHh0XCIgW2lubmVySFRNTF09XCJ0b29sdGlwSHRtbFwiPjwvZGl2PlxuXG4gIDxuZy10ZW1wbGF0ZSAjdHh0PjxkaXYgW2lubmVySHRtbF09XCJ0ZXh0XCI+PC9kaXY+PC9uZy10ZW1wbGF0ZT5cbjwvZGl2PlxuIl19