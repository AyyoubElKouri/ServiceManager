/**
 * @constant USER_HEADER_STYLES
 * @description Styling classes for the UserHeader component using modern dark palette with rich patterns
 */
export const USER_HEADER_STYLES = {
    container:
        'relative bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 shadow-2xl border-b border-slate-700/50',

    // Decorative patterns
    patterns: {
        overlay:
            'absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-slate-600/10',
        dots: 'absolute inset-0 opacity-20',
        circuit: 'absolute top-0 right-0 w-64 h-64 opacity-10 transform rotate-12',
    },

    content: 'relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
    wrapper: 'flex justify-between items-center h-20',

    // Logo section
    logo: {
        container: 'flex items-center space-x-4 group',
        imageWrapper: 'relative',
        image: 'h-12 w-auto bg-white p-2 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-blue-400/30 group-hover:border-blue-400/60',
        glow: 'absolute inset-0 bg-blue-400/20 rounded-xl blur-md group-hover:blur-lg transition-all duration-300',
        text: 'text-2xl font-bold text-white drop-shadow-lg',
    },

    // Center welcome message
    welcome: {
        container: 'flex-1 text-center px-8',
        text: 'text-3xl font-bold text-white drop-shadow-lg bg-gradient-to-r from-blue-200 via-white to-purple-200 bg-clip-text text-transparent',
        decoration: 'text-blue-300/60 text-sm font-light mt-1',
    },

    // User section
    user: {
        container: 'relative',
        emailButton:
            'flex items-center space-x-3 px-4 py-2 bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-xl text-white hover:bg-slate-700/60 hover:border-slate-500/50 transition-all duration-300 shadow-lg hover:shadow-xl group',
        emailText:
            'font-medium text-slate-200 group-hover:text-white transition-colors duration-300',
        avatar: 'w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg',
        dropdownIcon:
            'w-4 h-4 text-slate-400 group-hover:text-white transition-colors duration-300',

        // Dropdown
        dropdown: {
            container:
                'fixed right-4 top-20 w-48 bg-slate-800 border border-slate-600 rounded-xl shadow-2xl backdrop-blur-sm z-[9999] overflow-hidden',
            item: 'px-4 py-3 text-slate-200 hover:bg-slate-700 hover:text-white transition-all duration-200 cursor-pointer flex items-center space-x-2 border-b border-slate-700 last:border-b-0',
            icon: 'w-4 h-4 text-red-400',
            text: 'font-medium',
        },
    },

    // Decorative elements
    decorative: {
        leftAccent:
            'absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-transparent',
        rightAccent:
            'absolute right-0 top-0 w-2 h-full bg-gradient-to-b from-purple-500 via-blue-500 to-transparent',
        bottomGlow:
            'absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent',
    },
} as const;
