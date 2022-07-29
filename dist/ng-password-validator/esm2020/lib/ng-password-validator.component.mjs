import { Component, EventEmitter, HostBinding, HostListener, Input, } from '@angular/core';
import { defaultOptions } from './options';
import * as i0 from "@angular/core";
import * as i1 from "./data.service";
import * as i2 from "@angular/common";
export class NgPasswordValidatorComponent {
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
NgPasswordValidatorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgPasswordValidatorComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.DataService }], target: i0.ɵɵFactoryTarget.Component });
NgPasswordValidatorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NgPasswordValidatorComponent, selector: "lib-ng-password-validator", inputs: { data: "data", show: "show" }, host: { listeners: { "transitionend": "transitionEnd()" }, properties: { "style.top": "this.hostStyleTop", "style.left": "this.hostStyleLeft", "style.z-index": "this.hostStyleZIndex", "style.transition": "this.hostStyleTransition", "style.width": "this.hostStyleWidth", "style.max-width": "this.hostStyleMaxWidth", "style.pointer-events": "this.hostStylePointerEvents", "class.popup-show": "this.hostClassShow", "class.popup-shadow": "this.hostClassShadow" }, classAttribute: "popup" }, usesOnChanges: true, ngImport: i0, template: "<div class=\"popup-window\">\r\n  <div class=\"heading\">{{heading}}</div>\r\n  <div *ngIf=\"rules['password']\">\r\n    <div class=\"rule\" [hidden]=\"rules['password'].type !== 'number'\"\r\n      [ngClass]=\"{'rule-pass':passwordStatus['password']}\">\r\n      Password length should be {{rules['password'].length}} characters.\r\n    </div>\r\n    <div class=\"rule\" [hidden]=\"rules['password'].type !== 'range'\"\r\n      [ngClass]=\"{'rule-pass':passwordStatus['password']}\">\r\n      Password length should be {{rules['password'].min}} - {{rules['password'].max}}\r\n      characters.\r\n    </div>\r\n  </div>\r\n  <div class=\"rule\" [hidden]=\"!rules['include-symbol']\" [ngClass]=\"{'rule-pass':passwordStatus['include-symbol']}\">\r\n    Include Symbols:( e.g. @#$% )\r\n  </div>\r\n  <div class=\"rule\" [hidden]=\"!rules['include-number']\" [ngClass]=\"{'rule-pass':passwordStatus['include-number']}\">\r\n    Include Numbers:( e.g.123456 )\r\n  </div>\r\n  <div class=\"rule\" [hidden]=\"!rules['include-lowercase-characters']\"\r\n    [ngClass]=\"{'rule-pass':passwordStatus['include-lowercase-characters']}\">\r\n    Include Lowercase Characters:(e.g. abcdefgh )\r\n  </div>\r\n  <div class=\"rule\" [hidden]=\"!rules['include-uppercase-characters']\"\r\n    [ngClass]=\"{'rule-pass':passwordStatus['include-uppercase-characters']}\">\r\n    Include Uppercase Characters:(e.g. ABCDEFGH )\r\n  </div>\r\n  <div class=\"success-message\" [hidden]=\"!isSecure\">\r\n    {{successMessage}}\r\n  </div>\r\n</div>\r\n", styles: ["@charset \"UTF-8\";:host{max-width:390px;background-color:#fff;color:#000;text-align:left;border-radius:6px;position:absolute;pointer-events:none;padding:10px;z-index:1000;display:block;opacity:0;transition:opacity .3s;top:0;left:0;transition:opacity .3s ease-in-out}:host.popup-show{opacity:1}:host.popup-shadow{box-shadow:0 1px 5px #0006}:host.popup .popup-window .heading{font-size:16px;margin-bottom:.5rem;font-weight:700}:host.popup .popup-window .rule{font-size:14px;color:#6a6a6a;line-height:18px;margin:3px 0}:host.popup .popup-window .rule:before{content:\"\\a\";width:5px;height:5px;border-radius:50%;background:#6a6a6a;display:inline-block;vertical-align:sub;margin:0 10px 6px 0}:host.popup .popup-window .rule.rule-pass{text-decoration:line-through;color:#d3d3d3}:host.popup .popup-window .rule.rule-pass:before{background:#d3d3d3}:host.popup .popup-window .success-message{color:#28a745;text-align:center;font-size:16px;margin-top:5px}:host.popup.popup-pro .popup-window .rule.rule-pass{color:#28a745;text-decoration:none}:host.popup.popup-pro .popup-window .rule.rule-pass:before{content:\"\\2713\"!important;width:0;height:0;padding-right:5px;vertical-align:inherit;background:#28a745}:host.popup.popup-pro .popup-window .success-message{color:#9c0404}\n"], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgPasswordValidatorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'lib-ng-password-validator', host: { class: 'popup' }, template: "<div class=\"popup-window\">\r\n  <div class=\"heading\">{{heading}}</div>\r\n  <div *ngIf=\"rules['password']\">\r\n    <div class=\"rule\" [hidden]=\"rules['password'].type !== 'number'\"\r\n      [ngClass]=\"{'rule-pass':passwordStatus['password']}\">\r\n      Password length should be {{rules['password'].length}} characters.\r\n    </div>\r\n    <div class=\"rule\" [hidden]=\"rules['password'].type !== 'range'\"\r\n      [ngClass]=\"{'rule-pass':passwordStatus['password']}\">\r\n      Password length should be {{rules['password'].min}} - {{rules['password'].max}}\r\n      characters.\r\n    </div>\r\n  </div>\r\n  <div class=\"rule\" [hidden]=\"!rules['include-symbol']\" [ngClass]=\"{'rule-pass':passwordStatus['include-symbol']}\">\r\n    Include Symbols:( e.g. @#$% )\r\n  </div>\r\n  <div class=\"rule\" [hidden]=\"!rules['include-number']\" [ngClass]=\"{'rule-pass':passwordStatus['include-number']}\">\r\n    Include Numbers:( e.g.123456 )\r\n  </div>\r\n  <div class=\"rule\" [hidden]=\"!rules['include-lowercase-characters']\"\r\n    [ngClass]=\"{'rule-pass':passwordStatus['include-lowercase-characters']}\">\r\n    Include Lowercase Characters:(e.g. abcdefgh )\r\n  </div>\r\n  <div class=\"rule\" [hidden]=\"!rules['include-uppercase-characters']\"\r\n    [ngClass]=\"{'rule-pass':passwordStatus['include-uppercase-characters']}\">\r\n    Include Uppercase Characters:(e.g. ABCDEFGH )\r\n  </div>\r\n  <div class=\"success-message\" [hidden]=\"!isSecure\">\r\n    {{successMessage}}\r\n  </div>\r\n</div>\r\n", styles: ["@charset \"UTF-8\";:host{max-width:390px;background-color:#fff;color:#000;text-align:left;border-radius:6px;position:absolute;pointer-events:none;padding:10px;z-index:1000;display:block;opacity:0;transition:opacity .3s;top:0;left:0;transition:opacity .3s ease-in-out}:host.popup-show{opacity:1}:host.popup-shadow{box-shadow:0 1px 5px #0006}:host.popup .popup-window .heading{font-size:16px;margin-bottom:.5rem;font-weight:700}:host.popup .popup-window .rule{font-size:14px;color:#6a6a6a;line-height:18px;margin:3px 0}:host.popup .popup-window .rule:before{content:\"\\a\";width:5px;height:5px;border-radius:50%;background:#6a6a6a;display:inline-block;vertical-align:sub;margin:0 10px 6px 0}:host.popup .popup-window .rule.rule-pass{text-decoration:line-through;color:#d3d3d3}:host.popup .popup-window .rule.rule-pass:before{background:#d3d3d3}:host.popup .popup-window .success-message{color:#28a745;text-align:center;font-size:16px;margin-top:5px}:host.popup.popup-pro .popup-window .rule.rule-pass{color:#28a745;text-decoration:none}:host.popup.popup-pro .popup-window .rule.rule-pass:before{content:\"\\2713\"!important;width:0;height:0;padding-right:5px;vertical-align:inherit;background:#28a745}:host.popup.popup-pro .popup-window .success-message{color:#9c0404}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.DataService }]; }, propDecorators: { data: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcGFzc3dvcmQtdmFsaWRhdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXBhc3N3b3JkLXZhbGlkYXRvci9zcmMvbGliL25nLXBhc3N3b3JkLXZhbGlkYXRvci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy1wYXNzd29yZC12YWxpZGF0b3Ivc3JjL2xpYi9uZy1wYXNzd29yZC12YWxpZGF0b3IuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxZQUFZLEVBQ1osV0FBVyxFQUNYLFlBQVksRUFDWixLQUFLLEdBS04sTUFBTSxlQUFlLENBQUM7QUFTdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLFdBQVcsQ0FBQzs7OztBQVEzQyxNQUFNLE9BQU8sNEJBQTRCO0lBNEZ2QyxZQUNVLFVBQXNCLEVBQ3RCLFFBQW1CLEVBQ25CLFdBQXdCO1FBRnhCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQTVGbEMsbUJBQWMsR0FBRztZQUNmLFFBQVEsRUFBRSxLQUFLO1lBQ2YsZ0JBQWdCLEVBQUUsS0FBSztZQUN2QixnQkFBZ0IsRUFBRSxLQUFLO1lBQ3ZCLDhCQUE4QixFQUFFLEtBQUs7WUFDckMsOEJBQThCLEVBQUUsS0FBSztTQUN0QyxDQUFDO1FBQ0YsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixTQUFJLEdBQUcsS0FBSyxDQUFDO1FBQ2IsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDNUIsb0JBQWUsR0FBK0IsRUFBRSxHQUFHLGNBQWMsRUFBRSxDQUFDO0lBbUZqRSxDQUFDO0lBckVKOzs7O09BSUc7SUFFSCxhQUFhO1FBQ1gsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2YsSUFBSSxFQUFFLE9BQU87YUFDZCxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRCxJQUFhLElBQUksQ0FBQyxLQUFjO1FBQzlCLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztJQUN6QyxDQUFDO0lBRUQsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBSSxlQUFlO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDbkMsQ0FBQztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQUksV0FBVztRQUNiLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ2hDLEtBQUssRUFBRTtnQkFDTCxPQUFPLGNBQWMsQ0FBQyxNQUFNLENBQUM7WUFFL0IsS0FBSyxHQUFHO2dCQUNOLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFFbkM7Z0JBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUNwQztJQUNILENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPO1lBQ0wsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLO1lBQ2pDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSztTQUMzQixDQUFDO0lBQ0osQ0FBQztJQUVELElBQUksY0FBYztRQUNoQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO0lBQ2xDLENBQUM7SUFRRDs7OztPQUlHO0lBQ0gsUUFBUTtRQUNOLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVyQixJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFhLEVBQUUsRUFBRTtZQUN4RCxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUM7WUFDMUQsS0FBSyxNQUFNLFFBQVEsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRTtnQkFDakQsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUN6QyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ3RDO2FBQ0Y7WUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEtBQUssQ0FDdEQsQ0FBQyxLQUFjLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FDMUIsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3hELElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDdkM7SUFDSCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNyQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRXZDLE9BQU87U0FDUjthQUFNO1lBQ0wsb0NBQW9DO1lBQ3BDLE1BQU0sVUFBVSxHQUFHLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDdEQsSUFBSSxjQUFjLENBQUM7WUFFbkIsS0FBSyxNQUFNLFNBQVMsSUFBSSxVQUFVLEVBQUU7Z0JBQ2xDLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDaEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNsQyxjQUFjLEdBQUcsSUFBSSxDQUFDO29CQUV0QixPQUFPO2lCQUNSO2FBQ0Y7WUFFRCx5QkFBeUI7WUFDekIsSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDeEM7U0FDRjtJQUNILENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGlCQUFpQixDQUFDLFNBQWlCO1FBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLFFBQVEsR0FBRyxTQUFTLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsWUFBWSxDQUFDLFNBQWlCO1FBQzVCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLFlBQVksVUFBVSxDQUFDO1FBQ2pELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO1FBQzVDLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQztRQUVyRCxJQUFJLGFBQWEsR0FBRyxLQUFLO1lBQ3ZCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLENBQUMsTUFBTTtZQUM3QyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDOUIsSUFBSSxZQUFZLEdBQUcsS0FBSztZQUN0QixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEtBQUs7WUFDNUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO1FBQzdCLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUM7UUFDdkMsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQztRQUNyQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBRW5DLElBQUksZ0JBQWdCLEVBQUU7WUFDcEIsYUFBYSxHQUFHLENBQUMsQ0FBQztZQUNsQixZQUFZLEdBQUcsQ0FBQyxDQUFDO1NBQ2xCO1FBRUQsSUFBSSxRQUFRLENBQUM7UUFDYixJQUFJLFNBQVMsQ0FBQztRQUVkLFFBQVEsU0FBUyxFQUFFO1lBQ2pCLEtBQUssS0FBSztnQkFDUixRQUFRO29CQUNOLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxHQUFHLE9BQU8sR0FBRyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3hFLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQztnQkFFdEMsTUFBTTtZQUVSLEtBQUssUUFBUTtnQkFDWCxRQUFRO29CQUNOLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxHQUFHLE9BQU8sR0FBRyxhQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFDeEUsU0FBUyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO2dCQUV0QyxNQUFNO1lBQ1IsS0FBSyxNQUFNO2dCQUNULFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksR0FBRyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFDdEUsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQztnQkFFOUMsTUFBTTtZQUVSLEtBQUssT0FBTztnQkFDVixTQUFTLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEdBQUcsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQ3hFLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUM7U0FDakQ7UUFFRCxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDcEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBRXRDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxTQUFTO1FBQ1AsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNqQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDaEQ7SUFDSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGNBQWM7UUFDWixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUU7WUFDaEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBaUIsRUFBRSxFQUFFO2dCQUNwRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNuRSxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFDN0IsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQ2pDLENBQUM7U0FDSDtJQUNILENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN4QztRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQ3REO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxvQkFBb0I7UUFDbEIsSUFBSSxDQUFDLG1CQUFtQjtZQUN0QixVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUMzRCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFNBQVM7UUFDUCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDNUIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDbEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQzFELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFDekMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSTtZQUM5QixDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ1QsQ0FBQzs7MEhBalRVLDRCQUE0Qjs4R0FBNUIsNEJBQTRCLHFtQkM1QnpDLDYvQ0ErQkE7NEZESGEsNEJBQTRCO2tCQU54QyxTQUFTOytCQUNFLDJCQUEyQixRQUUvQixFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUU7bUpBa0JmLElBQUk7c0JBQVosS0FBSztnQkFFb0IsWUFBWTtzQkFBckMsV0FBVzt1QkFBQyxXQUFXO2dCQUNHLGFBQWE7c0JBQXZDLFdBQVc7dUJBQUMsWUFBWTtnQkFDSyxlQUFlO3NCQUE1QyxXQUFXO3VCQUFDLGVBQWU7Z0JBQ0ssbUJBQW1CO3NCQUFuRCxXQUFXO3VCQUFDLGtCQUFrQjtnQkFDSCxjQUFjO3NCQUF6QyxXQUFXO3VCQUFDLGFBQWE7Z0JBQ00saUJBQWlCO3NCQUFoRCxXQUFXO3VCQUFDLGlCQUFpQjtnQkFDTyxzQkFBc0I7c0JBQTFELFdBQVc7dUJBQUMsc0JBQXNCO2dCQUNGLGFBQWE7c0JBQTdDLFdBQVc7dUJBQUMsa0JBQWtCO2dCQUNJLGVBQWU7c0JBQWpELFdBQVc7dUJBQUMsb0JBQW9CO2dCQVFqQyxhQUFhO3NCQURaLFlBQVk7dUJBQUMsZUFBZSxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQVN0QixJQUFJO3NCQUFoQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSG9zdEJpbmRpbmcsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIElucHV0LFxyXG4gIE9uQ2hhbmdlcyxcclxuICBPbkluaXQsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBEYXRhU2VydmljZSB9IGZyb20gJy4vZGF0YS5zZXJ2aWNlJztcclxuaW1wb3J0IHtcclxuICBJRWxlbWVudFBvc2l0aW9uLFxyXG4gIElSdWxlcyxcclxuICBJU3RhdHVzLFxyXG4gIE5nUGFzc3dvcmRWYWxpZGF0b3JPcHRpb25zLFxyXG59IGZyb20gJy4vbmctcGFzc3dvcmQtdmFsaWRhdG9yLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IGRlZmF1bHRPcHRpb25zIH0gZnJvbSAnLi9vcHRpb25zJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbGliLW5nLXBhc3N3b3JkLXZhbGlkYXRvcicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL25nLXBhc3N3b3JkLXZhbGlkYXRvci5jb21wb25lbnQuaHRtbCcsXHJcbiAgaG9zdDogeyBjbGFzczogJ3BvcHVwJyB9LFxyXG4gIHN0eWxlVXJsczogWycuL25nLXBhc3N3b3JkLXZhbGlkYXRvci5jb21wb25lbnQuc2NzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdQYXNzd29yZFZhbGlkYXRvckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuICBoZWFkaW5nOiBzdHJpbmc7XHJcbiAgc3VjY2Vzc01lc3NhZ2U6IHN0cmluZztcclxuICBwYXNzd29yZFN0YXR1cyA9IHtcclxuICAgIHBhc3N3b3JkOiBmYWxzZSxcclxuICAgICdpbmNsdWRlLXN5bWJvbCc6IGZhbHNlLFxyXG4gICAgJ2luY2x1ZGUtbnVtYmVyJzogZmFsc2UsXHJcbiAgICAnaW5jbHVkZS1sb3dlcmNhc2UtY2hhcmFjdGVycyc6IGZhbHNlLFxyXG4gICAgJ2luY2x1ZGUtdXBwZXJjYXNlLWNoYXJhY3RlcnMnOiBmYWxzZSxcclxuICB9O1xyXG4gIGlzU2VjdXJlID0gZmFsc2U7XHJcbiAgU2hvdyA9IGZhbHNlO1xyXG4gIGV2ZW50cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBwYXNzd29yZE9wdGlvbnM6IE5nUGFzc3dvcmRWYWxpZGF0b3JPcHRpb25zID0geyAuLi5kZWZhdWx0T3B0aW9ucyB9O1xyXG5cclxuICBASW5wdXQoKSBkYXRhOiBhbnk7XHJcblxyXG4gIEBIb3N0QmluZGluZygnc3R5bGUudG9wJykgaG9zdFN0eWxlVG9wOiBzdHJpbmc7XHJcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5sZWZ0JykgaG9zdFN0eWxlTGVmdDogc3RyaW5nO1xyXG4gIEBIb3N0QmluZGluZygnc3R5bGUuei1pbmRleCcpIGhvc3RTdHlsZVpJbmRleDogbnVtYmVyO1xyXG4gIEBIb3N0QmluZGluZygnc3R5bGUudHJhbnNpdGlvbicpIGhvc3RTdHlsZVRyYW5zaXRpb246IHN0cmluZztcclxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLndpZHRoJykgaG9zdFN0eWxlV2lkdGg6IHN0cmluZztcclxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm1heC13aWR0aCcpIGhvc3RTdHlsZU1heFdpZHRoOiBzdHJpbmc7XHJcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5wb2ludGVyLWV2ZW50cycpIGhvc3RTdHlsZVBvaW50ZXJFdmVudHM6IHN0cmluZztcclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnBvcHVwLXNob3cnKSBob3N0Q2xhc3NTaG93OiBib29sZWFuO1xyXG4gIEBIb3N0QmluZGluZygnY2xhc3MucG9wdXAtc2hhZG93JykgaG9zdENsYXNzU2hhZG93OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBIb3N0IGxpc3RlbmVyIHRyYW5zaXRpb24gZW5kXHJcbiAgICpcclxuICAgKiBAbWVtYmVyb2YgTmdQYXNzd29yZFZhbGlkYXRvckNvbXBvbmVudFxyXG4gICAqL1xyXG4gIEBIb3N0TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBbJyddKVxyXG4gIHRyYW5zaXRpb25FbmQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5zaG93KSB7XHJcbiAgICAgIHRoaXMuZXZlbnRzLmVtaXQoe1xyXG4gICAgICAgIHR5cGU6ICdzaG93bicsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgc2V0IHNob3codmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICB0aGlzLnNldFBvc2l0aW9uKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLlNob3cgPSB0aGlzLmhvc3RDbGFzc1Nob3cgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIGdldCBzaG93KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuU2hvdztcclxuICB9XHJcblxyXG4gIGdldCBwbGFjZW1lbnQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGEub3B0aW9ucy5wbGFjZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBnZXQgZWxlbWVudCgpIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGEuZWxlbWVudDtcclxuICB9XHJcblxyXG4gIGdldCBlbGVtZW50UG9zaXRpb24oKTogSUVsZW1lbnRQb3NpdGlvbiB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhLmVsZW1lbnRQb3NpdGlvbjtcclxuICB9XHJcblxyXG4gIGdldCBvcHRpb25zKCk6IE5nUGFzc3dvcmRWYWxpZGF0b3JPcHRpb25zIHtcclxuICAgIHJldHVybiB0aGlzLmRhdGEub3B0aW9ucztcclxuICB9XHJcblxyXG4gIGdldCBwb3B1cE9mZnNldCgpOiBudW1iZXIge1xyXG4gICAgc3dpdGNoICh0aGlzLmRhdGEub3B0aW9ucy5vZmZzZXQpIHtcclxuICAgICAgY2FzZSAnJzpcclxuICAgICAgICByZXR1cm4gZGVmYXVsdE9wdGlvbnMub2Zmc2V0O1xyXG5cclxuICAgICAgY2FzZSAnMCc6XHJcbiAgICAgICAgcmV0dXJuICt0aGlzLmRhdGEub3B0aW9ucy5vZmZzZXQ7XHJcblxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHJldHVybiArdGhpcy5kYXRhLm9wdGlvbnMub2Zmc2V0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IHJ1bGVzKCk6IElSdWxlcyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAuLi50aGlzLmRhdGEuZGVmYXVsdE9wdGlvbnMucnVsZXMsXHJcbiAgICAgIC4uLnRoaXMuZGF0YS5vcHRpb25zLnJ1bGVzLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGdldCBkZWZhdWx0T3B0aW9ucygpOiBOZ1Bhc3N3b3JkVmFsaWRhdG9yT3B0aW9ucyB7XHJcbiAgICByZXR1cm4gdGhpcy5kYXRhLmRlZmF1bHRPcHRpb25zO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICBwcml2YXRlIGRhdGFTZXJ2aWNlOiBEYXRhU2VydmljZVxyXG4gICkge31cclxuXHJcbiAgLyoqXHJcbiAgICogQ29tcG9uZW50IGluaXRpYWxpemF0aW9uXHJcbiAgICpcclxuICAgKiBAbWVtYmVyb2YgTmdQYXNzd29yZFZhbGlkYXRvckNvbXBvbmVudFxyXG4gICAqL1xyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5zZXRDdXN0b21DbGFzcygpO1xyXG4gICAgdGhpcy5zZXRTdHlsZXMoKTtcclxuICAgIHRoaXMuc2V0VGhlbWUoKTtcclxuICAgIHRoaXMuc2V0Q3VzdG9tVGV4dCgpO1xyXG5cclxuICAgIHRoaXMuZGF0YVNlcnZpY2UudXBkYXRlZFZhbHVlLnN1YnNjcmliZSgoZGF0YTogSVN0YXR1cykgPT4ge1xyXG4gICAgICB0aGlzLnBhc3N3b3JkU3RhdHVzID0geyAuLi50aGlzLnBhc3N3b3JkU3RhdHVzLCAuLi5kYXRhIH07XHJcbiAgICAgIGZvciAoY29uc3QgcHJvcE5hbWUgaW4gdGhpcy5wYXNzd29yZE9wdGlvbnMucnVsZXMpIHtcclxuICAgICAgICBpZiAoIXRoaXMucGFzc3dvcmRPcHRpb25zLnJ1bGVzW3Byb3BOYW1lXSkge1xyXG4gICAgICAgICAgZGVsZXRlIHRoaXMucGFzc3dvcmRTdGF0dXNbcHJvcE5hbWVdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aGlzLmlzU2VjdXJlID0gT2JqZWN0LnZhbHVlcyh0aGlzLnBhc3N3b3JkU3RhdHVzKS5ldmVyeShcclxuICAgICAgICAodmFsdWU6IGJvb2xlYW4pID0+IHZhbHVlXHJcbiAgICAgICk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmIChjaGFuZ2VzICYmIGNoYW5nZXMuZGF0YSAmJiBjaGFuZ2VzLmRhdGEuY3VycmVudFZhbHVlKSB7XHJcbiAgICAgIHRoaXMuZGF0YSA9IGNoYW5nZXMuZGF0YS5jdXJyZW50VmFsdWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgcG9wdXAgd2luZG93IHBvc2l0aW9uXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyB7dm9pZH1cclxuICAgKiBAbWVtYmVyb2YgTmdQYXNzd29yZFZhbGlkYXRvckNvbXBvbmVudFxyXG4gICAqL1xyXG4gIHNldFBvc2l0aW9uKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuc2V0SG9zdFN0eWxlKHRoaXMucGxhY2VtZW50KSkge1xyXG4gICAgICB0aGlzLnNldFBsYWNlbWVudENsYXNzKHRoaXMucGxhY2VtZW50KTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIElzIHBvcHVwIG91dHNpZGUgdGhlIHZpc2libGUgYXJlYVxyXG4gICAgICBjb25zdCBwbGFjZW1lbnRzID0gWyd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnXTtcclxuICAgICAgbGV0IGlzUGxhY2VtZW50U2V0O1xyXG5cclxuICAgICAgZm9yIChjb25zdCBwbGFjZW1lbnQgb2YgcGxhY2VtZW50cykge1xyXG4gICAgICAgIGlmICh0aGlzLnNldEhvc3RTdHlsZShwbGFjZW1lbnQpKSB7XHJcbiAgICAgICAgICB0aGlzLnNldFBsYWNlbWVudENsYXNzKHBsYWNlbWVudCk7XHJcbiAgICAgICAgICBpc1BsYWNlbWVudFNldCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gU2V0IG9yaWdpbmFsIHBsYWNlbWVudFxyXG4gICAgICBpZiAoIWlzUGxhY2VtZW50U2V0KSB7XHJcbiAgICAgICAgdGhpcy5zZXRIb3N0U3R5bGUodGhpcy5wbGFjZW1lbnQpO1xyXG4gICAgICAgIHRoaXMuc2V0UGxhY2VtZW50Q2xhc3ModGhpcy5wbGFjZW1lbnQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgcG9wdXAgcGxhY2VtZW50IGNsYXNzXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGxhY2VtZW50XHJcbiAgICogQG1lbWJlcm9mIE5nUGFzc3dvcmRWYWxpZGF0b3JDb21wb25lbnRcclxuICAgKi9cclxuICBzZXRQbGFjZW1lbnRDbGFzcyhwbGFjZW1lbnQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3BvcHVwLScgKyBwbGFjZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IGhvc3QgZWxlbWVudCBzdHlsZVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBsYWNlbWVudFxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAqIEBtZW1iZXJvZiBOZ1Bhc3N3b3JkVmFsaWRhdG9yQ29tcG9uZW50XHJcbiAgICovXHJcbiAgc2V0SG9zdFN0eWxlKHBsYWNlbWVudDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCBpc1N2ZyA9IHRoaXMuZWxlbWVudCBpbnN0YW5jZW9mIFNWR0VsZW1lbnQ7XHJcbiAgICBjb25zdCBwb3B1cCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xyXG4gICAgY29uc3QgaXNDdXN0b21Qb3NpdGlvbiA9ICF0aGlzLmVsZW1lbnRQb3NpdGlvbi5yaWdodDtcclxuXHJcbiAgICBsZXQgZWxlbWVudEhlaWdodCA9IGlzU3ZnXHJcbiAgICAgID8gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodFxyXG4gICAgICA6IHRoaXMuZWxlbWVudC5vZmZzZXRIZWlnaHQ7XHJcbiAgICBsZXQgZWxlbWVudFdpZHRoID0gaXNTdmdcclxuICAgICAgPyB0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcclxuICAgICAgOiB0aGlzLmVsZW1lbnQub2Zmc2V0V2lkdGg7XHJcbiAgICBjb25zdCBwb3B1cEhlaWdodCA9IHBvcHVwLmNsaWVudEhlaWdodDtcclxuICAgIGNvbnN0IHBvcHVwV2lkdGggPSBwb3B1cC5jbGllbnRXaWR0aDtcclxuICAgIGNvbnN0IHNjcm9sbFkgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcblxyXG4gICAgaWYgKGlzQ3VzdG9tUG9zaXRpb24pIHtcclxuICAgICAgZWxlbWVudEhlaWdodCA9IDA7XHJcbiAgICAgIGVsZW1lbnRXaWR0aCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHRvcFN0eWxlO1xyXG4gICAgbGV0IGxlZnRTdHlsZTtcclxuXHJcbiAgICBzd2l0Y2ggKHBsYWNlbWVudCkge1xyXG4gICAgICBjYXNlICd0b3AnOlxyXG4gICAgICAgIHRvcFN0eWxlID1cclxuICAgICAgICAgIHRoaXMuZWxlbWVudFBvc2l0aW9uLnRvcCArIHNjcm9sbFkgLSAocG9wdXBIZWlnaHQgKyB0aGlzLnBvcHVwT2Zmc2V0KTtcclxuICAgICAgICBsZWZ0U3R5bGUgPSB0aGlzLmVsZW1lbnRQb3NpdGlvbi5sZWZ0O1xyXG5cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgJ2JvdHRvbSc6XHJcbiAgICAgICAgdG9wU3R5bGUgPVxyXG4gICAgICAgICAgdGhpcy5lbGVtZW50UG9zaXRpb24udG9wICsgc2Nyb2xsWSArIGVsZW1lbnRIZWlnaHQgKyB0aGlzLnBvcHVwT2Zmc2V0O1xyXG4gICAgICAgIGxlZnRTdHlsZSA9IHRoaXMuZWxlbWVudFBvc2l0aW9uLmxlZnQ7XHJcblxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdsZWZ0JzpcclxuICAgICAgICBsZWZ0U3R5bGUgPSB0aGlzLmVsZW1lbnRQb3NpdGlvbi5sZWZ0IC0gcG9wdXBXaWR0aCAtIHRoaXMucG9wdXBPZmZzZXQ7XHJcbiAgICAgICAgdG9wU3R5bGUgPSB0aGlzLmVsZW1lbnRQb3NpdGlvbi50b3AgKyBzY3JvbGxZO1xyXG5cclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgJ3JpZ2h0JzpcclxuICAgICAgICBsZWZ0U3R5bGUgPSB0aGlzLmVsZW1lbnRQb3NpdGlvbi5sZWZ0ICsgZWxlbWVudFdpZHRoICsgdGhpcy5wb3B1cE9mZnNldDtcclxuICAgICAgICB0b3BTdHlsZSA9IHRoaXMuZWxlbWVudFBvc2l0aW9uLnRvcCArIHNjcm9sbFk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5ob3N0U3R5bGVUb3AgPSB0b3BTdHlsZSArICdweCc7XHJcbiAgICB0aGlzLmhvc3RTdHlsZUxlZnQgPSBsZWZ0U3R5bGUgKyAncHgnO1xyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyBaLWluZGV4XHJcbiAgICpcclxuICAgKiBAbWVtYmVyb2YgTmdQYXNzd29yZFZhbGlkYXRvckNvbXBvbmVudFxyXG4gICAqL1xyXG4gIHNldFpJbmRleCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnNbJ3otaW5kZXgnXSAhPT0gMCkge1xyXG4gICAgICB0aGlzLmhvc3RTdHlsZVpJbmRleCA9IHRoaXMub3B0aW9uc1snei1pbmRleCddO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RlIGN1c3RvbSBjbGFzcyBuYW1lXHJcbiAgICpcclxuICAgKiBAbWVtYmVyb2YgTmdQYXNzd29yZFZhbGlkYXRvckNvbXBvbmVudFxyXG4gICAqL1xyXG4gIHNldEN1c3RvbUNsYXNzKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMub3B0aW9uc1snY3VzdG9tLWNsYXNzJ10pIHtcclxuICAgICAgdGhpcy5vcHRpb25zWydjdXN0b20tY2xhc3MnXS5zcGxpdCgnICcpLmZvckVhY2goKGNsYXNzTmFtZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgY2xhc3NOYW1lKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlbWVcclxuICAgKlxyXG4gICAqIEBtZW1iZXJvZiBOZ1Bhc3N3b3JkVmFsaWRhdG9yQ29tcG9uZW50XHJcbiAgICovXHJcbiAgc2V0VGhlbWUoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zWyd0aGVtZSddKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoXHJcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICAgJ3BvcHVwLScgKyB0aGlzLm9wdGlvbnNbJ3RoZW1lJ11cclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldEN1c3RvbVRleHQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zWydoZWFkaW5nJ10pIHtcclxuICAgICAgdGhpcy5oZWFkaW5nID0gdGhpcy5vcHRpb25zWydoZWFkaW5nJ107XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9uc1snc3VjY2Vzc01lc3NhZ2UnXSkge1xyXG4gICAgICB0aGlzLnN1Y2Nlc3NNZXNzYWdlID0gdGhpcy5vcHRpb25zWydzdWNjZXNzTWVzc2FnZSddO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgYW5pbWF0aW9uIGR1cmF0aW9uXHJcbiAgICpcclxuICAgKiBAbWVtYmVyb2YgTmdQYXNzd29yZFZhbGlkYXRvckNvbXBvbmVudFxyXG4gICAqL1xyXG4gIHNldEFuaW1hdGlvbkR1cmF0aW9uKCk6IHZvaWQge1xyXG4gICAgdGhpcy5ob3N0U3R5bGVUcmFuc2l0aW9uID1cclxuICAgICAgJ29wYWNpdHkgJyArIHRoaXMub3B0aW9uc1snYW5pbWF0aW9uLWR1cmF0aW9uJ10gKyAnbXMnO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHBvcHVwIHdpbmRvdyBzdHlsZVxyXG4gICAqXHJcbiAgICogQG1lbWJlcm9mIE5nUGFzc3dvcmRWYWxpZGF0b3JDb21wb25lbnRcclxuICAgKi9cclxuICBzZXRTdHlsZXMoKTogdm9pZCB7XHJcbiAgICB0aGlzLnNldFpJbmRleCgpO1xyXG4gICAgdGhpcy5zZXRBbmltYXRpb25EdXJhdGlvbigpO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy50eXBlICE9PSAnaW5saW5lJykge1xyXG4gICAgICB0aGlzLmhvc3RDbGFzc1NoYWRvdyA9IHRoaXMub3B0aW9uc1snc2hhZG93J107XHJcbiAgICB9XHJcbiAgICB0aGlzLmhvc3RTdHlsZU1heFdpZHRoID0gdGhpcy5vcHRpb25zWydtYXgtd2lkdGgnXSArICdweCc7XHJcbiAgICB0aGlzLmhvc3RTdHlsZVdpZHRoID0gdGhpcy5vcHRpb25zWyd3aWR0aCddXHJcbiAgICAgID8gdGhpcy5vcHRpb25zWyd3aWR0aCddICsgJ3B4J1xyXG4gICAgICA6ICcnO1xyXG4gIH1cclxufVxyXG4iLCI8ZGl2IGNsYXNzPVwicG9wdXAtd2luZG93XCI+XHJcbiAgPGRpdiBjbGFzcz1cImhlYWRpbmdcIj57e2hlYWRpbmd9fTwvZGl2PlxyXG4gIDxkaXYgKm5nSWY9XCJydWxlc1sncGFzc3dvcmQnXVwiPlxyXG4gICAgPGRpdiBjbGFzcz1cInJ1bGVcIiBbaGlkZGVuXT1cInJ1bGVzWydwYXNzd29yZCddLnR5cGUgIT09ICdudW1iZXInXCJcclxuICAgICAgW25nQ2xhc3NdPVwieydydWxlLXBhc3MnOnBhc3N3b3JkU3RhdHVzWydwYXNzd29yZCddfVwiPlxyXG4gICAgICBQYXNzd29yZCBsZW5ndGggc2hvdWxkIGJlIHt7cnVsZXNbJ3Bhc3N3b3JkJ10ubGVuZ3RofX0gY2hhcmFjdGVycy5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cInJ1bGVcIiBbaGlkZGVuXT1cInJ1bGVzWydwYXNzd29yZCddLnR5cGUgIT09ICdyYW5nZSdcIlxyXG4gICAgICBbbmdDbGFzc109XCJ7J3J1bGUtcGFzcyc6cGFzc3dvcmRTdGF0dXNbJ3Bhc3N3b3JkJ119XCI+XHJcbiAgICAgIFBhc3N3b3JkIGxlbmd0aCBzaG91bGQgYmUge3tydWxlc1sncGFzc3dvcmQnXS5taW59fSAtIHt7cnVsZXNbJ3Bhc3N3b3JkJ10ubWF4fX1cclxuICAgICAgY2hhcmFjdGVycy5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJydWxlXCIgW2hpZGRlbl09XCIhcnVsZXNbJ2luY2x1ZGUtc3ltYm9sJ11cIiBbbmdDbGFzc109XCJ7J3J1bGUtcGFzcyc6cGFzc3dvcmRTdGF0dXNbJ2luY2x1ZGUtc3ltYm9sJ119XCI+XHJcbiAgICBJbmNsdWRlIFN5bWJvbHM6KCBlLmcuIEAjJCUgKVxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJydWxlXCIgW2hpZGRlbl09XCIhcnVsZXNbJ2luY2x1ZGUtbnVtYmVyJ11cIiBbbmdDbGFzc109XCJ7J3J1bGUtcGFzcyc6cGFzc3dvcmRTdGF0dXNbJ2luY2x1ZGUtbnVtYmVyJ119XCI+XHJcbiAgICBJbmNsdWRlIE51bWJlcnM6KCBlLmcuMTIzNDU2IClcclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwicnVsZVwiIFtoaWRkZW5dPVwiIXJ1bGVzWydpbmNsdWRlLWxvd2VyY2FzZS1jaGFyYWN0ZXJzJ11cIlxyXG4gICAgW25nQ2xhc3NdPVwieydydWxlLXBhc3MnOnBhc3N3b3JkU3RhdHVzWydpbmNsdWRlLWxvd2VyY2FzZS1jaGFyYWN0ZXJzJ119XCI+XHJcbiAgICBJbmNsdWRlIExvd2VyY2FzZSBDaGFyYWN0ZXJzOihlLmcuIGFiY2RlZmdoIClcclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwicnVsZVwiIFtoaWRkZW5dPVwiIXJ1bGVzWydpbmNsdWRlLXVwcGVyY2FzZS1jaGFyYWN0ZXJzJ11cIlxyXG4gICAgW25nQ2xhc3NdPVwieydydWxlLXBhc3MnOnBhc3N3b3JkU3RhdHVzWydpbmNsdWRlLXVwcGVyY2FzZS1jaGFyYWN0ZXJzJ119XCI+XHJcbiAgICBJbmNsdWRlIFVwcGVyY2FzZSBDaGFyYWN0ZXJzOihlLmcuIEFCQ0RFRkdIIClcclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwic3VjY2Vzcy1tZXNzYWdlXCIgW2hpZGRlbl09XCIhaXNTZWN1cmVcIj5cclxuICAgIHt7c3VjY2Vzc01lc3NhZ2V9fVxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuIl19