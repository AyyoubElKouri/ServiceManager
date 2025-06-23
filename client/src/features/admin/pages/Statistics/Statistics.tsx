import { useStatistics } from './Statistics.hook';
import { STATISTICS_STYLES } from './Statistics.styles';
import StatisticsFilters from './components/StatisticsFilters';
import StatisticsOverview from './components/StatisticsOverview';
import { getMaintenanceTypeLabel } from './files/Statistics.util';

/**
 * @component Statistics
 * @description Comprehensive statistics page for admin dashboard
 *
 * @dependencies useStatistics hook, Statistics.styles, StatisticsFilters, StatisticsOverview
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const Statistics = () => {
    const {
        interventions,
        statisticsData,
        loading,
        error,
        filters,
        uniqueTeams,
        uniqueSections,
        uniqueMaintenanceTypes,
        handleFiltersChange,
        handleRetry,
    } = useStatistics();

    if (loading) {
        return (
            <div className={STATISTICS_STYLES.container}>
                <div className={STATISTICS_STYLES.content}>
                    <div className={STATISTICS_STYLES.loading.container}>
                        <div>
                            <div className={STATISTICS_STYLES.loading.spinner}></div>
                            <p className={STATISTICS_STYLES.loading.text}>
                                Chargement des statistiques...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={STATISTICS_STYLES.container}>
                <div className={STATISTICS_STYLES.content}>
                    <div className={STATISTICS_STYLES.error.container}>
                        <div className={STATISTICS_STYLES.error.icon}>⚠️</div>
                        <h2 className={STATISTICS_STYLES.error.title}>Erreur de chargement</h2>
                        <p className={STATISTICS_STYLES.error.message}>{error}</p>
                        <button onClick={handleRetry} className={STATISTICS_STYLES.error.button}>
                            Réessayer
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!statisticsData) {
        return (
            <div className={STATISTICS_STYLES.container}>
                <div className={STATISTICS_STYLES.content}>
                    <div className={STATISTICS_STYLES.header.container}>
                        <h1 className={STATISTICS_STYLES.header.title}>Statistiques</h1>
                        <p className={STATISTICS_STYLES.header.subtitle}>
                            Analyses détaillées des interventions
                        </p>
                    </div>

                    <StatisticsFilters
                        filters={filters}
                        onFiltersChange={handleFiltersChange}
                        teams={uniqueTeams}
                        sections={uniqueSections}
                        maintenanceTypes={uniqueMaintenanceTypes}
                    />

                    <div className={STATISTICS_STYLES.error.container}>
                        <div className={STATISTICS_STYLES.error.icon}>📊</div>
                        <h2 className={STATISTICS_STYLES.error.title}>Aucune donnée</h2>
                        <p className={STATISTICS_STYLES.error.message}>
                            Aucune intervention trouvée avec les filtres actuels
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={STATISTICS_STYLES.container}>
            <div className={STATISTICS_STYLES.content}>
                <div className={STATISTICS_STYLES.header.container}>
                    <h1 className={STATISTICS_STYLES.header.title}>Statistiques</h1>
                    <p className={STATISTICS_STYLES.header.subtitle}>
                        Analyses détaillées des interventions ({interventions.length} interventions)
                    </p>
                </div>

                <StatisticsFilters
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    teams={uniqueTeams}
                    sections={uniqueSections}
                    maintenanceTypes={uniqueMaintenanceTypes}
                />

                <StatisticsOverview stats={statisticsData.overview} />

                <div className={STATISTICS_STYLES.charts.container}>
                    {/* Maintenance Type Statistics */}
                    <div className={STATISTICS_STYLES.charts.section}>
                        <h3 className={STATISTICS_STYLES.charts.title}>
                            Statistiques par Type de Maintenance
                        </h3>
                        <div className={STATISTICS_STYLES.charts.table.container}>
                            <table className={STATISTICS_STYLES.charts.table.table}>
                                <thead className={STATISTICS_STYLES.charts.table.header}>
                                    <tr>
                                        <th className={STATISTICS_STYLES.charts.table.headerCell}>
                                            Type
                                        </th>
                                        <th className={STATISTICS_STYLES.charts.table.headerCell}>
                                            Total
                                        </th>
                                        <th className={STATISTICS_STYLES.charts.table.headerCell}>
                                            Validées
                                        </th>
                                        <th className={STATISTICS_STYLES.charts.table.headerCell}>
                                            Pourcentage
                                        </th>
                                        <th className={STATISTICS_STYLES.charts.table.headerCell}>
                                            Durée Moyenne
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {statisticsData.byMaintenanceType.map((stat, index) => (
                                        <tr
                                            key={index}
                                            className={STATISTICS_STYLES.charts.table.row}
                                        >
                                            <td className={STATISTICS_STYLES.charts.table.cell}>
                                                {getMaintenanceTypeLabel(stat.type)}
                                            </td>
                                            <td className={STATISTICS_STYLES.charts.table.cell}>
                                                {stat.count}
                                            </td>
                                            <td className={STATISTICS_STYLES.charts.table.cell}>
                                                {stat.validated}
                                            </td>
                                            <td className={STATISTICS_STYLES.charts.table.cell}>
                                                {stat.percentage}%
                                            </td>
                                            <td className={STATISTICS_STYLES.charts.table.cell}>
                                                {stat.averageDuration}h
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Team Statistics */}
                    <div className={STATISTICS_STYLES.charts.section}>
                        <h3 className={STATISTICS_STYLES.charts.title}>Statistiques par Équipe</h3>
                        <div className={STATISTICS_STYLES.charts.table.container}>
                            <table className={STATISTICS_STYLES.charts.table.table}>
                                <thead className={STATISTICS_STYLES.charts.table.header}>
                                    <tr>
                                        <th className={STATISTICS_STYLES.charts.table.headerCell}>
                                            Équipe
                                        </th>
                                        <th className={STATISTICS_STYLES.charts.table.headerCell}>
                                            Total
                                        </th>
                                        <th className={STATISTICS_STYLES.charts.table.headerCell}>
                                            Validées
                                        </th>
                                        <th className={STATISTICS_STYLES.charts.table.headerCell}>
                                            Heures Total
                                        </th>
                                        <th className={STATISTICS_STYLES.charts.table.headerCell}>
                                            Durée Moyenne
                                        </th>
                                        <th className={STATISTICS_STYLES.charts.table.headerCell}>
                                            Taux Completion
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {statisticsData.byTeam.map((stat, index) => (
                                        <tr
                                            key={index}
                                            className={STATISTICS_STYLES.charts.table.row}
                                        >
                                            <td className={STATISTICS_STYLES.charts.table.cell}>
                                                {stat.team}
                                            </td>
                                            <td className={STATISTICS_STYLES.charts.table.cell}>
                                                {stat.count}
                                            </td>
                                            <td className={STATISTICS_STYLES.charts.table.cell}>
                                                {stat.validated}
                                            </td>
                                            <td className={STATISTICS_STYLES.charts.table.cell}>
                                                {stat.totalHours}h
                                            </td>
                                            <td className={STATISTICS_STYLES.charts.table.cell}>
                                                {stat.averageDuration}h
                                            </td>
                                            <td className={STATISTICS_STYLES.charts.table.cell}>
                                                {stat.completionRate}%
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Section Statistics */}
                    <div className={STATISTICS_STYLES.charts.section}>
                        <h3 className={STATISTICS_STYLES.charts.title}>Statistiques par Section</h3>
                        <div className={STATISTICS_STYLES.charts.table.container}>
                            <table className={STATISTICS_STYLES.charts.table.table}>
                                <thead className={STATISTICS_STYLES.charts.table.header}>
                                    <tr>
                                        <th className={STATISTICS_STYLES.charts.table.headerCell}>
                                            Section
                                        </th>
                                        <th className={STATISTICS_STYLES.charts.table.headerCell}>
                                            Total
                                        </th>
                                        <th className={STATISTICS_STYLES.charts.table.headerCell}>
                                            Validées
                                        </th>
                                        <th className={STATISTICS_STYLES.charts.table.headerCell}>
                                            Pourcentage
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {statisticsData.bySection.map((stat, index) => (
                                        <tr
                                            key={index}
                                            className={STATISTICS_STYLES.charts.table.row}
                                        >
                                            <td className={STATISTICS_STYLES.charts.table.cell}>
                                                {stat.section}
                                            </td>
                                            <td className={STATISTICS_STYLES.charts.table.cell}>
                                                {stat.count}
                                            </td>
                                            <td className={STATISTICS_STYLES.charts.table.cell}>
                                                {stat.validated}
                                            </td>
                                            <td className={STATISTICS_STYLES.charts.table.cell}>
                                                {stat.percentage}%
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Monthly Statistics */}
                    <div className={STATISTICS_STYLES.charts.section}>
                        <h3 className={STATISTICS_STYLES.charts.title}>Statistiques Mensuelles</h3>
                        <div className={STATISTICS_STYLES.charts.table.container}>
                            <table className={STATISTICS_STYLES.charts.table.table}>
                                <thead className={STATISTICS_STYLES.charts.table.header}>
                                    <tr>
                                        <th className={STATISTICS_STYLES.charts.table.headerCell}>
                                            Mois
                                        </th>
                                        <th className={STATISTICS_STYLES.charts.table.headerCell}>
                                            Total
                                        </th>
                                        <th className={STATISTICS_STYLES.charts.table.headerCell}>
                                            Validées
                                        </th>
                                        <th className={STATISTICS_STYLES.charts.table.headerCell}>
                                            Heures Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {statisticsData.byMonth.map((stat, index) => (
                                        <tr
                                            key={index}
                                            className={STATISTICS_STYLES.charts.table.row}
                                        >
                                            <td className={STATISTICS_STYLES.charts.table.cell}>
                                                {stat.month}
                                            </td>
                                            <td className={STATISTICS_STYLES.charts.table.cell}>
                                                {stat.count}
                                            </td>
                                            <td className={STATISTICS_STYLES.charts.table.cell}>
                                                {stat.validated}
                                            </td>
                                            <td className={STATISTICS_STYLES.charts.table.cell}>
                                                {stat.totalHours}h
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className={STATISTICS_STYLES.charts.section}>
                        <h3 className={STATISTICS_STYLES.charts.title}>Métriques de Performance</h3>
                        <div className={STATISTICS_STYLES.charts.grid}>
                            <div className={STATISTICS_STYLES.charts.chartContainer}>
                                <h4 className="text-white font-semibold mb-2">
                                    Intervention la plus rapide
                                </h4>
                                <p className="text-2xl font-bold text-green-400">
                                    {statisticsData.performance.fastestIntervention}h
                                </p>
                            </div>
                            <div className={STATISTICS_STYLES.charts.chartContainer}>
                                <h4 className="text-white font-semibold mb-2">
                                    Intervention la plus lente
                                </h4>
                                <p className="text-2xl font-bold text-red-400">
                                    {statisticsData.performance.slowestIntervention}h
                                </p>
                            </div>
                            <div className={STATISTICS_STYLES.charts.chartContainer}>
                                <h4 className="text-white font-semibold mb-2">
                                    Équipe la plus productive
                                </h4>
                                <p className="text-2xl font-bold text-blue-400">
                                    {statisticsData.performance.mostProductiveTeam}
                                </p>
                            </div>
                            <div className={STATISTICS_STYLES.charts.chartContainer}>
                                <h4 className="text-white font-semibold mb-2">
                                    Section la plus active
                                </h4>
                                <p className="text-2xl font-bold text-purple-400">
                                    {statisticsData.performance.mostActiveSection}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Status Statistics */}
                    <div className={STATISTICS_STYLES.charts.section}>
                        <h3 className={STATISTICS_STYLES.charts.title}>Statistiques de Statut</h3>
                        <div className={STATISTICS_STYLES.charts.grid}>
                            <div className={STATISTICS_STYLES.charts.chartContainer}>
                                <h4 className="text-white font-semibold mb-2">Statut Actif</h4>
                                <p className="text-2xl font-bold text-green-400">
                                    {statisticsData.byStatus.active}
                                </p>
                            </div>
                            <div className={STATISTICS_STYLES.charts.chartContainer}>
                                <h4 className="text-white font-semibold mb-2">Statut Inactif</h4>
                                <p className="text-2xl font-bold text-red-400">
                                    {statisticsData.byStatus.inactive}
                                </p>
                            </div>
                            <div className={STATISTICS_STYLES.charts.chartContainer}>
                                <h4 className="text-white font-semibold mb-2">
                                    Avec Planification
                                </h4>
                                <p className="text-2xl font-bold text-blue-400">
                                    {statisticsData.byStatus.withPlanification}
                                </p>
                            </div>
                            <div className={STATISTICS_STYLES.charts.chartContainer}>
                                <h4 className="text-white font-semibold mb-2">Avec Réception</h4>
                                <p className="text-2xl font-bold text-purple-400">
                                    {statisticsData.byStatus.withReception}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
