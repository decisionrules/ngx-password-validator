import { ApplicationRef, ComponentFactoryResolver, ElementRef, EventEmitter, Injector, OnChanges, OnDestroy, SimpleChange } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from './data.service';
import { IElementPosition, IPosition, NgPasswordValidatorOptions } from './ng-password-validator.interface';
import { UtilsService } from './utils.service';
import * as i0 from "@angular/core";
export declare class NgPasswordValidatorDirective implements OnDestroy, OnChanges {
    private initOptions;
    private elementRef;
    private componentFactoryResolver;
    private appRef;
    private dataService;
    private utilsService;
    private injector;
    regExpForLength: RegExp;
    regExpForOneUpper: RegExp;
    regExpForOneLower: RegExp;
    regExpForOneDigit: RegExp;
    regExpForSpecialCharacters: RegExp;
    isValid: boolean;
    inputValue: string;
    componentRef: any;
    elementPosition: IElementPosition;
    passwordOptions: NgPasswordValidatorOptions;
    componentSubscribe: Subscription;
    popup: NgPasswordValidatorOptions;
    events: EventEmitter<any>;
    valid: EventEmitter<boolean>;
    constructor(initOptions: any, elementRef: ElementRef, componentFactoryResolver: ComponentFactoryResolver, appRef: ApplicationRef, dataService: DataService, utilsService: UtilsService, injector: Injector);
    get options(): NgPasswordValidatorOptions;
    get isPopupDestroyed(): boolean;
    get popupPosition(): IElementPosition | IPosition;
    /**
     * Focus in input field
     *
     * @memberof NgPasswordValidatorDirective
     */
    onMouseEnter(value: any): void;
    /**
     * Focus out of input field
     *
     * @memberof NgPasswordValidatorDirective
     */
    onMouseLeave(): void;
    /**
     * Input field value
     *
     * @param {string} value
     * @memberof NgPasswordValidatorDirective
     */
    onInput(value: string): void;
    /**
     * On input change
     *
     * @param {{ popup: SimpleChange }} changes
     * @memberof NgPasswordValidatorDirective
     */
    ngOnChanges(changes: {
        popup: SimpleChange;
    }): void;
    /**
     * Destroy the pop up and unsubscribe to release the memory
     *
     * @memberof NgPasswordValidatorDirective
     */
    ngOnDestroy(): void;
    /**
     * Create password regex
     *
     * @memberof NgPasswordValidatorDirective
     */
    createPasswordRegex(): void;
    /**
     * Check password if valid or not
     *
     * @param {string} inputValue
     * @memberof NgPasswordValidatorDirective
     */
    checkPassword(inputValue: string): void;
    /**
     * Update password options
     *
     * @memberof NgPasswordValidatorDirective
     */
    updatePasswordOptions(): void;
    /**
     * Get properties
     *
     * @param {{ popup: SimpleChange }} changes
     * @returns {{ popup: any }}
     * @memberof NgPasswordValidatorDirective
     */
    getProperties(changes: {
        popup: SimpleChange;
    }): {
        popup: any;
    };
    /**
     * Get element position
     *
     * @memberof NgPasswordValidatorDirective
     */
    getElementPosition(): void;
    /**
     * Create Popup
     *
     * @memberof NgPasswordValidatorDirective
     */
    createPopup(): void;
    /**
     * Destroy Popup
     *
     * @returns {void}
     * @memberof NgPasswordValidatorDirective
     */
    destroyPopup(): void;
    /**
     * Show popup window
     *
     * @memberof NgPasswordValidatorDirective
     */
    showPopupElem(): void;
    /**
     * Hide popup window
     *
     * @returns {void}
     * @memberof NgPasswordValidatorDirective
     */
    hidePopup(): void;
    /**
     * Append created popup window to body
     *
     * @param {*} component
     * @memberof NgPasswordValidatorDirective
     */
    appendComponentToBody(component: any): void;
    /**
     * Reset/switching back to default options
     *
     * @param {NgPasswordValidatorOptions} defaultOption
     * @param {{ popup: SimpleChange }} options
     * @memberof NgPasswordValidatorDirective
     */
    applyOptionsDefault(options: {
        popup: SimpleChange;
    }, defaultOption: NgPasswordValidatorOptions): void;
    /**
     * Handle events
     *
     * @param {*} event
     * @memberof NgPasswordValidatorDirective
     */
    handleEvents(event: any): void;
    /**
     * It creates popup window to show password requirement
     *
     * @memberof NgPasswordValidatorDirective
     */
    show(): void;
    /**
     * Hide/Destroys popup windows
     *
     * @memberof NgPasswordValidatorDirective
     */
    hide(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgPasswordValidatorDirective, [{ optional: true; }, null, null, null, null, null, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgPasswordValidatorDirective, "[NgPasswordValidator]", ["NgPasswordValidator"], { "popup": "NgPasswordValidator"; }, { "events": "events"; "valid": "valid"; }, never>;
}
//# sourceMappingURL=ng-password-validator.directive.d.ts.map