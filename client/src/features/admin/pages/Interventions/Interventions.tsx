import { useInterventions } from './files/Interventions.hook';
import { INTERVENTIONS_STYLES } from './files/Interventions.styles';
import { INTERVENTIONS_CONSTANTS } from './files/Interventions.constants';
import { formatDate, formatTime, getMaintenanceTypeLabel } from './files/Interventions.util';
import type { InterventionsProps } from './files/Interventions.types';

/**
 * @component Interventions
 * @description Admin page for viewing all validated interventions
 *
 * @dependencies useInterventions hook, Interventions.styles, Interventions.constants
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const Interventions = (props: InterventionsProps) => {
    const {
        interventions,
        loading,
        error,
        statistics,
        filters,
        uniqueTeams,
        uniqueMaintenanceTypes,
        uniqueSections,
        handleFilterChange,
        clearFilters,
    } = useInterventions(props);

    if (loading) {
        return (
            <div className={INTERVENTIONS_STYLES.container}>
                <div className={INTERVENTIONS_STYLES.loadingContainer}>
                    <div className={INTERVENTIONS_STYLES.loadingSpinner}></div>
                    <div className={INTERVENTIONS_STYLES.loadingText}>
                        Chargement des interventions...
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={INTERVENTIONS_STYLES.container}>
                <div className={INTERVENTIONS_STYLES.errorContainer}>
                    <div className={INTERVENTIONS_STYLES.errorIcon}>⚠️</div>
                    <div className={INTERVENTIONS_STYLES.errorText}>Erreur</div>
                    <div className={INTERVENTIONS_STYLES.errorSubtext}>{error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className={INTERVENTIONS_STYLES.container}>
            {/* Header */}
            <div className={INTERVENTIONS_STYLES.header}>
                <h1 className={INTERVENTIONS_STYLES.title}>Gestion des Interventions</h1>
                <p className={INTERVENTIONS_STYLES.subtitle}>
                    Toutes les interventions du système (triées par date de création)
                </p>
            </div>

            {/* Statistics */}
            <div className={INTERVENTIONS_STYLES.statsContainer}>
                <div className={INTERVENTIONS_STYLES.statCard}>
                    <div className={INTERVENTIONS_STYLES.statIcon}>📋</div>
                    <div className={INTERVENTIONS_STYLES.statValue}>{statistics.total}</div>
                    <div className={INTERVENTIONS_STYLES.statLabel}>Total Interventions</div>
                </div>
                <div className={INTERVENTIONS_STYLES.statCard}>
                    <div className={INTERVENTIONS_STYLES.statIcon}>✅</div>
                    <div className={INTERVENTIONS_STYLES.statValue}>{statistics.validated}</div>
                    <div className={INTERVENTIONS_STYLES.statLabel}>Interventions Validées</div>
                </div>
                <div className={INTERVENTIONS_STYLES.statCard}>
                    <div className={INTERVENTIONS_STYLES.statIcon}>🔄</div>
                    <div className={INTERVENTIONS_STYLES.statValue}>{statistics.active}</div>
                    <div className={INTERVENTIONS_STYLES.statLabel}>Interventions Actives</div>
                </div>
                <div className={INTERVENTIONS_STYLES.statCard}>
                    <div className={INTERVENTIONS_STYLES.statIcon}>👥</div>
                    <div className={INTERVENTIONS_STYLES.statValue}>{statistics.teams}</div>
                    <div className={INTERVENTIONS_STYLES.statLabel}>Équipes</div>
                </div>
            </div>

            {/* Filters */}
            <div className={INTERVENTIONS_STYLES.filtersContainer}>
                <div className={INTERVENTIONS_STYLES.filtersHeader}>
                    <h3 className={INTERVENTIONS_STYLES.filtersTitle}>🔍 Filtres Avancés</h3>
                    <button onClick={clearFilters} className={INTERVENTIONS_STYLES.clearButton}>
                        🗑️ Effacer les filtres
                    </button>
                </div>

                <div className={INTERVENTIONS_STYLES.filtersGrid}>
                    {/* Search */}
                    <div className={INTERVENTIONS_STYLES.filterGroup}>
                        <label className={INTERVENTIONS_STYLES.label}>🔍 Recherche globale</label>
                        <input
                            type="text"
                            value={filters.searchTerm}
                            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                            placeholder="ID, référence, poste, équipe, commentaire..."
                            className={INTERVENTIONS_STYLES.input}
                        />
                    </div>

                    {/* Date From */}
                    <div className={INTERVENTIONS_STYLES.filterGroup}>
                        <label className={INTERVENTIONS_STYLES.label}>📅 Date de début</label>
                        <input
                            type="date"
                            value={filters.dateFrom}
                            onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                            className={INTERVENTIONS_STYLES.input}
                        />
                    </div>

                    {/* Date To */}
                    <div className={INTERVENTIONS_STYLES.filterGroup}>
                        <label className={INTERVENTIONS_STYLES.label}>📅 Date de fin</label>
                        <input
                            type="date"
                            value={filters.dateTo}
                            onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                            className={INTERVENTIONS_STYLES.input}
                        />
                    </div>

                    {/* Team */}
                    <div className={INTERVENTIONS_STYLES.filterGroup}>
                        <label className={INTERVENTIONS_STYLES.label}>👥 Équipe</label>
                        <select
                            value={filters.team}
                            onChange={(e) => handleFilterChange('team', e.target.value)}
                            className={INTERVENTIONS_STYLES.select}
                        >
                            <option value="all">Toutes les équipes</option>
                            {uniqueTeams.map((team) => (
                                <option key={team} value={team}>
                                    {team}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Maintenance Type */}
                    <div className={INTERVENTIONS_STYLES.filterGroup}>
                        <label className={INTERVENTIONS_STYLES.label}>🔧 Type de maintenance</label>
                        <select
                            value={filters.maintenanceType}
                            onChange={(e) => handleFilterChange('maintenanceType', e.target.value)}
                            className={INTERVENTIONS_STYLES.select}
                        >
                            <option value="all">Tous les types</option>
                            {uniqueMaintenanceTypes.map((type) => (
                                <option key={type} value={type}>
                                    {getMaintenanceTypeLabel(type)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Section */}
                    <div className={INTERVENTIONS_STYLES.filterGroup}>
                        <label className={INTERVENTIONS_STYLES.label}>🏢 Section</label>
                        <select
                            value={filters.section}
                            onChange={(e) => handleFilterChange('section', e.target.value)}
                            className={INTERVENTIONS_STYLES.select}
                        >
                            <option value="all">Toutes les sections</option>
                            {uniqueSections.map((section) => (
                                <option key={section} value={section}>
                                    {section}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className={INTERVENTIONS_STYLES.cardsContainer}>
                <div className={INTERVENTIONS_STYLES.resultsHeader}>
                    <h3 className={INTERVENTIONS_STYLES.resultsTitle}>📋 Interventions</h3>
                    <span className={INTERVENTIONS_STYLES.resultsCount}>
                        {interventions.length} résultat{interventions.length !== 1 ? 's' : ''}
                    </span>
                </div>

                {interventions.length === 0 ? (
                    <div className={INTERVENTIONS_STYLES.noDataContainer}>
                        <div className={INTERVENTIONS_STYLES.noDataIcon}>📋</div>
                        <div className={INTERVENTIONS_STYLES.noDataText}>
                            Aucune intervention trouvée
                        </div>
                        <div className={INTERVENTIONS_STYLES.noDataSubtext}>
                            Essayez de modifier vos filtres pour voir plus de résultats
                        </div>
                    </div>
                ) : (
                    <div className={INTERVENTIONS_STYLES.cardsGrid}>
                        {interventions.map((intervention) => {
                            const maintenanceTypeKey =
                                intervention.maintenance_type as keyof typeof INTERVENTIONS_STYLES.badge.maintenance;

                            return (
                                <div
                                    key={intervention.intervention_id}
                                    className={INTERVENTIONS_STYLES.card}
                                >
                                    {/* Card Header */}
                                    <div className={INTERVENTIONS_STYLES.cardHeader}>
                                        <div className={INTERVENTIONS_STYLES.cardHeaderTop}>
                                            <span className={INTERVENTIONS_STYLES.cardId}>
                                                #{intervention.intervention_id}
                                            </span>
                                            <span className={INTERVENTIONS_STYLES.cardDate}>
                                                {formatDate(intervention.date)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <h4 className={INTERVENTIONS_STYLES.cardReference}>
                                                {intervention.reference}
                                            </h4>
                                            <span className={INTERVENTIONS_STYLES.cardTeam}>
                                                {intervention.team}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className={INTERVENTIONS_STYLES.cardBody}>
                                        {/* Poste */}
                                        <div className={INTERVENTIONS_STYLES.postSection}>
                                            <div className={INTERVENTIONS_STYLES.postLabel}>
                                                Poste
                                            </div>
                                            <div className={INTERVENTIONS_STYLES.postValue}>
                                                {intervention.post}
                                            </div>
                                        </div>

                                        {/* Section and Maintenance Type */}
                                        <div className={INTERVENTIONS_STYLES.fieldSection}>
                                            <div className={INTERVENTIONS_STYLES.fieldGroup}>
                                                <div className={INTERVENTIONS_STYLES.fieldRow}>
                                                    <span
                                                        className={INTERVENTIONS_STYLES.fieldLabel}
                                                    >
                                                        Section:
                                                    </span>
                                                    <span
                                                        className={INTERVENTIONS_STYLES.fieldValue}
                                                    >
                                                        {intervention.section.name}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={INTERVENTIONS_STYLES.fieldGroup}>
                                                <div className={INTERVENTIONS_STYLES.fieldRow}>
                                                    <span
                                                        className={INTERVENTIONS_STYLES.fieldLabel}
                                                    >
                                                        Type:
                                                    </span>
                                                    <span
                                                        className={`${
                                                            INTERVENTIONS_STYLES.badge.base
                                                        } ${
                                                            INTERVENTIONS_STYLES.badge.maintenance[
                                                                maintenanceTypeKey
                                                            ] ||
                                                            INTERVENTIONS_STYLES.badge.maintenance
                                                                .corrective
                                                        }`}
                                                    >
                                                        {getMaintenanceTypeLabel(
                                                            intervention.maintenance_type,
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Work Orders */}
                                        <div className={INTERVENTIONS_STYLES.workOrderSection}>
                                            <div className={INTERVENTIONS_STYLES.workOrderItem}>
                                                <div
                                                    className={INTERVENTIONS_STYLES.workOrderLabel}
                                                >
                                                    N° Ordre
                                                </div>
                                                <div
                                                    className={INTERVENTIONS_STYLES.workOrderValue}
                                                >
                                                    {intervention.work_order_number}
                                                </div>
                                            </div>
                                            <div className={INTERVENTIONS_STYLES.workOrderItem}>
                                                <div
                                                    className={INTERVENTIONS_STYLES.workOrderLabel}
                                                >
                                                    N° Autorisation
                                                </div>
                                                <div
                                                    className={INTERVENTIONS_STYLES.workOrderValue}
                                                >
                                                    {intervention.work_autorisation_number}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Time Range */}
                                        <div className={INTERVENTIONS_STYLES.timeSection}>
                                            <div className={INTERVENTIONS_STYLES.timeLabel}>
                                                Horaires
                                            </div>
                                            <div className={INTERVENTIONS_STYLES.timeRange}>
                                                <span className={INTERVENTIONS_STYLES.timeValue}>
                                                    {formatTime(intervention.start_time)}
                                                </span>
                                                <span className={INTERVENTIONS_STYLES.timeArrow}>
                                                    →
                                                </span>
                                                <span className={INTERVENTIONS_STYLES.timeValue}>
                                                    {formatTime(intervention.end_time)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Status Badges - All 4 badges in a grid */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className={INTERVENTIONS_STYLES.fieldRow}>
                                                <span className={INTERVENTIONS_STYLES.fieldLabel}>
                                                    Statut:
                                                </span>
                                                <span
                                                    className={`${
                                                        INTERVENTIONS_STYLES.badge.base
                                                    } ${
                                                        intervention.status
                                                            ? INTERVENTIONS_STYLES.badge.active
                                                            : INTERVENTIONS_STYLES.badge.inactive
                                                    }`}
                                                >
                                                    {intervention.status ? 'Actif' : 'Inactif'}
                                                </span>
                                            </div>
                                            <div className={INTERVENTIONS_STYLES.fieldRow}>
                                                <span className={INTERVENTIONS_STYLES.fieldLabel}>
                                                    Validé:
                                                </span>
                                                <span
                                                    className={`${
                                                        INTERVENTIONS_STYLES.badge.base
                                                    } ${
                                                        intervention.validate
                                                            ? INTERVENTIONS_STYLES.badge.true
                                                            : INTERVENTIONS_STYLES.badge.false
                                                    }`}
                                                >
                                                    {intervention.validate ? 'Oui' : 'Non'}
                                                </span>
                                            </div>
                                            <div className={INTERVENTIONS_STYLES.fieldRow}>
                                                <span className={INTERVENTIONS_STYLES.fieldLabel}>
                                                    Planification:
                                                </span>
                                                <span
                                                    className={`${
                                                        INTERVENTIONS_STYLES.badge.base
                                                    } ${
                                                        intervention.planification
                                                            ? INTERVENTIONS_STYLES.badge.true
                                                            : INTERVENTIONS_STYLES.badge.false
                                                    }`}
                                                >
                                                    {intervention.planification ? 'Oui' : 'Non'}
                                                </span>
                                            </div>
                                            <div className={INTERVENTIONS_STYLES.fieldRow}>
                                                <span className={INTERVENTIONS_STYLES.fieldLabel}>
                                                    Réception:
                                                </span>
                                                <span
                                                    className={`${
                                                        INTERVENTIONS_STYLES.badge.base
                                                    } ${
                                                        intervention.reception
                                                            ? INTERVENTIONS_STYLES.badge.true
                                                            : INTERVENTIONS_STYLES.badge.false
                                                    }`}
                                                >
                                                    {intervention.reception ? 'Oui' : 'Non'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Comment */}
                                        {intervention.comment && (
                                            <div className={INTERVENTIONS_STYLES.commentSection}>
                                                <div className={INTERVENTIONS_STYLES.commentLabel}>
                                                    Commentaire
                                                </div>
                                                <div className={INTERVENTIONS_STYLES.commentText}>
                                                    {intervention.comment}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Card Footer - Enhanced with more info */}
                                    <div className={INTERVENTIONS_STYLES.cardFooter}>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className={INTERVENTIONS_STYLES.footerItem}>
                                                <div className={INTERVENTIONS_STYLES.footerLabel}>
                                                    Utilisateur
                                                </div>
                                                <div className={INTERVENTIONS_STYLES.footerValue}>
                                                    #{intervention.user_id}
                                                </div>
                                            </div>
                                            <div className={INTERVENTIONS_STYLES.footerItem}>
                                                <div className={INTERVENTIONS_STYLES.footerLabel}>
                                                    Section ID
                                                </div>
                                                <div className={INTERVENTIONS_STYLES.footerValue}>
                                                    #{intervention.section_id}
                                                </div>
                                            </div>
                                            <div className={INTERVENTIONS_STYLES.footerItem}>
                                                <div className={INTERVENTIONS_STYLES.footerLabel}>
                                                    Créé le
                                                </div>
                                                <div className={INTERVENTIONS_STYLES.footerValue}>
                                                    {formatDate(intervention.createdAt)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Interventions;
