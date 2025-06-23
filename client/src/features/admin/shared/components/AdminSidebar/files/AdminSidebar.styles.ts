/**
 * @constant ADMIN_SIDEBAR_STYLES
 * @description Styling classes for the AdminSidebar component using modern dark palette
 */
export const ADMIN_SIDEBAR_STYLES = {
    container: 'fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50 shadow-2xl transform transition-transform duration-300 ease-in-out z-30 overflow-hidden',
    open: 'translate-x-0',
    closed: '-translate-x-full lg:translate-x-0',
    
    content: 'relative h-full flex flex-col',
    
    // Header
    header: 'p-6 border-b border-slate-700/50',
    title: 'text-xl font-bold text-white bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent',
    
    // Navigation
    nav: 'flex-1 py-4 space-y-2 px-4 overflow-y-auto',
    navItem: 'relative w-full flex items-center space-x-3 px-4 py-3 text-left rounded-xl transition-all duration-200 group',
    navItemActive: 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-blue-500/30 shadow-lg',
    navItemInactive: 'text-slate-300 hover:text-white hover:bg-slate-700/50 border border-transparent hover:border-slate-600/50',
    navIcon: 'text-xl group-hover:scale-110 transition-transform duration-200',
    navText: 'font-medium group-hover:translate-x-1 transition-transform duration-200',
    activeIndicator: 'absolute right-2 w-2 h-2 bg-blue-400 rounded-full',
    
    // Footer
    footer: 'p-4 border-t border-slate-700/50',
    footerContent: 'flex items-center space-x-3 px-4 py-2 text-slate-400',
    footerIcon: 'text-lg',
    footerText: 'text-sm font-medium',
    
    // Decorative
    gradient: 'absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none',
} as const;
