export const defaultOptions = {
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
export const initializeStage = {
    password: false,
    'include-symbol': false,
    'include-number': false,
    'include-lowercase-characters': false,
    'include-uppercase-characters': false,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25nLXBhc3N3b3JkLXZhbGlkYXRvci9zcmMvbGliL29wdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS0EsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUErQjtJQUN4RCxTQUFTLEVBQUUsUUFBUTtJQUNuQixTQUFTLEVBQUUsQ0FBQztJQUNaLGNBQWMsRUFBRSxFQUFFO0lBQ2xCLE1BQU0sRUFBRSxJQUFJO0lBQ1osS0FBSyxFQUFFLEtBQUs7SUFDWixJQUFJLEVBQUUsT0FBTztJQUNiLE1BQU0sRUFBRSxDQUFDO0lBQ1QsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixjQUFjLEVBQUUsMENBQTBDO0lBQzFELEtBQUssRUFBRTtRQUNMLFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxPQUFPO1lBQ2IsTUFBTSxFQUFFLENBQUM7WUFDVCxHQUFHLEVBQUUsQ0FBQztZQUNOLEdBQUcsRUFBRSxFQUFFO1NBQ1I7UUFDRCxnQkFBZ0IsRUFBRSxJQUFJO1FBQ3RCLGdCQUFnQixFQUFFLElBQUk7UUFDdEIsOEJBQThCLEVBQUUsSUFBSTtRQUNwQyw4QkFBOEIsRUFBRSxJQUFJO0tBQ3JDO0NBQ0YsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBWTtJQUN0QyxRQUFRLEVBQUUsS0FBSztJQUNmLGdCQUFnQixFQUFFLEtBQUs7SUFDdkIsZ0JBQWdCLEVBQUUsS0FBSztJQUN2Qiw4QkFBOEIsRUFBRSxLQUFLO0lBQ3JDLDhCQUE4QixFQUFFLEtBQUs7Q0FDdEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgSVN0YXR1cyxcclxuICBOZ1Bhc3N3b3JkVmFsaWRhdG9yT3B0aW9ucyxcclxufSBmcm9tICcuL25nLXBhc3N3b3JkLXZhbGlkYXRvci5pbnRlcmZhY2UnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGRlZmF1bHRPcHRpb25zOiBOZ1Bhc3N3b3JkVmFsaWRhdG9yT3B0aW9ucyA9IHtcclxuICBwbGFjZW1lbnQ6ICdib3R0b20nLFxyXG4gICd6LWluZGV4JzogMCxcclxuICAnY3VzdG9tLWNsYXNzJzogJycsXHJcbiAgc2hhZG93OiB0cnVlLFxyXG4gIHRoZW1lOiAncHJvJyxcclxuICB0eXBlOiAncG9wdXAnLFxyXG4gIG9mZnNldDogOCxcclxuICBoZWFkaW5nOiAnUGFzc3dvcmQgUG9saWN5JyxcclxuICBzdWNjZXNzTWVzc2FnZTogJ0F3ZXNvbWUhIFBhc3N3b3JkIHJlcXVpcmVtZW50IGZ1bGZpbGxlZC4nLFxyXG4gIHJ1bGVzOiB7XHJcbiAgICBwYXNzd29yZDoge1xyXG4gICAgICB0eXBlOiAncmFuZ2UnLFxyXG4gICAgICBsZW5ndGg6IDgsXHJcbiAgICAgIG1pbjogNixcclxuICAgICAgbWF4OiAxMCxcclxuICAgIH0sXHJcbiAgICAnaW5jbHVkZS1zeW1ib2wnOiB0cnVlLFxyXG4gICAgJ2luY2x1ZGUtbnVtYmVyJzogdHJ1ZSxcclxuICAgICdpbmNsdWRlLWxvd2VyY2FzZS1jaGFyYWN0ZXJzJzogdHJ1ZSxcclxuICAgICdpbmNsdWRlLXVwcGVyY2FzZS1jaGFyYWN0ZXJzJzogdHJ1ZSxcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGluaXRpYWxpemVTdGFnZTogSVN0YXR1cyA9IHtcclxuICBwYXNzd29yZDogZmFsc2UsXHJcbiAgJ2luY2x1ZGUtc3ltYm9sJzogZmFsc2UsXHJcbiAgJ2luY2x1ZGUtbnVtYmVyJzogZmFsc2UsXHJcbiAgJ2luY2x1ZGUtbG93ZXJjYXNlLWNoYXJhY3RlcnMnOiBmYWxzZSxcclxuICAnaW5jbHVkZS11cHBlcmNhc2UtY2hhcmFjdGVycyc6IGZhbHNlLFxyXG59O1xyXG4iXX0=