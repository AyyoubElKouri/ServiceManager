/**
 * @constant STATISTICS_STYLES
 * @description Styling classes for the Statistics component using modern dark palette
 */
export const STATISTICS_STYLES = {
    container: 'min-h-screen bg-slate-900 p-6',
    content: 'max-w-7xl mx-auto',
    header: {
        container: 'mb-8',
        title: 'text-4xl font-bold text-white mb-2',
        subtitle: 'text-lg text-slate-400',
    },
    loading: {
        container: 'flex items-center justify-center min-h-96',
        spinner: 'animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500',
        text: 'text-slate-400 mt-4',
    },
    error: {
        container: 'text-center py-12',
        icon: 'text-6xl mb-4',
        title: 'text-2xl font-bold text-red-400 mb-2',
        message: 'text-slate-400 mb-6',
        button: 'px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors',
    },
    charts: {
        container: 'space-y-8',
        section: 'bg-slate-800 p-6 rounded-xl border border-slate-700',
        title: 'text-xl font-semibold text-white mb-4',
        grid: 'grid grid-cols-1 lg:grid-cols-2 gap-6',
        chartContainer: 'bg-slate-700 p-4 rounded-lg',
        table: {
            container: 'overflow-x-auto',
            table: 'w-full text-sm text-left text-slate-300',
            header: 'text-xs text-slate-400 uppercase bg-slate-700',
            headerCell: 'px-6 py-3',
            row: 'bg-slate-800 border-b border-slate-700 hover:bg-slate-750',
            cell: 'px-6 py-4',
        },
    },
} as const;
