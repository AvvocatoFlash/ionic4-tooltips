import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipBox } from './components/tooltip-box/tooltip-box.component';
import { TooltipController } from './controllers/tooltip.cotroller';
import { TooltipDirective } from './directives/tooltip.directive';
import * as i0 from "@angular/core";
export class TooltipsModule {
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
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TooltipsModule, [{
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
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(TooltipsModule, { declarations: [TooltipDirective,
        TooltipBox], imports: [CommonModule], exports: [TooltipDirective] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vcHJvamVjdHMvaW9uaWM0LXRvb2x0aXBzL3NyYy90b29sdGlwcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTVELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxnREFBZ0QsQ0FBQztBQUMxRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNsRSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQzs7QUFpQmhFLE1BQU0sT0FBTyxjQUFjO0lBQ3pCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFNBQVMsRUFBRTtnQkFDVCxpQkFBaUI7YUFDbEI7U0FDRixDQUFDO0lBQ0osQ0FBQzs7K0ZBUlUsY0FBYzsrRkFBZCxjQUFjO21HQUh2QixZQUFZO3VGQUdILGNBQWM7Y0FmMUIsUUFBUTtlQUFDO2dCQUNSLFlBQVksRUFBRTtvQkFDWixnQkFBZ0I7b0JBQ2hCLFVBQVU7aUJBQ1g7Z0JBQ0QsZUFBZSxFQUFFO29CQUNmLFVBQVU7aUJBQ1g7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLGdCQUFnQjtpQkFDakI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLFlBQVk7aUJBQ2I7YUFDRjs7d0ZBQ1ksY0FBYyxtQkFidkIsZ0JBQWdCO1FBQ2hCLFVBQVUsYUFTVixZQUFZLGFBSFosZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtUb29sdGlwQm94fSBmcm9tICcuL2NvbXBvbmVudHMvdG9vbHRpcC1ib3gvdG9vbHRpcC1ib3guY29tcG9uZW50JztcbmltcG9ydCB7VG9vbHRpcENvbnRyb2xsZXJ9IGZyb20gJy4vY29udHJvbGxlcnMvdG9vbHRpcC5jb3Ryb2xsZXInO1xuaW1wb3J0IHtUb29sdGlwRGlyZWN0aXZlfSBmcm9tICcuL2RpcmVjdGl2ZXMvdG9vbHRpcC5kaXJlY3RpdmUnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBUb29sdGlwRGlyZWN0aXZlLFxuICAgIFRvb2x0aXBCb3hcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgVG9vbHRpcEJveFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgVG9vbHRpcERpcmVjdGl2ZVxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgVG9vbHRpcHNNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOk1vZHVsZVdpdGhQcm92aWRlcnM8VG9vbHRpcHNNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFRvb2x0aXBzTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIFRvb2x0aXBDb250cm9sbGVyXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==