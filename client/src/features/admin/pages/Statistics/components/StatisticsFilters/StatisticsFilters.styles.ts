/**
 * @constant STATISTICS_FILTERS_STYLES
 * @description Styling classes for the StatisticsFilters component using modern dark palette
 */
export const STATISTICS_FILTERS_STYLES = {
    container: 'bg-slate-800 p-6 rounded-xl border border-slate-700 mb-8',
    title: 'text-xl font-semibold text-white mb-4',
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4',
    field: {
        container: 'space-y-2',
        label: 'block text-sm font-medium text-slate-300',
        input: 'w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
        select: 'w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
    },
} as const;
