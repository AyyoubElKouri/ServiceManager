import { useStatisticsFilters } from './StatisticsFilters.hook';
import { STATISTICS_FILTERS_STYLES } from './StatisticsFilters.styles';
import type { StatisticsFiltersProps } from './StatisticsFilters.types';
import { getMaintenanceTypeLabel } from '../../files/Statistics.util';

/**
 * @component StatisticsFilters
 * @description Filters component for statistics page
 *
 * @dependencies useStatisticsFilters hook, StatisticsFilters.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const StatisticsFilters = (props: StatisticsFiltersProps) => {
    const { filters, handleFilterChange, teams, sections, maintenanceTypes } =
        useStatisticsFilters(props);

    return (
        <div className={STATISTICS_FILTERS_STYLES.container}>
            <h2 className={STATISTICS_FILTERS_STYLES.title}>Filtres</h2>
            <div className={STATISTICS_FILTERS_STYLES.grid}>
                <div className={STATISTICS_FILTERS_STYLES.field.container}>
                    <label className={STATISTICS_FILTERS_STYLES.field.label}>Date de début</label>
                    <input
                        type="date"
                        value={filters.dateFrom}
                        onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                        className={STATISTICS_FILTERS_STYLES.field.input}
                    />
                </div>

                <div className={STATISTICS_FILTERS_STYLES.field.container}>
                    <label className={STATISTICS_FILTERS_STYLES.field.label}>Date de fin</label>
                    <input
                        type="date"
                        value={filters.dateTo}
                        onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                        className={STATISTICS_FILTERS_STYLES.field.input}
                    />
                </div>

                <div className={STATISTICS_FILTERS_STYLES.field.container}>
                    <label className={STATISTICS_FILTERS_STYLES.field.label}>Équipe</label>
                    <select
                        value={filters.team}
                        onChange={(e) => handleFilterChange('team', e.target.value)}
                        className={STATISTICS_FILTERS_STYLES.field.select}
                    >
                        <option value="all">Toutes les équipes</option>
                        {teams.map((team) => (
                            <option key={team} value={team}>
                                {team}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={STATISTICS_FILTERS_STYLES.field.container}>
                    <label className={STATISTICS_FILTERS_STYLES.field.label}>Section</label>
                    <select
                        value={filters.section}
                        onChange={(e) => handleFilterChange('section', e.target.value)}
                        className={STATISTICS_FILTERS_STYLES.field.select}
                    >
                        <option value="all">Toutes les sections</option>
                        {sections.map((section) => (
                            <option key={section} value={section}>
                                {section}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={STATISTICS_FILTERS_STYLES.field.container}>
                    <label className={STATISTICS_FILTERS_STYLES.field.label}>
                        Type de maintenance
                    </label>
                    <select
                        value={filters.maintenanceType}
                        onChange={(e) => handleFilterChange('maintenanceType', e.target.value)}
                        className={STATISTICS_FILTERS_STYLES.field.select}
                    >
                        <option value="all">Tous les types</option>
                        {maintenanceTypes.map((type) => (
                            <option key={type} value={type}>
                                {getMaintenanceTypeLabel(type)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default StatisticsFilters;
