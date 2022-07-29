import { Directive, EventEmitter, HostListener, Inject, Input, Optional, Output, } from '@angular/core';
import { NgPasswordValidatorComponent } from './ng-password-validator.component';
import { NgPasswordValidatorService } from './ng-password-validator.service';
import { defaultOptions } from './options';
import * as i0 from "@angular/core";
import * as i1 from "./data.service";
import * as i2 from "./utils.service";
export class NgPasswordValidatorDirective {
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
NgPasswordValidatorDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgPasswordValidatorDirective, deps: [{ token: NgPasswordValidatorService, optional: true }, { token: i0.ElementRef }, { token: i0.ComponentFactoryResolver }, { token: i0.ApplicationRef }, { token: i1.DataService }, { token: i2.UtilsService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Directive });
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
                }] }, { type: i0.ElementRef }, { type: i0.ComponentFactoryResolver }, { type: i0.ApplicationRef }, { type: i1.DataService }, { type: i2.UtilsService }, { type: i0.Injector }]; }, propDecorators: { popup: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcGFzc3dvcmQtdmFsaWRhdG9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXBhc3N3b3JkLXZhbGlkYXRvci9zcmMvbGliL25nLXBhc3N3b3JkLXZhbGlkYXRvci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdMLFNBQVMsRUFHVCxZQUFZLEVBQ1osWUFBWSxFQUNaLE1BQU0sRUFFTixLQUFLLEVBR0wsUUFBUSxFQUNSLE1BQU0sR0FFUCxNQUFNLGVBQWUsQ0FBQztBQUl2QixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQU9qRixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sV0FBVyxDQUFDOzs7O0FBTzNDLE1BQU0sT0FBTyw0QkFBNEI7SUFtQnZDLFlBQzBELFdBQVcsRUFDM0QsVUFBc0IsRUFDdEIsd0JBQWtELEVBQ2xELE1BQXNCLEVBQ3RCLFdBQXdCLEVBQ3hCLFlBQTBCLEVBQzFCLFFBQWtCO1FBTjhCLGdCQUFXLEdBQVgsV0FBVyxDQUFBO1FBQzNELGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUN0QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBekI1QixvQkFBZSxHQUFHLFVBQVUsQ0FBQztRQUM3QixzQkFBaUIsR0FBRyxtQkFBbUIsQ0FBQztRQUN4QyxzQkFBaUIsR0FBRyxtQkFBbUIsQ0FBQztRQUN4QyxzQkFBaUIsR0FBRyxtQkFBbUIsQ0FBQztRQUN4QywrQkFBMEIsR0FBRywwQ0FBMEMsQ0FBQztRQUV4RSxZQUFPLEdBQUcs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QVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsUUFBUSxFQUFFLHFCQUFxQjtpQkFDaEM7OzBCQXFCSSxRQUFROzswQkFBSSxNQUFNOzJCQUFDLDBCQUEwQjtxTkFObEIsS0FBSztzQkFBbEMsS0FBSzt1QkFBQyxxQkFBcUI7Z0JBRWxCLE1BQU07c0JBQWYsTUFBTTtnQkFDRyxLQUFLO3NCQUFkLE1BQU07Z0JBa0NQLFlBQVk7c0JBRFgsWUFBWTt1QkFBQyxTQUFTLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztnQkFhaEQsWUFBWTtzQkFEWCxZQUFZO3VCQUFDLFVBQVU7Z0JBZ0J4QixPQUFPO3NCQUROLFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMscUJBQXFCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFwcGxpY2F0aW9uUmVmLFxyXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICBEaXJlY3RpdmUsXHJcbiAgRWxlbWVudFJlZixcclxuICBFbWJlZGRlZFZpZXdSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBJbmplY3QsXHJcbiAgSW5qZWN0b3IsXHJcbiAgSW5wdXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE9uRGVzdHJveSxcclxuICBPcHRpb25hbCxcclxuICBPdXRwdXQsXHJcbiAgU2ltcGxlQ2hhbmdlLFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IERhdGFTZXJ2aWNlIH0gZnJvbSAnLi9kYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOZ1Bhc3N3b3JkVmFsaWRhdG9yQ29tcG9uZW50IH0gZnJvbSAnLi9uZy1wYXNzd29yZC12YWxpZGF0b3IuY29tcG9uZW50JztcclxuaW1wb3J0IHtcclxuICBIb3N0Q29tcG9uZW50LFxyXG4gIElFbGVtZW50UG9zaXRpb24sXHJcbiAgSVBvc2l0aW9uLFxyXG4gIE5nUGFzc3dvcmRWYWxpZGF0b3JPcHRpb25zLFxyXG59IGZyb20gJy4vbmctcGFzc3dvcmQtdmFsaWRhdG9yLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IE5nUGFzc3dvcmRWYWxpZGF0b3JTZXJ2aWNlIH0gZnJvbSAnLi9uZy1wYXNzd29yZC12YWxpZGF0b3Iuc2VydmljZSc7XHJcbmltcG9ydCB7IGRlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi9vcHRpb25zJztcclxuaW1wb3J0IHsgVXRpbHNTZXJ2aWNlIH0gZnJvbSAnLi91dGlscy5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW05nUGFzc3dvcmRWYWxpZGF0b3JdJyxcclxuICBleHBvcnRBczogJ05nUGFzc3dvcmRWYWxpZGF0b3InLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdQYXNzd29yZFZhbGlkYXRvckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcclxuICByZWdFeHBGb3JMZW5ndGggPSAvXiguKXs4fSQvO1xyXG4gIHJlZ0V4cEZvck9uZVVwcGVyID0gL14oPz0uKltBLVpdKSguKikkLztcclxuICByZWdFeHBGb3JPbmVMb3dlciA9IC9eKD89LipbYS16XSkoLiopJC87XHJcbiAgcmVnRXhwRm9yT25lRGlnaXQgPSAvXig/PS4qWzAtOV0pKC4qKSQvO1xyXG4gIHJlZ0V4cEZvclNwZWNpYWxDaGFyYWN0ZXJzID0gL14oPz0uKlshQCMkJV4mKl0pKFthLXpBLVowLTkhQCMkJV4mKl0qKSQvO1xyXG5cclxuICBpc1ZhbGlkID0gZmFsc2U7XHJcbiAgaW5wdXRWYWx1ZSA9ICcnO1xyXG4gIGNvbXBvbmVudFJlZjogYW55O1xyXG4gIGVsZW1lbnRQb3NpdGlvbjogSUVsZW1lbnRQb3NpdGlvbjtcclxuICBwYXNzd29yZE9wdGlvbnM6IE5nUGFzc3dvcmRWYWxpZGF0b3JPcHRpb25zO1xyXG4gIGNvbXBvbmVudFN1YnNjcmliZTogU3Vic2NyaXB0aW9uO1xyXG5cclxuICBASW5wdXQoJ05nUGFzc3dvcmRWYWxpZGF0b3InKSBwb3B1cDogTmdQYXNzd29yZFZhbGlkYXRvck9wdGlvbnM7XHJcblxyXG4gIEBPdXRwdXQoKSBldmVudHM6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcbiAgQE91dHB1dCgpIHZhbGlkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChOZ1Bhc3N3b3JkVmFsaWRhdG9yU2VydmljZSkgcHJpdmF0ZSBpbml0T3B0aW9ucyxcclxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICBwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsXHJcbiAgICBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZSxcclxuICAgIHByaXZhdGUgdXRpbHNTZXJ2aWNlOiBVdGlsc1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvclxyXG4gICkge31cclxuXHJcbiAgZ2V0IG9wdGlvbnMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wYXNzd29yZE9wdGlvbnM7XHJcbiAgfVxyXG5cclxuICBnZXQgaXNQb3B1cERlc3Ryb3llZCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLmNvbXBvbmVudFJlZiAmJiB0aGlzLmNvbXBvbmVudFJlZi5ob3N0Vmlldy5kZXN0cm95ZWQ7XHJcbiAgfVxyXG5cclxuICBnZXQgcG9wdXBQb3NpdGlvbigpOiBJRWxlbWVudFBvc2l0aW9uIHwgSVBvc2l0aW9uIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnNbJ3Bvc2l0aW9uJ10pIHtcclxuICAgICAgcmV0dXJuIHRoaXMub3B0aW9uc1sncG9zaXRpb24nXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRQb3NpdGlvbjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZvY3VzIGluIGlucHV0IGZpZWxkXHJcbiAgICpcclxuICAgKiBAbWVtYmVyb2YgTmdQYXNzd29yZFZhbGlkYXRvckRpcmVjdGl2ZVxyXG4gICAqL1xyXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzaW4nLCBbJyRldmVudC50YXJnZXQudmFsdWUnXSlcclxuICBvbk1vdXNlRW50ZXIodmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy51cGRhdGVQYXNzd29yZE9wdGlvbnMoKTtcclxuICAgIHRoaXMuc2hvdygpO1xyXG4gICAgdGhpcy5jaGVja1Bhc3N3b3JkKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZvY3VzIG91dCBvZiBpbnB1dCBmaWVsZFxyXG4gICAqXHJcbiAgICogQG1lbWJlcm9mIE5nUGFzc3dvcmRWYWxpZGF0b3JEaXJlY3RpdmVcclxuICAgKi9cclxuICBASG9zdExpc3RlbmVyKCdmb2N1c291dCcpXHJcbiAgb25Nb3VzZUxlYXZlKCk6IHZvaWQge1xyXG4gICAgLy8gSWYgdGhlIHRlbXBsYXRlIHR5cGUgaXMgaW5saW5lLCBkb24ndCBkZXN0cm95IHRoZSBjcmVhdGVkIHRlbXBsYXRlXHJcbiAgICBpZiAodGhpcy5wYXNzd29yZE9wdGlvbnMudHlwZSAhPT0gJ2lubGluZScpIHtcclxuICAgICAgdGhpcy5kZXN0cm95UG9wdXAoKTtcclxuICAgIH1cclxuICAgIHRoaXMudmFsaWQuZW1pdCh0aGlzLmlzVmFsaWQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogSW5wdXQgZmllbGQgdmFsdWVcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxyXG4gICAqIEBtZW1iZXJvZiBOZ1Bhc3N3b3JkVmFsaWRhdG9yRGlyZWN0aXZlXHJcbiAgICovXHJcbiAgQEhvc3RMaXN0ZW5lcignaW5wdXQnLCBbJyRldmVudC50YXJnZXQudmFsdWUnXSlcclxuICBvbklucHV0KHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHRoaXMuY2hlY2tQYXNzd29yZCh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBPbiBpbnB1dCBjaGFuZ2VcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7eyBwb3B1cDogU2ltcGxlQ2hhbmdlIH19IGNoYW5nZXNcclxuICAgKiBAbWVtYmVyb2YgTmdQYXNzd29yZFZhbGlkYXRvckRpcmVjdGl2ZVxyXG4gICAqL1xyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgcG9wdXA6IFNpbXBsZUNoYW5nZSB9KTogdm9pZCB7XHJcbiAgICAvLyBJZiB0aGUgdGVtcGxhdGUgdHlwZSBpcyAnaW5saW5lJyBjcmVhdGUgdGhlIGlubGluZSB0ZW1wbGF0ZSBkaXJlY3RseVxyXG4gICAgY29uc3QgdGVtcGxhdGVUeXBlID0gY2hhbmdlcy5wb3B1cC5jdXJyZW50VmFsdWUudHlwZTtcclxuICAgIGlmICh0ZW1wbGF0ZVR5cGUgPT09ICdpbmxpbmUnKSB7XHJcbiAgICAgIHRoaXMudXBkYXRlUGFzc3dvcmRPcHRpb25zKCk7XHJcbiAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgY2hhbmdlZE9wdGlvbnMgPSB0aGlzLmdldFByb3BlcnRpZXMoY2hhbmdlcyk7XHJcbiAgICB0aGlzLmFwcGx5T3B0aW9uc0RlZmF1bHQoY2hhbmdlZE9wdGlvbnMsIGRlZmF1bHRPcHRpb25zKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlc3Ryb3kgdGhlIHBvcCB1cCBhbmQgdW5zdWJzY3JpYmUgdG8gcmVsZWFzZSB0aGUgbWVtb3J5XHJcbiAgICpcclxuICAgKiBAbWVtYmVyb2YgTmdQYXNzd29yZFZhbGlkYXRvckRpcmVjdGl2ZVxyXG4gICAqL1xyXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5kZXN0cm95UG9wdXAoKTtcclxuICAgIGlmICh0aGlzLmNvbXBvbmVudFN1YnNjcmliZSkge1xyXG4gICAgICB0aGlzLmNvbXBvbmVudFN1YnNjcmliZS51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIHBhc3N3b3JkIHJlZ2V4XHJcbiAgICpcclxuICAgKiBAbWVtYmVyb2YgTmdQYXNzd29yZFZhbGlkYXRvckRpcmVjdGl2ZVxyXG4gICAqL1xyXG4gIGNyZWF0ZVBhc3N3b3JkUmVnZXgoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5wYXNzd29yZE9wdGlvbnMucnVsZXMucGFzc3dvcmQpIHtcclxuICAgICAgc3dpdGNoICh0aGlzLnBhc3N3b3JkT3B0aW9ucy5ydWxlc1sncGFzc3dvcmQnXS50eXBlKSB7XHJcbiAgICAgICAgY2FzZSAnbnVtYmVyJzpcclxuICAgICAgICAgIHRoaXMucmVnRXhwRm9yTGVuZ3RoID0gbmV3IFJlZ0V4cChcclxuICAgICAgICAgICAgYF4oLil7JHt0aGlzLnBhc3N3b3JkT3B0aW9ucy5ydWxlc1sncGFzc3dvcmQnXS5sZW5ndGh9fSRgXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgIGNhc2UgJ3JhbmdlJzpcclxuICAgICAgICAgIHRoaXMucmVnRXhwRm9yTGVuZ3RoID0gbmV3IFJlZ0V4cChcclxuICAgICAgICAgICAgYF4oLil7JHt0aGlzLnBhc3N3b3JkT3B0aW9ucy5ydWxlc1sncGFzc3dvcmQnXS5taW59LCR7dGhpcy5wYXNzd29yZE9wdGlvbnMucnVsZXNbJ3Bhc3N3b3JkJ10ubWF4fX0kYFxyXG4gICAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgcGFzc3dvcmQgaWYgdmFsaWQgb3Igbm90XHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRWYWx1ZVxyXG4gICAqIEBtZW1iZXJvZiBOZ1Bhc3N3b3JkVmFsaWRhdG9yRGlyZWN0aXZlXHJcbiAgICovXHJcbiAgY2hlY2tQYXNzd29yZChpbnB1dFZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgIHBhc3N3b3JkOlxyXG4gICAgICAgIGlucHV0VmFsdWUgJiZcclxuICAgICAgICBpbnB1dFZhbHVlLmxlbmd0aCAmJlxyXG4gICAgICAgIGlucHV0VmFsdWUubWF0Y2godGhpcy5yZWdFeHBGb3JMZW5ndGgpXHJcbiAgICAgICAgICA/IHRydWVcclxuICAgICAgICAgIDogZmFsc2UsXHJcbiAgICAgICdpbmNsdWRlLXN5bWJvbCc6XHJcbiAgICAgICAgaW5wdXRWYWx1ZSAmJlxyXG4gICAgICAgIGlucHV0VmFsdWUubGVuZ3RoICYmXHJcbiAgICAgICAgaW5wdXRWYWx1ZS5tYXRjaCh0aGlzLnJlZ0V4cEZvclNwZWNpYWxDaGFyYWN0ZXJzKVxyXG4gICAgICAgICAgPyB0cnVlXHJcbiAgICAgICAgICA6IGZhbHNlLFxyXG4gICAgICAnaW5jbHVkZS1udW1iZXInOlxyXG4gICAgICAgIGlucHV0VmFsdWUgJiZcclxuICAgICAgICBpbnB1dFZhbHVlLmxlbmd0aCAmJlxyXG4gICAgICAgIGlucHV0VmFsdWUubWF0Y2godGhpcy5yZWdFeHBGb3JPbmVEaWdpdClcclxuICAgICAgICAgID8gdHJ1ZVxyXG4gICAgICAgICAgOiBmYWxzZSxcclxuICAgICAgJ2luY2x1ZGUtbG93ZXJjYXNlLWNoYXJhY3RlcnMnOlxyXG4gICAgICAgIGlucHV0VmFsdWUgJiZcclxuICAgICAgICBpbnB1dFZhbHVlLmxlbmd0aCAmJlxyXG4gICAgICAgIGlucHV0VmFsdWUubWF0Y2godGhpcy5yZWdFeHBGb3JPbmVMb3dlcilcclxuICAgICAgICAgID8gdHJ1ZVxyXG4gICAgICAgICAgOiBmYWxzZSxcclxuICAgICAgJ2luY2x1ZGUtdXBwZXJjYXNlLWNoYXJhY3RlcnMnOlxyXG4gICAgICAgIGlucHV0VmFsdWUgJiZcclxuICAgICAgICBpbnB1dFZhbHVlLmxlbmd0aCAmJlxyXG4gICAgICAgIGlucHV0VmFsdWUubWF0Y2godGhpcy5yZWdFeHBGb3JPbmVVcHBlcilcclxuICAgICAgICAgID8gdHJ1ZVxyXG4gICAgICAgICAgOiBmYWxzZSxcclxuICAgIH07XHJcblxyXG4gICAgZm9yIChjb25zdCBwcm9wTmFtZSBpbiB0aGlzLnBhc3N3b3JkT3B0aW9ucy5ydWxlcykge1xyXG4gICAgICBpZiAoIXRoaXMucGFzc3dvcmRPcHRpb25zLnJ1bGVzW3Byb3BOYW1lXSkge1xyXG4gICAgICAgIGRlbGV0ZSBkYXRhW3Byb3BOYW1lXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5pc1ZhbGlkID0gT2JqZWN0LnZhbHVlcyhkYXRhKS5ldmVyeSgodmFsdWU6IGJvb2xlYW4pID0+IHZhbHVlKTtcclxuICAgIHRoaXMuZGF0YVNlcnZpY2UudXBkYXRlVmFsdWUoZGF0YSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGUgcGFzc3dvcmQgb3B0aW9uc1xyXG4gICAqXHJcbiAgICogQG1lbWJlcm9mIE5nUGFzc3dvcmRWYWxpZGF0b3JEaXJlY3RpdmVcclxuICAgKi9cclxuICB1cGRhdGVQYXNzd29yZE9wdGlvbnMoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5wb3B1cCAmJiBkZWZhdWx0T3B0aW9ucykge1xyXG4gICAgICB0aGlzLnBhc3N3b3JkT3B0aW9ucyA9IHRoaXMudXRpbHNTZXJ2aWNlLmRlZXBNZXJnZShcclxuICAgICAgICBkZWZhdWx0T3B0aW9ucyxcclxuICAgICAgICB0aGlzLnBvcHVwXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBhc3N3b3JkT3B0aW9ucyA9IHsgLi4uZGVmYXVsdE9wdGlvbnMgfTtcclxuICAgIH1cclxuICAgIHRoaXMuY3JlYXRlUGFzc3dvcmRSZWdleCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHByb3BlcnRpZXNcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7eyBwb3B1cDogU2ltcGxlQ2hhbmdlIH19IGNoYW5nZXNcclxuICAgKiBAcmV0dXJucyB7eyBwb3B1cDogYW55IH19XHJcbiAgICogQG1lbWJlcm9mIE5nUGFzc3dvcmRWYWxpZGF0b3JEaXJlY3RpdmVcclxuICAgKi9cclxuICBnZXRQcm9wZXJ0aWVzKGNoYW5nZXM6IHsgcG9wdXA6IFNpbXBsZUNoYW5nZSB9KTogeyBwb3B1cDogYW55IH0ge1xyXG4gICAgY29uc3QgZGlyZWN0aXZlUHJvcGVydGllczogYW55ID0ge307XHJcbiAgICBsZXQgY3VzdG9tUHJvcGVydGllczogYW55ID0ge307XHJcbiAgICBsZXQgYWxsUHJvcGVydGllczogYW55ID0ge307XHJcblxyXG4gICAgZm9yIChjb25zdCBwcm9wIGluIGNoYW5nZXMpIHtcclxuICAgICAgaWYgKHByb3AgIT09ICdvcHRpb25zJykge1xyXG4gICAgICAgIGRpcmVjdGl2ZVByb3BlcnRpZXNbcHJvcF0gPSBjaGFuZ2VzW3Byb3BdLmN1cnJlbnRWYWx1ZTtcclxuICAgICAgfVxyXG4gICAgICBpZiAocHJvcCA9PT0gJ29wdGlvbnMnKSB7XHJcbiAgICAgICAgY3VzdG9tUHJvcGVydGllcyA9IGNoYW5nZXNbcHJvcF0uY3VycmVudFZhbHVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWxsUHJvcGVydGllcyA9IE9iamVjdC5hc3NpZ24oe30sIGN1c3RvbVByb3BlcnRpZXMsIGRpcmVjdGl2ZVByb3BlcnRpZXMpO1xyXG5cclxuICAgIHJldHVybiBhbGxQcm9wZXJ0aWVzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGVsZW1lbnQgcG9zaXRpb25cclxuICAgKlxyXG4gICAqIEBtZW1iZXJvZiBOZ1Bhc3N3b3JkVmFsaWRhdG9yRGlyZWN0aXZlXHJcbiAgICovXHJcbiAgZ2V0RWxlbWVudFBvc2l0aW9uKCk6IHZvaWQge1xyXG4gICAgdGhpcy5lbGVtZW50UG9zaXRpb24gPVxyXG4gICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBQb3B1cFxyXG4gICAqXHJcbiAgICogQG1lbWJlcm9mIE5nUGFzc3dvcmRWYWxpZGF0b3JEaXJlY3RpdmVcclxuICAgKi9cclxuICBjcmVhdGVQb3B1cCgpOiB2b2lkIHtcclxuICAgIHRoaXMuZ2V0RWxlbWVudFBvc2l0aW9uKCk7XHJcbiAgICB0aGlzLmFwcGVuZENvbXBvbmVudFRvQm9keShOZ1Bhc3N3b3JkVmFsaWRhdG9yQ29tcG9uZW50KTtcclxuICAgIHRoaXMuc2hvd1BvcHVwRWxlbSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVzdHJveSBQb3B1cFxyXG4gICAqXHJcbiAgICogQHJldHVybnMge3ZvaWR9XHJcbiAgICogQG1lbWJlcm9mIE5nUGFzc3dvcmRWYWxpZGF0b3JEaXJlY3RpdmVcclxuICAgKi9cclxuICBkZXN0cm95UG9wdXAoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuaXNQb3B1cERlc3Ryb3llZCkge1xyXG4gICAgICB0aGlzLmhpZGVQb3B1cCgpO1xyXG5cclxuICAgICAgaWYgKCF0aGlzLmNvbXBvbmVudFJlZiB8fCB0aGlzLmlzUG9wdXBEZXN0cm95ZWQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuYXBwUmVmLmRldGFjaFZpZXcodGhpcy5jb21wb25lbnRSZWYuaG9zdFZpZXcpO1xyXG4gICAgICB0aGlzLmNvbXBvbmVudFJlZi5kZXN0cm95KCk7XHJcbiAgICAgIHRoaXMuZXZlbnRzLmVtaXQoe1xyXG4gICAgICAgIHR5cGU6ICdoaWRkZW4nLFxyXG4gICAgICAgIHBvc2l0aW9uOiB0aGlzLnBvcHVwUG9zaXRpb24sXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2hvdyBwb3B1cCB3aW5kb3dcclxuICAgKlxyXG4gICAqIEBtZW1iZXJvZiBOZ1Bhc3N3b3JkVmFsaWRhdG9yRGlyZWN0aXZlXHJcbiAgICovXHJcbiAgc2hvd1BvcHVwRWxlbSgpOiB2b2lkIHtcclxuICAgICh0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZSBhcyBIb3N0Q29tcG9uZW50KS5zaG93ID0gdHJ1ZTtcclxuICAgIHRoaXMuZXZlbnRzLmVtaXQoe1xyXG4gICAgICB0eXBlOiAnc2hvdycsXHJcbiAgICAgIHBvc2l0aW9uOiB0aGlzLnBvcHVwUG9zaXRpb24sXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhpZGUgcG9wdXAgd2luZG93XHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgKiBAbWVtYmVyb2YgTmdQYXNzd29yZFZhbGlkYXRvckRpcmVjdGl2ZVxyXG4gICAqL1xyXG4gIGhpZGVQb3B1cCgpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5jb21wb25lbnRSZWYgfHwgdGhpcy5pc1BvcHVwRGVzdHJveWVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgICh0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZSBhcyBIb3N0Q29tcG9uZW50KS5zaG93ID0gZmFsc2U7XHJcbiAgICB0aGlzLmV2ZW50cy5lbWl0KHtcclxuICAgICAgdHlwZTogJ2hpZGUnLFxyXG4gICAgICBwb3NpdGlvbjogdGhpcy5wb3B1cFBvc2l0aW9uLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBcHBlbmQgY3JlYXRlZCBwb3B1cCB3aW5kb3cgdG8gYm9keVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHsqfSBjb21wb25lbnRcclxuICAgKiBAbWVtYmVyb2YgTmdQYXNzd29yZFZhbGlkYXRvckRpcmVjdGl2ZVxyXG4gICAqL1xyXG4gIGFwcGVuZENvbXBvbmVudFRvQm9keShjb21wb25lbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5jb21wb25lbnRSZWYgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlclxyXG4gICAgICAucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50KVxyXG4gICAgICAuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xyXG4gICAgKHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlIGFzIEhvc3RDb21wb25lbnQpLmRhdGEgPSB7XHJcbiAgICAgIGVsZW1lbnQ6IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LFxyXG4gICAgICBlbGVtZW50UG9zaXRpb246IHRoaXMucG9wdXBQb3NpdGlvbixcclxuICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxyXG4gICAgICBkZWZhdWx0T3B0aW9ucyxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5hcHBSZWYuYXR0YWNoVmlldyh0aGlzLmNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XHJcbiAgICBjb25zdCBkb21FbGVtID0gKHRoaXMuY29tcG9uZW50UmVmLmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZjxhbnk+KVxyXG4gICAgICAucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkb21FbGVtKTtcclxuXHJcbiAgICB0aGlzLmNvbXBvbmVudFN1YnNjcmliZSA9IChcclxuICAgICAgdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2UgYXMgSG9zdENvbXBvbmVudFxyXG4gICAgKS5ldmVudHMuc3Vic2NyaWJlKChldmVudDogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMuaGFuZGxlRXZlbnRzKGV2ZW50KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbnMudHlwZSA9PT0gJ2lubGluZScpIHtcclxuICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc3R5bGUubWFyZ2luQm90dG9tID1cclxuICAgICAgICB0aGlzLnBvcHVwUG9zaXRpb25bJ2JvdHRvbSddICsgJ3B4JztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlc2V0L3N3aXRjaGluZyBiYWNrIHRvIGRlZmF1bHQgb3B0aW9uc1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtOZ1Bhc3N3b3JkVmFsaWRhdG9yT3B0aW9uc30gZGVmYXVsdE9wdGlvblxyXG4gICAqIEBwYXJhbSB7eyBwb3B1cDogU2ltcGxlQ2hhbmdlIH19IG9wdGlvbnNcclxuICAgKiBAbWVtYmVyb2YgTmdQYXNzd29yZFZhbGlkYXRvckRpcmVjdGl2ZVxyXG4gICAqL1xyXG4gIGFwcGx5T3B0aW9uc0RlZmF1bHQoXHJcbiAgICBvcHRpb25zOiB7IHBvcHVwOiBTaW1wbGVDaGFuZ2UgfSxcclxuICAgIGRlZmF1bHRPcHRpb246IE5nUGFzc3dvcmRWYWxpZGF0b3JPcHRpb25zXHJcbiAgKTogdm9pZCB7XHJcbiAgICB0aGlzLmluaXRPcHRpb25zID0gT2JqZWN0LmFzc2lnbihcclxuICAgICAge30sXHJcbiAgICAgIHRoaXMuaW5pdE9wdGlvbnMgfHwge30sXHJcbiAgICAgIG9wdGlvbnMsXHJcbiAgICAgIGRlZmF1bHRPcHRpb25cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBIYW5kbGUgZXZlbnRzXHJcbiAgICpcclxuICAgKiBAcGFyYW0geyp9IGV2ZW50XHJcbiAgICogQG1lbWJlcm9mIE5nUGFzc3dvcmRWYWxpZGF0b3JEaXJlY3RpdmVcclxuICAgKi9cclxuICBoYW5kbGVFdmVudHMoZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgaWYgKGV2ZW50LnR5cGUgPT09ICdzaG93bicpIHtcclxuICAgICAgdGhpcy5ldmVudHMuZW1pdCh7XHJcbiAgICAgICAgdHlwZTogJ3Nob3duJyxcclxuICAgICAgICBwb3NpdGlvbjogdGhpcy5wb3B1cFBvc2l0aW9uLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEl0IGNyZWF0ZXMgcG9wdXAgd2luZG93IHRvIHNob3cgcGFzc3dvcmQgcmVxdWlyZW1lbnRcclxuICAgKlxyXG4gICAqIEBtZW1iZXJvZiBOZ1Bhc3N3b3JkVmFsaWRhdG9yRGlyZWN0aXZlXHJcbiAgICovXHJcbiAgc2hvdygpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5jb21wb25lbnRSZWYgfHwgdGhpcy5pc1BvcHVwRGVzdHJveWVkKSB7XHJcbiAgICAgIHRoaXMuY3JlYXRlUG9wdXAoKTtcclxuICAgIH0gZWxzZSBpZiAoIXRoaXMuaXNQb3B1cERlc3Ryb3llZCkge1xyXG4gICAgICB0aGlzLnNob3dQb3B1cEVsZW0oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEhpZGUvRGVzdHJveXMgcG9wdXAgd2luZG93c1xyXG4gICAqXHJcbiAgICogQG1lbWJlcm9mIE5nUGFzc3dvcmRWYWxpZGF0b3JEaXJlY3RpdmVcclxuICAgKi9cclxuICBoaWRlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5kZXN0cm95UG9wdXAoKTtcclxuICB9XHJcbn1cclxuIl19