/**
 * @constant INTERVENTION_FILTERS_STYLES
 * @description Styling classes for the InterventionFilters component using modern dark palette
 */
export const INTERVENTION_FILTERS_STYLES = {
    container: 'bg-slate-800 p-6 rounded-xl border border-slate-700 mb-8',
    header: 'flex justify-between items-center mb-6',
    title: 'text-xl font-semibold text-white',
    clearButton: 'text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200',
    filtersGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
    filterGroup: 'space-y-2',
    label: 'block text-sm font-medium text-slate-300',
    input: 'w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
    select: 'w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
} as const;
