/**
 * @constant DASHBOARD_STATS_STYLES
 * @description Styling classes for the DashboardStats component using modern dark palette
 */
export const DASHBOARD_STATS_STYLES = {
    container: 'mb-8',
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6',
    card: {
        container:
            'bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10',
        header: 'flex items-center justify-between mb-4',
        icon: 'text-3xl',
        value: 'text-3xl font-bold text-white',
        footer: 'space-y-1',
        title: 'text-sm font-semibold text-blue-300',
        description: 'text-xs text-slate-400',
    },
} as const;
