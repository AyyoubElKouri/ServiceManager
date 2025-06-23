/**
 * @constant ADMIN_LAYOUT_STYLES
 * @description Styling classes for the AdminLayout component using modern dark palette
 */
export const ADMIN_LAYOUT_STYLES = {
    container: 'min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
    
    // Main content area
    main: 'lg:ml-64 transition-all duration-300 ease-in-out pt-16',
    content: 'p-4 sm:p-6 lg:p-8',
    
    // Mobile overlay for sidebar
    overlay: 'fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden',
} as const;
