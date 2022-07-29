import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, Input, HostBinding, HostListener, Directive, Optional, Inject, Output, NgModule } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';

class NgPasswordValidatorService {
    constructor() { }
}
NgPasswordValidatorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgPasswordValidatorService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NgPasswordValidatorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgPasswordValidatorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgPasswordValidatorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return []; } });

const defaultOptions = {
    placement: 'bottom',
    'z-index': 0,
    'custom-class': '',
    shadow: true,
    theme: 'pro',
    type: 'popup',
    offset: 8,
    heading: 'Password Policy',
    successMessage: 'Awesome! Password requirement fulfilled.',
    rules: {
        password: {
            type: 'range',
            length: 8,
            min: 6,
            max: 10,
        },
        'include-symbol': true,
        'include-number': true,
        'include-lowercase-characters': true,
        'include-uppercase-characters': true,
    },
};
const initializeStage = {
    password: false,
    'include-symbol': false,
    'include-number': false,
    'include-lowercase-characters': false,
    'include-uppercase-characters': false,
};

class DataService {
    constructor() {
        this.value = new BehaviorSubject(initializeStage);
        this.updatedValue = this.value.asObservable();
    }
    updateValue(data) {
        this.value.next(data);
    }
}
DataService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DataService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
DataService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DataService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: DataService, decorators: [{
            type: Injectable
        }] });

class NgPasswordValidatorComponent {
    constructor(elementRef, renderer, dataService) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.dataService = dataService;
        this.passwordStatus = {
            password: false,
            'include-symbol': false,
            'include-number': false,
            'include-lowercase-characters': false,
            'include-uppercase-characters': false,
        };
        this.isSecure = false;
        this.Show = false;
        this.events = new EventEmitter();
        this.passwordOptions = { ...defaultOptions };
    }
    /**
     * Host listener transition end
     *
     * @memberof NgPasswordValidatorComponent
     */
    transitionEnd() {
        if (this.show) {
            this.events.emit({
                type: 'shown',
            });
        }
    }
    set show(value) {
        if (value) {
            this.setPosition();
        }
        this.Show = this.hostClassShow = value;
    }
    get show() {
        return this.Show;
    }
    get placement() {
        return this.data.options.placement;
    }
    get element() {
        return this.data.element;
    }
    get elementPosition() {
        return this.data.elementPosition;
    }
    get options() {
        return this.data.options;
    }
    get popupOffset() {
        switch (this.data.options.offset) {
            case '':
                return defaultOptions.offset;
            case '0':
                return +this.data.options.offset;
            default:
                return +this.data.options.offset;
        }
    }
    get rules() {
        return {
            ...this.data.defaultOptions.rules,
            ...this.data.options.rules,
        };
    }
    get defaultOptions() {
        return this.data.defaultOptions;
    }
    /**
     * Component initialization
     *
     * @memberof NgPasswordValidatorComponent
     */
    ngOnInit() {
        this.setCustomClass();
        this.setStyles();
        this.setTheme();
        this.setCustomText();
        this.dataService.updatedValue.subscribe((data) => {
            this.passwordStatus = { ...this.passwordStatus, ...data };
            for (const propName in this.passwordOptions.rules) {
                if (!this.passwordOptions.rules[propName]) {
                    delete this.passwordStatus[propName];
                }
            }
            this.isSecure = Object.values(this.passwordStatus).every((value) => value);
        });
    }
    ngOnChanges(changes) {
        if (changes && changes.data && changes.data.currentValue) {
            this.data = changes.data.currentValue;
        }
    }
    /**
     * Set popup window position
     *
     * @returns {void}
     * @memberof NgPasswordValidatorComponent
     */
    setPosition() {
        if (this.setHostStyle(this.placement)) {
            this.setPlacementClass(this.placement);
            return;
        }
        else {
            // Is popup outside the visible area
            const placements = ['top', 'right', 'bottom', 'left'];
            let isPlacementSet;
            for (const placement of placements) {
                if (this.setHostStyle(placement)) {
                    this.setPlacementClass(placement);
                    isPlacementSet = true;
                    return;
                }
            }
            // Set original placement
            if (!isPlacementSet) {
                this.setHostStyle(this.placement);
                this.setPlacementClass(this.placement);
            }
        }
    }
    /**
     * Set popup placement class
     *
     * @param {string} placement
     * @memberof NgPasswordValidatorComponent
     */
    setPlacementClass(placement) {
        this.renderer.addClass(this.elementRef.nativeElement, 'popup-' + placement);
    }
    /**
     * Set host element style
     *
     * @param {string} placement
     * @returns {boolean}
     * @memberof NgPasswordValidatorComponent
     */
    setHostStyle(placement) {
        const isSvg = this.element instanceof SVGElement;
        const popup = this.elementRef.nativeElement;
        const isCustomPosition = !this.elementPosition.right;
        let elementHeight = isSvg
            ? this.element.getBoundingClientRect().height
            : this.element.offsetHeight;
        let elementWidth = isSvg
            ? this.element.getBoundingClientRect().width
            : this.element.offsetWidth;
        const popupHeight = popup.clientHeight;
        const popupWidth = popup.clientWidth;
        const scrollY = window.pageYOffset;
        if (isCustomPosition) {
            elementHeight = 0;
            elementWidth = 0;
        }
        let topStyle;
        let leftStyle;
        switch (placement) {
            case 'top':
                topStyle =
                    this.elementPosition.top + scrollY - (popupHeight + this.popupOffset);
                leftStyle = this.elementPosition.left;
                break;
            case 'bottom':
                topStyle =
                    this.elementPosition.top + scrollY + elementHeight + this.popupOffset;
                leftStyle = this.elementPosition.left;
                break;
            case 'left':
                leftStyle = this.elementPosition.left - popupWidth - this.popupOffset;
                topStyle = this.elementPosition.top + scrollY;
                break;
            case 'right':
                leftStyle = this.elementPosition.left + elementWidth + this.popupOffset;
                topStyle = this.elementPosition.top + scrollY;
        }
        this.hostStyleTop = topStyle + 'px';
        this.hostStyleLeft = leftStyle + 'px';
        return true;
    }
    /**
     * Sets Z-index
     *
     * @memberof NgPasswordValidatorComponent
     */
    setZIndex() {
        if (this.options['z-index'] !== 0) {
            this.hostStyleZIndex = this.options['z-index'];
        }
    }
    /**
     * Ste custom class name
     *
     * @memberof NgPasswordValidatorComponent
     */
    setCustomClass() {
        if (this.options['custom-class']) {
            this.options['custom-class'].split(' ').forEach((className) => {
                this.renderer.addClass(this.elementRef.nativeElement, className);
            });
        }
    }
    /**
     * Set theme
     *
     * @memberof NgPasswordValidatorComponent
     */
    setTheme() {
        if (this.options['theme']) {
            this.renderer.addClass(this.elementRef.nativeElement, 'popup-' + this.options['theme']);
        }
    }
    setCustomText() {
        if (this.options['heading']) {
            this.heading = this.options['heading'];
        }
        if (this.options['successMessage']) {
            this.successMessage = this.options['successMessage'];
        }
    }
    /**
     * Sets the animation duration
     *
     * @memberof NgPasswordValidatorComponent
     */
    setAnimationDuration() {
        this.hostStyleTransition =
            'opacity ' + this.options['animation-duration'] + 'ms';
    }
    /**
     * Set popup window style
     *
     * @memberof NgPasswordValidatorComponent
     */
    setStyles() {
        this.setZIndex();
        this.setAnimationDuration();
        if (this.options.type !== 'inline') {
            this.hostClassShadow = this.options['shadow'];
        }
        this.hostStyleMaxWidth = this.options['max-width'] + 'px';
        this.hostStyleWidth = this.options['width']
            ? this.options['width'] + 'px'
            : '';
    }
}
NgPasswordValidatorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgPasswordValidatorComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: DataService }], target: i0.ɵɵFactoryTarget.Component });
NgPasswordValidatorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NgPasswordValidatorComponent, selector: "lib-ng-password-validator", inputs: { data: "data", show: "show" }, host: { listeners: { "transitionend": "transitionEnd()" }, properties: { "style.top": "this.hostStyleTop", "style.left": "this.hostStyleLeft", "style.z-index": "this.hostStyleZIndex", "style.transition": "this.hostStyleTransition", "style.width": "this.hostStyleWidth", "style.max-width": "this.hostStyleMaxWidth", "style.pointer-events": "this.hostStylePointerEvents", "class.popup-show": "this.hostClassShow", "class.popup-shadow": "this.hostClassShadow" }, classAttribute: "popup" }, usesOnChanges: true, ngImport: i0, template: "<div class=\"popup-window\">\r\n  <div class=\"heading\">{{heading}}</div>\r\n  <div *ngIf=\"rules['password']\">\r\n    <div class=\"rule\" [hidden]=\"rules['password'].type !== 'number'\"\r\n      [ngClass]=\"{'rule-pass':passwordStatus['password']}\">\r\n      Password length should be {{rules['password'].length}} characters.\r\n    </div>\r\n    <div class=\"rule\" [hidden]=\"rules['password'].type !== 'range'\"\r\n      [ngClass]=\"{'rule-pass':passwordStatus['password']}\">\r\n      Password length should be {{rules['password'].min}} - {{rules['password'].max}}\r\n      characters.\r\n    </div>\r\n  </div>\r\n  <div class=\"rule\" [hidden]=\"!rules['include-symbol']\" [ngClass]=\"{'rule-pass':passwordStatus['include-symbol']}\">\r\n    Include Symbols:( e.g. @#$% )\r\n  </div>\r\n  <div class=\"rule\" [hidden]=\"!rules['include-number']\" [ngClass]=\"{'rule-pass':passwordStatus['include-number']}\">\r\n    Include Numbers:( e.g.123456 )\r\n  </div>\r\n  <div class=\"rule\" [hidden]=\"!rules['include-lowercase-characters']\"\r\n    [ngClass]=\"{'rule-pass':passwordStatus['include-lowercase-characters']}\">\r\n    Include Lowercase Characters:(e.g. abcdefgh )\r\n  </div>\r\n  <div class=\"rule\" [hidden]=\"!rules['include-uppercase-characters']\"\r\n    [ngClass]=\"{'rule-pass':passwordStatus['include-uppercase-characters']}\">\r\n    Include Uppercase Characters:(e.g. ABCDEFGH )\r\n  </div>\r\n  <div class=\"success-message\" [hidden]=\"!isSecure\">\r\n    {{successMessage}}\r\n  </div>\r\n</div>\r\n", styles: ["@charset \"UTF-8\";:host{max-width:390px;background-color:#fff;color:#000;text-align:left;border-radius:6px;position:absolute;pointer-events:none;padding:10px;z-index:1000;display:block;opacity:0;transition:opacity .3s;top:0;left:0;transition:opacity .3s ease-in-out}:host.popup-show{opacity:1}:host.popup-shadow{box-shadow:0 1px 5px #0006}:host.popup .popup-window .heading{font-size:16px;margin-bottom:.5rem;font-weight:700}:host.popup .popup-window .rule{font-size:14px;color:#6a6a6a;line-height:18px;margin:3px 0}:host.popup .popup-window .rule:before{content:\"\\a\";width:5px;height:5px;border-radius:50%;background:#6a6a6a;display:inline-block;vertical-align:sub;margin:0 10px 6px 0}:host.popup .popup-window .rule.rule-pass{text-decoration:line-through;color:#d3d3d3}:host.popup .popup-window .rule.rule-pass:before{background:#d3d3d3}:host.popup .popup-window .success-message{color:#28a745;text-align:center;font-size:16px;margin-top:5px}:host.popup.popup-pro .popup-window .rule.rule-pass{color:#28a745;text-decoration:none}:host.popup.popup-pro .popup-window .rule.rule-pass:before{content:\"\\2713\"!important;width:0;height:0;padding-right:5px;vertical-align:inherit;background:#28a745}:host.popup.popup-pro .popup-window .success-message{color:#9c0404}\n"], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgPasswordValidatorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-ng-password-validator', host: { class: 'popup' }, template: "<div class=\"popup-window\">\r\n  <div class=\"heading\">{{heading}}</div>\r\n  <div *ngIf=\"rules['password']\">\r\n    <div class=\"rule\" [hidden]=\"rules['password'].type !== 'number'\"\r\n      [ngClass]=\"{'rule-pass':passwordStatus['password']}\">\r\n      Password length should be {{rules['password'].length}} characters.\r\n    </div>\r\n    <div class=\"rule\" [hidden]=\"rules['password'].type !== 'range'\"\r\n      [ngClass]=\"{'rule-pass':passwordStatus['password']}\">\r\n      Password length should be {{rules['password'].min}} - {{rules['password'].max}}\r\n      characters.\r\n    </div>\r\n  </div>\r\n  <div class=\"rule\" [hidden]=\"!rules['include-symbol']\" [ngClass]=\"{'rule-pass':passwordStatus['include-symbol']}\">\r\n    Include Symbols:( e.g. @#$% )\r\n  </div>\r\n  <div class=\"rule\" [hidden]=\"!rules['include-number']\" [ngClass]=\"{'rule-pass':passwordStatus['include-number']}\">\r\n    Include Numbers:( e.g.123456 )\r\n  </div>\r\n  <div class=\"rule\" [hidden]=\"!rules['include-lowercase-characters']\"\r\n    [ngClass]=\"{'rule-pass':passwordStatus['include-lowercase-characters']}\">\r\n    Include Lowercase Characters:(e.g. abcdefgh )\r\n  </div>\r\n  <div class=\"rule\" [hidden]=\"!rules['include-uppercase-characters']\"\r\n    [ngClass]=\"{'rule-pass':passwordStatus['include-uppercase-characters']}\">\r\n    Include Uppercase Characters:(e.g. ABCDEFGH )\r\n  </div>\r\n  <div class=\"success-message\" [hidden]=\"!isSecure\">\r\n    {{successMessage}}\r\n  </div>\r\n</div>\r\n", styles: ["@charset \"UTF-8\";:host{max-width:390px;background-color:#fff;color:#000;text-align:left;border-radius:6px;position:absolute;pointer-events:none;padding:10px;z-index:1000;display:block;opacity:0;transition:opacity .3s;top:0;left:0;transition:opacity .3s ease-in-out}:host.popup-show{opacity:1}:host.popup-shadow{box-shadow:0 1px 5px #0006}:host.popup .popup-window .heading{font-size:16px;margin-bottom:.5rem;font-weight:700}:host.popup .popup-window .rule{font-size:14px;color:#6a6a6a;line-height:18px;margin:3px 0}:host.popup .popup-window .rule:before{content:\"\\a\";width:5px;height:5px;border-radius:50%;background:#6a6a6a;display:inline-block;vertical-align:sub;margin:0 10px 6px 0}:host.popup .popup-window .rule.rule-pass{text-decoration:line-through;color:#d3d3d3}:host.popup .popup-window .rule.rule-pass:before{background:#d3d3d3}:host.popup .popup-window .success-message{color:#28a745;text-align:center;font-size:16px;margin-top:5px}:host.popup.popup-pro .popup-window .rule.rule-pass{color:#28a745;text-decoration:none}:host.popup.popup-pro .popup-window .rule.rule-pass:before{content:\"\\2713\"!important;width:0;height:0;padding-right:5px;vertical-align:inherit;background:#28a745}:host.popup.popup-pro .popup-window .success-message{color:#9c0404}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: DataService }]; }, propDecorators: { data: [{
                type: Input
            }], hostStyleTop: [{
                type: HostBinding,
                args: ['style.top']
            }], hostStyleLeft: [{
                type: HostBinding,
                args: ['style.left']
            }], hostStyleZIndex: [{
                type: HostBinding,
                args: ['style.z-index']
            }], hostStyleTransition: [{
                type: HostBinding,
                args: ['style.transition']
            }], hostStyleWidth: [{
                type: HostBinding,
                args: ['style.width']
            }], hostStyleMaxWidth: [{
                type: HostBinding,
                args: ['style.max-width']
            }], hostStylePointerEvents: [{
                type: HostBinding,
                args: ['style.pointer-events']
            }], hostClassShow: [{
                type: HostBinding,
                args: ['class.popup-show']
            }], hostClassShadow: [{
                type: HostBinding,
                args: ['class.popup-shadow']
            }], transitionEnd: [{
                type: HostListener,
                args: ['transitionend', ['']]
            }], show: [{
                type: Input
            }] } });

class UtilsService {
    /**
     * Deep merge objects
     *
     * @param {NgPasswordValidatorOptions} target
     * @param {NgPasswordValidatorOptions} source
     * @returns {NgPasswordValidatorOptions}
     * @memberof UtilsService
     */
    deepMerge(target, source) {
        // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
        for (const key of Object.keys(source)) {
            if (source[key] instanceof Object) {
                Object.assign(source[key], this.deepMerge(target[key], source[key]));
            }
        }
        // Join `target` and modified `source`
        Object.assign(target || {}, source);
        return target;
    }
}
UtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: UtilsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
UtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: UtilsService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: UtilsService, decorators: [{
            type: Injectable
        }] });

class NgPasswordValidatorDirective {
    constructor(initOptions, elementRef, componentFactoryResolver, appRef, dataService, utilsService, injector) {
        this.initOptions = initOptions;
        this.elementRef = elementRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.dataService = dataService;
        this.utilsService = utilsService;
        this.injector = injector;
        this.regExpForLength = /^(.){8}$/;
        this.regExpForOneUpper = /^(?=.*[A-Z])(.*)$/;
        this.regExpForOneLower = /^(?=.*[a-z])(.*)$/;
        this.regExpForOneDigit = /^(?=.*[0-9])(.*)$/;
        this.regExpForSpecialCharacters = /^(?=.*[!@#$%^&*])([a-zA-Z0-9!@#$%^&*]*)$/;
        this.isValid = false;
        this.inputValue = '';
        this.events = new EventEmitter();
        this.valid = new EventEmitter();
    }
    get options() {
        return this.passwordOptions;
    }
    get isPopupDestroyed() {
        return this.componentRef && this.componentRef.hostView.destroyed;
    }
    get popupPosition() {
        if (this.options['position']) {
            return this.options['position'];
        }
        else {
            return this.elementPosition;
        }
    }
    /**
     * Focus in input field
     *
     * @memberof NgPasswordValidatorDirective
     */
    onMouseEnter(value) {
        this.updatePasswordOptions();
        this.show();
        this.checkPassword(value);
    }
    /**
     * Focus out of input field
     *
     * @memberof NgPasswordValidatorDirective
     */
    onMouseLeave() {
        // If the template type is inline, don't destroy the created template
        if (this.passwordOptions.type !== 'inline') {
            this.destroyPopup();
        }
        this.valid.emit(this.isValid);
    }
    /**
     * Input field value
     *
     * @param {string} value
     * @memberof NgPasswordValidatorDirective
     */
    onInput(value) {
        this.checkPassword(value);
    }
    /**
     * On input change
     *
     * @param {{ popup: SimpleChange }} changes
     * @memberof NgPasswordValidatorDirective
     */
    ngOnChanges(changes) {
        // If the template type is 'inline' create the inline template directly
        const templateType = changes.popup.currentValue.type;
        if (templateType === 'inline') {
            this.updatePasswordOptions();
            this.show();
        }
        const changedOptions = this.getProperties(changes);
        this.applyOptionsDefault(changedOptions, defaultOptions);
    }
    /**
     * Destroy the pop up and unsubscribe to release the memory
     *
     * @memberof NgPasswordValidatorDirective
     */
    ngOnDestroy() {
        this.destroyPopup();
        if (this.componentSubscribe) {
            this.componentSubscribe.unsubscribe();
        }
    }
    /**
     * Create password regex
     *
     * @memberof NgPasswordValidatorDirective
     */
    createPasswordRegex() {
        if (this.passwordOptions.rules.password) {
            switch (this.passwordOptions.rules['password'].type) {
                case 'number':
                    this.regExpForLength = new RegExp(`^(.){${this.passwordOptions.rules['password'].length}}$`);
                    break;
                case 'range':
                    this.regExpForLength = new RegExp(`^(.){${this.passwordOptions.rules['password'].min},${this.passwordOptions.rules['password'].max}}$`);
            }
        }
    }
    /**
     * Check password if valid or not
     *
     * @param {string} inputValue
     * @memberof NgPasswordValidatorDirective
     */
    checkPassword(inputValue) {
        const data = {
            password: inputValue &&
                inputValue.length &&
                inputValue.match(this.regExpForLength)
                ? true
                : false,
            'include-symbol': inputValue &&
                inputValue.length &&
                inputValue.match(this.regExpForSpecialCharacters)
                ? true
                : false,
            'include-number': inputValue &&
                inputValue.length &&
                inputValue.match(this.regExpForOneDigit)
                ? true
                : false,
            'include-lowercase-characters': inputValue &&
                inputValue.length &&
                inputValue.match(this.regExpForOneLower)
                ? true
                : false,
            'include-uppercase-characters': inputValue &&
                inputValue.length &&
                inputValue.match(this.regExpForOneUpper)
                ? true
                : false,
        };
        for (const propName in this.passwordOptions.rules) {
            if (!this.passwordOptions.rules[propName]) {
                delete data[propName];
            }
        }
        this.isValid = Object.values(data).every((value) => value);
        this.dataService.updateValue(data);
    }
    /**
     * Update password options
     *
     * @memberof NgPasswordValidatorDirective
     */
    updatePasswordOptions() {
        if (this.popup && defaultOptions) {
            this.passwordOptions = this.utilsService.deepMerge(defaultOptions, this.popup);
        }
        else {
            this.passwordOptions = { ...defaultOptions };
        }
        this.createPasswordRegex();
    }
    /**
     * Get properties
     *
     * @param {{ popup: SimpleChange }} changes
     * @returns {{ popup: any }}
     * @memberof NgPasswordValidatorDirective
     */
    getProperties(changes) {
        const directiveProperties = {};
        let customProperties = {};
        let allProperties = {};
        for (const prop in changes) {
            if (prop !== 'options') {
                directiveProperties[prop] = changes[prop].currentValue;
            }
            if (prop === 'options') {
                customProperties = changes[prop].currentValue;
            }
        }
        allProperties = Object.assign({}, customProperties, directiveProperties);
        return allProperties;
    }
    /**
     * Get element position
     *
     * @memberof NgPasswordValidatorDirective
     */
    getElementPosition() {
        this.elementPosition =
            this.elementRef.nativeElement.getBoundingClientRect();
    }
    /**
     * Create Popup
     *
     * @memberof NgPasswordValidatorDirective
     */
    createPopup() {
        this.getElementPosition();
        this.appendComponentToBody(NgPasswordValidatorComponent);
        this.showPopupElem();
    }
    /**
     * Destroy Popup
     *
     * @returns {void}
     * @memberof NgPasswordValidatorDirective
     */
    destroyPopup() {
        if (!this.isPopupDestroyed) {
            this.hidePopup();
            if (!this.componentRef || this.isPopupDestroyed) {
                return;
            }
            this.appRef.detachView(this.componentRef.hostView);
            this.componentRef.destroy();
            this.events.emit({
                type: 'hidden',
                position: this.popupPosition,
            });
        }
    }
    /**
     * Show popup window
     *
     * @memberof NgPasswordValidatorDirective
     */
    showPopupElem() {
        this.componentRef.instance.show = true;
        this.events.emit({
            type: 'show',
            position: this.popupPosition,
        });
    }
    /**
     * Hide popup window
     *
     * @returns {void}
     * @memberof NgPasswordValidatorDirective
     */
    hidePopup() {
        if (!this.componentRef || this.isPopupDestroyed) {
            return;
        }
        this.componentRef.instance.show = false;
        this.events.emit({
            type: 'hide',
            position: this.popupPosition,
        });
    }
    /**
     * Append created popup window to body
     *
     * @param {*} component
     * @memberof NgPasswordValidatorDirective
     */
    appendComponentToBody(component) {
        this.componentRef = this.componentFactoryResolver
            .resolveComponentFactory(component)
            .create(this.injector);
        this.componentRef.instance.data = {
            element: this.elementRef.nativeElement,
            elementPosition: this.popupPosition,
            options: this.options,
            defaultOptions,
        };
        this.appRef.attachView(this.componentRef.hostView);
        const domElem = this.componentRef.hostView
            .rootNodes[0];
        document.body.appendChild(domElem);
        this.componentSubscribe = this.componentRef.instance.events.subscribe((event) => {
            this.handleEvents(event);
        });
        if (this.options.type === 'inline') {
            this.elementRef.nativeElement.style.marginBottom =
                this.popupPosition['bottom'] + 'px';
        }
    }
    /**
     * Reset/switching back to default options
     *
     * @param {NgPasswordValidatorOptions} defaultOption
     * @param {{ popup: SimpleChange }} options
     * @memberof NgPasswordValidatorDirective
     */
    applyOptionsDefault(options, defaultOption) {
        this.initOptions = Object.assign({}, this.initOptions || {}, options, defaultOption);
    }
    /**
     * Handle events
     *
     * @param {*} event
     * @memberof NgPasswordValidatorDirective
     */
    handleEvents(event) {
        if (event.type === 'shown') {
            this.events.emit({
                type: 'shown',
                position: this.popupPosition,
            });
        }
    }
    /**
     * It creates popup window to show password requirement
     *
     * @memberof NgPasswordValidatorDirective
     */
    show() {
        if (!this.componentRef || this.isPopupDestroyed) {
            this.createPopup();
        }
        else if (!this.isPopupDestroyed) {
            this.showPopupElem();
        }
    }
    /**
     * Hide/Destroys popup windows
     *
     * @memberof NgPasswordValidatorDirective
     */
    hide() {
        this.destroyPopup();
    }
}
NgPasswordValidatorDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgPasswordValidatorDirective, deps: [{ token: NgPasswordValidatorService, optional: true }, { token: i0.ElementRef }, { token: i0.ComponentFactoryResolver }, { token: i0.ApplicationRef }, { token: DataService }, { token: UtilsService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Directive });
NgPasswordValidatorDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.11", type: NgPasswordValidatorDirective, selector: "[NgPasswordValidator]", inputs: { popup: ["NgPasswordValidator", "popup"] }, outputs: { events: "events", valid: "valid" }, host: { listeners: { "focusin": "onMouseEnter($event.target.value)", "focusout": "onMouseLeave()", "input": "onInput($event.target.value)" } }, exportAs: ["NgPasswordValidator"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgPasswordValidatorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[NgPasswordValidator]',
                    exportAs: 'NgPasswordValidator',
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [NgPasswordValidatorService]
                }] }, { type: i0.ElementRef }, { type: i0.ComponentFactoryResolver }, { type: i0.ApplicationRef }, { type: DataService }, { type: UtilsService }, { type: i0.Injector }]; }, propDecorators: { popup: [{
                type: Input,
                args: ['NgPasswordValidator']
            }], events: [{
                type: Output
            }], valid: [{
                type: Output
            }], onMouseEnter: [{
                type: HostListener,
                args: ['focusin', ['$event.target.value']]
            }], onMouseLeave: [{
                type: HostListener,
                args: ['focusout']
            }], onInput: [{
                type: HostListener,
                args: ['input', ['$event.target.value']]
            }] } });

class NgPasswordValidatorModule {
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

/*
 * Public API Surface of ng-password-validator
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgPasswordValidatorComponent, NgPasswordValidatorDirective, NgPasswordValidatorModule, NgPasswordValidatorService };
//# sourceMappingURL=ng-password-validator.mjs.map
