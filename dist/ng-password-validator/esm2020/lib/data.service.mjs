import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { initializeStage } from './options';
import * as i0 from "@angular/core";
export class DataService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctcGFzc3dvcmQtdmFsaWRhdG9yL3NyYy9saWIvZGF0YS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUd2QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sV0FBVyxDQUFDOztBQUc1QyxNQUFNLE9BQU8sV0FBVztJQUR4QjtRQUVVLFVBQUssR0FBRyxJQUFJLGVBQWUsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNyRCxpQkFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7S0FLMUM7SUFIQyxXQUFXLENBQUMsSUFBYTtRQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QixDQUFDOzt5R0FOVSxXQUFXOzZHQUFYLFdBQVc7NEZBQVgsV0FBVztrQkFEdkIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IElTdGF0dXMgfSBmcm9tICcuL25nLXBhc3N3b3JkLXZhbGlkYXRvci5pbnRlcmZhY2UnO1xyXG5cclxuaW1wb3J0IHsgaW5pdGlhbGl6ZVN0YWdlIH0gZnJvbSAnLi9vcHRpb25zJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIERhdGFTZXJ2aWNlIHtcclxuICBwcml2YXRlIHZhbHVlID0gbmV3IEJlaGF2aW9yU3ViamVjdChpbml0aWFsaXplU3RhZ2UpO1xyXG4gIHVwZGF0ZWRWYWx1ZSA9IHRoaXMudmFsdWUuYXNPYnNlcnZhYmxlKCk7XHJcblxyXG4gIHVwZGF0ZVZhbHVlKGRhdGE6IElTdGF0dXMpOiB2b2lkIHtcclxuICAgIHRoaXMudmFsdWUubmV4dChkYXRhKTtcclxuICB9XHJcbn1cclxuIl19