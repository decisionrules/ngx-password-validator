import { ElementRef, EventEmitter, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { DataService } from './data.service';
import { IElementPosition, IRules, NgPasswordValidatorOptions } from './ng-password-validator.interface';
import * as i0 from "@angular/core";
export declare class NgPasswordValidatorComponent implements OnInit, OnChanges {
    private elementRef;
    private renderer;
    private dataService;
    heading: string;
    successMessage: string;
    passwordStatus: {
        password: boolean;
        'include-symbol': boolean;
        'include-number': boolean;
        'include-lowercase-characters': boolean;
        'include-uppercase-characters': boolean;
    };
    isSecure: boolean;
    Show: boolean;
    events: EventEmitter<any>;
    passwordOptions: NgPasswordValidatorOptions;
    data: any;
    hostStyleTop: string;
    hostStyleLeft: string;
    hostStyleZIndex: number;
    hostStyleTransition: string;
    hostStyleWidth: string;
    hostStyleMaxWidth: string;
    hostStylePointerEvents: string;
    hostClassShow: boolean;
    hostClassShadow: boolean;
    /**
     * Host listener transition end
     *
     * @memberof NgPasswordValidatorComponent
     */
    transitionEnd(): void;
    set show(value: boolean);
    get show(): boolean;
    get placement(): string;
    get element(): any;
    get elementPosition(): IElementPosition;
    get options(): NgPasswordValidatorOptions;
    get popupOffset(): number;
    get rules(): IRules;
    get defaultOptions(): NgPasswordValidatorOptions;
    constructor(elementRef: ElementRef, renderer: Renderer2, dataService: DataService);
    /**
     * Component initialization
     *
     * @memberof NgPasswordValidatorComponent
     */
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Set popup window position
     *
     * @returns {void}
     * @memberof NgPasswordValidatorComponent
     */
    setPosition(): void;
    /**
     * Set popup placement class
     *
     * @param {string} placement
     * @memberof NgPasswordValidatorComponent
     */
    setPlacementClass(placement: string): void;
    /**
     * Set host element style
     *
     * @param {string} placement
     * @returns {boolean}
     * @memberof NgPasswordValidatorComponent
     */
    setHostStyle(placement: string): boolean;
    /**
     * Sets Z-index
     *
     * @memberof NgPasswordValidatorComponent
     */
    setZIndex(): void;
    /**
     * Ste custom class name
     *
     * @memberof NgPasswordValidatorComponent
     */
    setCustomClass(): void;
    /**
     * Set theme
     *
     * @memberof NgPasswordValidatorComponent
     */
    setTheme(): void;
    setCustomText(): void;
    /**
     * Sets the animation duration
     *
     * @memberof NgPasswordValidatorComponent
     */
    setAnimationDuration(): void;
    /**
     * Set popup window style
     *
     * @memberof NgPasswordValidatorComponent
     */
    setStyles(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgPasswordValidatorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgPasswordValidatorComponent, "lib-ng-password-validator", never, { "data": "data"; "show": "show"; }, {}, never, never>;
}
//# sourceMappingURL=ng-password-validator.component.d.ts.map