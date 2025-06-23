/**
 * @constant INTERVENTIONS_STYLES
 * @description Styling classes for the Interventions page using modern dark palette
 */
export const INTERVENTIONS_STYLES = {
    container: 'min-h-screen bg-slate-900 p-4 md:p-6',

    // Header
    header: 'mb-8 text-center md:text-left',
    title: 'text-3xl md:text-4xl font-bold text-white mb-2',
    subtitle: 'text-slate-400 text-lg',

    // Filters
    filtersContainer: 'bg-slate-800 p-4 md:p-6 rounded-xl border border-slate-700 mb-8 shadow-lg',
    filtersHeader:
        'flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4',
    filtersTitle: 'text-xl font-semibold text-white',
    clearButton:
        'px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200 text-sm',
    filtersGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4',
    filterGroup: 'space-y-2',
    label: 'block text-sm font-medium text-slate-300',
    input: 'w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
    select: 'w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',

    // Stats
    statsContainer: 'grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8',
    statCard:
        'bg-gradient-to-br from-slate-800 to-slate-900 p-4 md:p-6 rounded-xl border border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300',
    statIcon: 'text-2xl md:text-3xl mb-2',
    statValue: 'text-xl md:text-2xl font-bold text-white mb-1',
    statLabel: 'text-slate-400 text-xs md:text-sm',

    // Cards Grid
    cardsContainer: 'space-y-6',
    cardsGrid: 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6',

    // Intervention Card
    card: 'bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 shadow-lg hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 overflow-hidden',
    cardHeader: 'bg-slate-700/50 p-4 border-b border-slate-600',
    cardHeaderTop: 'flex justify-between items-start mb-2',
    cardId: 'text-xl font-bold text-blue-400',
    cardDate: 'text-sm text-slate-400',
    cardReference: 'text-lg font-semibold text-white',
    cardTeam: 'text-sm text-slate-300 bg-slate-600 px-2 py-1 rounded-full inline-block',

    cardBody: 'p-4 space-y-4',

    // Field sections
    fieldSection: 'grid grid-cols-1 md:grid-cols-2 gap-3',
    fieldGroup: 'space-y-2',
    fieldRow: 'flex justify-between items-center py-1',
    fieldLabel: 'text-sm font-medium text-slate-400',
    fieldValue: 'text-sm text-white font-medium',

    // Special fields
    postSection: 'bg-slate-700/30 p-3 rounded-lg',
    postLabel: 'text-xs font-medium text-slate-400 uppercase tracking-wide mb-1',
    postValue: 'text-base font-semibold text-white',

    timeSection: 'bg-slate-700/30 p-3 rounded-lg',
    timeLabel: 'text-xs font-medium text-slate-400 uppercase tracking-wide mb-2',
    timeRange: 'flex items-center justify-between',
    timeValue: 'text-sm font-mono text-blue-400',
    timeArrow: 'text-slate-500 mx-2',

    workOrderSection: 'grid grid-cols-2 gap-3',
    workOrderItem: 'bg-slate-700/30 p-3 rounded-lg text-center',
    workOrderLabel: 'text-xs font-medium text-slate-400 uppercase tracking-wide mb-1',
    workOrderValue: 'text-lg font-bold text-white',

    // Comment section
    commentSection: 'bg-slate-700/30 p-3 rounded-lg',
    commentLabel: 'text-xs font-medium text-slate-400 uppercase tracking-wide mb-2',
    commentText: 'text-sm text-slate-200 leading-relaxed',

    // Badges
    badge: {
        base: 'px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide',
        active: 'bg-green-500/20 text-green-400 border border-green-500/30',
        inactive: 'bg-red-500/20 text-red-400 border border-red-500/30',
        true: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
        false: 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
        maintenance: {
            coperative: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
            preventive: 'bg-green-500/20 text-green-400 border border-green-500/30',
            corrective: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
            urgente: 'bg-red-500/20 text-red-400 border border-red-500/30',
        },
    },

    // Card footer
    cardFooter: 'bg-slate-700/30 p-4 border-t border-slate-600',
    footerGrid: 'grid grid-cols-2 gap-4',
    footerItem: 'text-center',
    footerLabel: 'text-xs font-medium text-slate-400 uppercase tracking-wide mb-1',
    footerValue: 'text-sm font-semibold text-white',

    // Loading and error states
    loadingContainer: 'flex items-center justify-center py-20',
    loadingSpinner: 'animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mr-4',
    loadingText: 'text-slate-400 text-lg',
    errorContainer: 'bg-red-900/20 border border-red-500/30 rounded-xl p-8 text-center shadow-lg',
    errorIcon: 'text-4xl mb-4 text-red-400',
    errorText: 'text-red-400 text-xl font-semibold mb-2',
    errorSubtext: 'text-slate-400',

    // No data
    noDataContainer: 'text-center py-20',
    noDataIcon: 'text-8xl mb-6 text-slate-600',
    noDataText: 'text-slate-400 text-xl font-medium mb-2',
    noDataSubtext: 'text-slate-500',

    // Results header
    resultsHeader: 'flex justify-between items-center mb-6',
    resultsTitle: 'text-xl font-semibold text-white',
    resultsCount: 'text-sm text-slate-400',
} as const;
