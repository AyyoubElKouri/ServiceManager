import { useInterventionFilters } from './InterventionFilters.hook';
import { INTERVENTION_FILTERS_STYLES } from './InterventionFilters.styles';
import type { InterventionFiltersProps } from './InterventionFilters.types';

/**
 * @component InterventionFilters
 * @description Advanced filtering component for interventions
 *
 * @dependencies useInterventionFilters hook, InterventionFilters.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const InterventionFilters = (props: InterventionFiltersProps) => {
    const {
        filters,
        statusOptions,
        validatedOptions,
        maintenanceTypes,
        teams,
        handleFilterChange,
        handleClearFilters,
    } = useInterventionFilters(props);

    return (
        <div className={INTERVENTION_FILTERS_STYLES.container}>
            <div className={INTERVENTION_FILTERS_STYLES.header}>
                <h3 className={INTERVENTION_FILTERS_STYLES.title}>Filtres Avancés</h3>
                <button
                    onClick={handleClearFilters}
                    className={INTERVENTION_FILTERS_STYLES.clearButton}
                >
                    Effacer les filtres
                </button>
            </div>

            <div className={INTERVENTION_FILTERS_STYLES.filtersGrid}>
                {/* Search Term */}
                <div className={INTERVENTION_FILTERS_STYLES.filterGroup}>
                    <label className={INTERVENTION_FILTERS_STYLES.label}>Recherche</label>
                    <input
                        type="text"
                        value={filters.searchTerm}
                        onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                        placeholder="Référence, poste, équipe..."
                        className={INTERVENTION_FILTERS_STYLES.input}
                    />
                </div>

                {/* Date From */}
                <div className={INTERVENTION_FILTERS_STYLES.filterGroup}>
                    <label className={INTERVENTION_FILTERS_STYLES.label}>Date de début</label>
                    <input
                        type="date"
                        value={filters.dateFrom}
                        onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                        className={INTERVENTION_FILTERS_STYLES.input}
                    />
                </div>

                {/* Date To */}
                <div className={INTERVENTION_FILTERS_STYLES.filterGroup}>
                    <label className={INTERVENTION_FILTERS_STYLES.label}>Date de fin</label>
                    <input
                        type="date"
                        value={filters.dateTo}
                        onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                        className={INTERVENTION_FILTERS_STYLES.input}
                    />
                </div>

                {/* Team */}
                <div className={INTERVENTION_FILTERS_STYLES.filterGroup}>
                    <label className={INTERVENTION_FILTERS_STYLES.label}>Équipe</label>
                    <select
                        value={filters.team}
                        onChange={(e) => handleFilterChange('team', e.target.value)}
                        className={INTERVENTION_FILTERS_STYLES.select}
                    >
                        <option value="">Toutes les équipes</option>
                        {teams.map((team) => (
                            <option key={team} value={team}>
                                {team}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Maintenance Type */}
                <div className={INTERVENTION_FILTERS_STYLES.filterGroup}>
                    <label className={INTERVENTION_FILTERS_STYLES.label}>Type de maintenance</label>
                    <select
                        value={filters.maintenanceType}
                        onChange={(e) => handleFilterChange('maintenanceType', e.target.value)}
                        className={INTERVENTION_FILTERS_STYLES.select}
                    >
                        <option value="">Tous les types</option>
                        {maintenanceTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Status */}
                <div className={INTERVENTION_FILTERS_STYLES.filterGroup}>
                    <label className={INTERVENTION_FILTERS_STYLES.label}>Statut d'envoi</label>
                    <select
                        value={filters.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                        className={INTERVENTION_FILTERS_STYLES.select}
                    >
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default InterventionFilters;
