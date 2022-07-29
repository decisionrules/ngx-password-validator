import { ModuleWithProviders } from '@angular/core';
import { NgPasswordValidatorOptions } from './ng-password-validator.interface';
import * as i0 from "@angular/core";
import * as i1 from "./ng-password-validator.directive";
import * as i2 from "./ng-password-validator.component";
import * as i3 from "@angular/common";
export declare class NgPasswordValidatorModule {
    /**
     * Password validator module
     *
     * @static
     * @param {NgPasswordValidatorOptions} initOptions
     * @returns {ModuleWithProviders<NgPasswordValidatorModule>}
     * @memberof NgPasswordValidatorModule
     */
    static forRoot(initOptions: NgPasswordValidatorOptions): ModuleWithProviders<NgPasswordValidatorModule>;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgPasswordValidatorModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgPasswordValidatorModule, [typeof i1.NgPasswordValidatorDirective, typeof i2.NgPasswordValidatorComponent], [typeof i3.CommonModule], [typeof i1.NgPasswordValidatorDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgPasswordValidatorModule>;
}
//# sourceMappingURL=ng-password-validator.module.d.ts.map