/**
 * @constant ADMIN_HEADER_STYLES
 * @description Styling classes for the AdminHeader component using modern dark palette
 */
export const ADMIN_HEADER_STYLES = {
    container: 'fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 shadow-2xl border-b border-slate-700/50',
    content: 'flex items-center justify-between px-4 sm:px-6 h-16',

    // Mobile menu button
    mobileMenuButton: 'lg:hidden text-white hover:text-blue-300 transition-colors duration-200 p-2 rounded-lg hover:bg-slate-700/50',

    // Logo section
    logo: {
        container: 'flex items-center space-x-3 group',
        imageWrapper: 'relative',
        image: 'h-10 w-auto bg-white p-1.5 rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-blue-400/30 group-hover:border-blue-400/60',
        glow: 'absolute inset-0 bg-blue-400/20 rounded-lg blur-md group-hover:blur-lg transition-all duration-300',
        text: 'hidden sm:block text-xl font-bold text-white drop-shadow-lg',
    },

    // Title section
    title: {
        container: 'hidden md:flex flex-col items-center flex-1 px-8',
        text: 'text-2xl font-bold text-white drop-shadow-lg bg-gradient-to-r from-blue-200 via-white to-purple-200 bg-clip-text text-transparent',
        decoration: 'text-blue-300/60 text-xs font-light',
    },

    // User section
    user: {
        container: 'relative',
        button: 'flex items-center space-x-3 px-3 py-2 bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-xl text-white hover:bg-slate-700/60 hover:border-slate-500/50 transition-all duration-300 shadow-lg hover:shadow-xl group',
        emailText: 'hidden sm:block font-medium text-slate-200 group-hover:text-white transition-colors duration-300',
        avatar: 'w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg',
        dropdownIcon: 'w-4 h-4 text-slate-400 group-hover:text-white transition-colors duration-300',

        dropdown: {
            container: 'absolute right-0 top-full mt-2 w-48 bg-slate-800 border border-slate-600 rounded-xl shadow-2xl backdrop-blur-sm overflow-hidden',
            item: 'px-4 py-3 text-slate-200 hover:bg-slate-700 hover:text-white transition-all duration-200 cursor-pointer flex items-center space-x-2',
            icon: 'w-4 h-4 text-red-400',
            text: 'font-medium',
        },
    },

    // Decorative elements
    decorative: {
        leftAccent: 'absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-transparent',
        rightAccent: 'absolute right-0 top-0 w-2 h-full bg-gradient-to-b from-purple-500 via-blue-500 to-transparent',
        bottomGlow: 'absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent',
    },
} as const;
