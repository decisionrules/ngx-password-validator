import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class UtilsService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXBhc3N3b3JkLXZhbGlkYXRvci9zcmMvbGliL3V0aWxzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFJM0MsTUFBTSxPQUFPLFlBQVk7SUFDdkI7Ozs7Ozs7T0FPRztJQUNILFNBQVMsQ0FDUCxNQUFrQyxFQUNsQyxNQUFrQztRQUVsQyxtSEFBbUg7UUFDbkgsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3JDLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLE1BQU0sRUFBRTtnQkFDakMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN0RTtTQUNGO1FBRUQsc0NBQXNDO1FBQ3RDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVwQyxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDOzswR0F4QlUsWUFBWTs4R0FBWixZQUFZOzRGQUFaLFlBQVk7a0JBRHhCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5nUGFzc3dvcmRWYWxpZGF0b3JPcHRpb25zIH0gZnJvbSAnLi9uZy1wYXNzd29yZC12YWxpZGF0b3IuaW50ZXJmYWNlJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFV0aWxzU2VydmljZSB7XHJcbiAgLyoqXHJcbiAgICogRGVlcCBtZXJnZSBvYmplY3RzXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge05nUGFzc3dvcmRWYWxpZGF0b3JPcHRpb25zfSB0YXJnZXRcclxuICAgKiBAcGFyYW0ge05nUGFzc3dvcmRWYWxpZGF0b3JPcHRpb25zfSBzb3VyY2VcclxuICAgKiBAcmV0dXJucyB7TmdQYXNzd29yZFZhbGlkYXRvck9wdGlvbnN9XHJcbiAgICogQG1lbWJlcm9mIFV0aWxzU2VydmljZVxyXG4gICAqL1xyXG4gIGRlZXBNZXJnZShcclxuICAgIHRhcmdldDogTmdQYXNzd29yZFZhbGlkYXRvck9wdGlvbnMsXHJcbiAgICBzb3VyY2U6IE5nUGFzc3dvcmRWYWxpZGF0b3JPcHRpb25zXHJcbiAgKTogTmdQYXNzd29yZFZhbGlkYXRvck9wdGlvbnMge1xyXG4gICAgLy8gSXRlcmF0ZSB0aHJvdWdoIGBzb3VyY2VgIHByb3BlcnRpZXMgYW5kIGlmIGFuIGBPYmplY3RgIHNldCBwcm9wZXJ0eSB0byBtZXJnZSBvZiBgdGFyZ2V0YCBhbmQgYHNvdXJjZWAgcHJvcGVydGllc1xyXG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoc291cmNlKSkge1xyXG4gICAgICBpZiAoc291cmNlW2tleV0gaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHNvdXJjZVtrZXldLCB0aGlzLmRlZXBNZXJnZSh0YXJnZXRba2V5XSwgc291cmNlW2tleV0pKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEpvaW4gYHRhcmdldGAgYW5kIG1vZGlmaWVkIGBzb3VyY2VgXHJcbiAgICBPYmplY3QuYXNzaWduKHRhcmdldCB8fCB7fSwgc291cmNlKTtcclxuXHJcbiAgICByZXR1cm4gdGFyZ2V0O1xyXG4gIH1cclxufVxyXG4iXX0=