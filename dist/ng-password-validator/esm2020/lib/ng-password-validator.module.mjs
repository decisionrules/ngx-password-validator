import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataService } from './data.service';
import { NgPasswordValidatorComponent } from './ng-password-validator.component';
import { NgPasswordValidatorDirective } from './ng-password-validator.directive';
import { NgPasswordValidatorService } from './ng-password-validator.service';
import { UtilsService } from './utils.service';
import * as i0 from "@angular/core";
export class NgPasswordValidatorModule {
    /**
     * Password validator module
     *
     * @static
     * @param {NgPasswordValidatorOptions} initOptions
     * @returns {ModuleWithProviders<NgPasswordValidatorModule>}
     * @memberof NgPasswordValidatorModule
     */
    static forRoot(initOptions) {
        return {
            ngModule: NgPasswordValidatorModule,
            providers: [
                {
                    provide: NgPasswordValidatorService,
                    useValue: initOptions,
                },
            ],
        };
    }
}
NgPasswordValidatorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgPasswordValidatorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgPasswordValidatorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgPasswordValidatorModule, declarations: [NgPasswordValidatorDirective, NgPasswordValidatorComponent], imports: [CommonModule], exports: [NgPasswordValidatorDirective] });
NgPasswordValidatorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgPasswordValidatorModule, providers: [DataService, UtilsService], imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgPasswordValidatorModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NgPasswordValidatorDirective, NgPasswordValidatorComponent],
                    imports: [CommonModule],
                    providers: [DataService, UtilsService],
                    exports: [NgPasswordValidatorDirective]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcGFzc3dvcmQtdmFsaWRhdG9yLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXBhc3N3b3JkLXZhbGlkYXRvci9zcmMvbGliL25nLXBhc3N3b3JkLXZhbGlkYXRvci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNqRixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVqRixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBUS9DLE1BQU0sT0FBTyx5QkFBeUI7SUFDcEM7Ozs7Ozs7T0FPRztJQUNILE1BQU0sQ0FBQyxPQUFPLENBQ1osV0FBdUM7UUFFdkMsT0FBTztZQUNMLFFBQVEsRUFBRSx5QkFBeUI7WUFDbkMsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSwwQkFBMEI7b0JBQ25DLFFBQVEsRUFBRSxXQUFXO2lCQUN0QjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7O3VIQXJCVSx5QkFBeUI7d0hBQXpCLHlCQUF5QixpQkFMbkIsNEJBQTRCLEVBQUUsNEJBQTRCLGFBQy9ELFlBQVksYUFFWiw0QkFBNEI7d0hBRTdCLHlCQUF5QixhQUh2QixDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsWUFEN0IsQ0FBQyxZQUFZLENBQUM7NEZBSWQseUJBQXlCO2tCQU5yQyxRQUFRO21CQUFDO29CQUNOLFlBQVksRUFBRSxDQUFDLDRCQUE0QixFQUFFLDRCQUE0QixDQUFDO29CQUMxRSxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFNBQVMsRUFBRSxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUM7b0JBQ3RDLE9BQU8sRUFBRSxDQUFDLDRCQUE0QixDQUFDO2lCQUMxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi9kYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOZ1Bhc3N3b3JkVmFsaWRhdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9uZy1wYXNzd29yZC12YWxpZGF0b3IuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTmdQYXNzd29yZFZhbGlkYXRvckRpcmVjdGl2ZSB9IGZyb20gJy4vbmctcGFzc3dvcmQtdmFsaWRhdG9yLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IE5nUGFzc3dvcmRWYWxpZGF0b3JPcHRpb25zIH0gZnJvbSAnLi9uZy1wYXNzd29yZC12YWxpZGF0b3IuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgTmdQYXNzd29yZFZhbGlkYXRvclNlcnZpY2UgfSBmcm9tICcuL25nLXBhc3N3b3JkLXZhbGlkYXRvci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVXRpbHNTZXJ2aWNlIH0gZnJvbSAnLi91dGlscy5zZXJ2aWNlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBkZWNsYXJhdGlvbnM6IFtOZ1Bhc3N3b3JkVmFsaWRhdG9yRGlyZWN0aXZlLCBOZ1Bhc3N3b3JkVmFsaWRhdG9yQ29tcG9uZW50XSxcclxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gICAgcHJvdmlkZXJzOiBbRGF0YVNlcnZpY2UsIFV0aWxzU2VydmljZV0sXHJcbiAgICBleHBvcnRzOiBbTmdQYXNzd29yZFZhbGlkYXRvckRpcmVjdGl2ZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nUGFzc3dvcmRWYWxpZGF0b3JNb2R1bGUge1xyXG4gIC8qKlxyXG4gICAqIFBhc3N3b3JkIHZhbGlkYXRvciBtb2R1bGVcclxuICAgKlxyXG4gICAqIEBzdGF0aWNcclxuICAgKiBAcGFyYW0ge05nUGFzc3dvcmRWYWxpZGF0b3JPcHRpb25zfSBpbml0T3B0aW9uc1xyXG4gICAqIEByZXR1cm5zIHtNb2R1bGVXaXRoUHJvdmlkZXJzPE5nUGFzc3dvcmRWYWxpZGF0b3JNb2R1bGU+fVxyXG4gICAqIEBtZW1iZXJvZiBOZ1Bhc3N3b3JkVmFsaWRhdG9yTW9kdWxlXHJcbiAgICovXHJcbiAgc3RhdGljIGZvclJvb3QoXHJcbiAgICBpbml0T3B0aW9uczogTmdQYXNzd29yZFZhbGlkYXRvck9wdGlvbnNcclxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE5nUGFzc3dvcmRWYWxpZGF0b3JNb2R1bGU+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBOZ1Bhc3N3b3JkVmFsaWRhdG9yTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwcm92aWRlOiBOZ1Bhc3N3b3JkVmFsaWRhdG9yU2VydmljZSxcclxuICAgICAgICAgIHVzZVZhbHVlOiBpbml0T3B0aW9ucyxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfTtcclxuICB9XHJcbn1cclxuIl19