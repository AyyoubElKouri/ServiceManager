import { useUserDashboard } from './files/UserDashboard.hook';
import { USER_DASHBOARD_STYLES } from './files/UserDashboard.styles';
import type { UserDashboardProps } from './files/UserDashboard.types';

// Import components
import UserHeader from '../../shared/components/UserHeader';
import DashboardStats from './components/DashboardStats';
import InterventionFilters from './components/InterventionFilters';
import InterventionCard from './components/InterventionCard';
import CreateInterventionModal from './components/CreateInterventionModal';
import EditInterventionModal from './components/EditInterventionModal';

/**
 * @component UserDashboard
 * @description Main dashboard page for authenticated users displaying interventions with statistics and management capabilities
 *
 * @dependencies useUserDashboard hook, UserHeader, dashboard components
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const UserDashboard = (props: UserDashboardProps) => {
    const {
        // Data
        interventions,
        filteredInterventions,
        statistics,
        isLoading,
        error,
        user,

        // Filter state
        filters,
        handleFilterChange,
        clearFilters,

        // Modal state
        showCreateModal,
        showEditModal,
        editingIntervention,

        // Actions
        handleCreateIntervention,
        handleEditIntervention,
        handleSendIntervention,
        handleCloseCreateModal,
        handleCloseEditModal,
        handleOpenCreateModal,
        handleOpenEditModal,

        // Content
        pageTitle,
        createButtonText,
        noDataMessage,
    } = useUserDashboard(props);

    // Loading state
    if (isLoading) {
        return (
            <div className={USER_DASHBOARD_STYLES.container}>
                <UserHeader />
                <div className={USER_DASHBOARD_STYLES.loadingContainer}>
                    <div className={USER_DASHBOARD_STYLES.loadingSpinner}></div>
                    <p className={USER_DASHBOARD_STYLES.loadingText}>
                        Chargement des interventions...
                    </p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className={USER_DASHBOARD_STYLES.container}>
                <UserHeader />
                <div className={USER_DASHBOARD_STYLES.errorContainer}>
                    <div className={USER_DASHBOARD_STYLES.errorIcon}>⚠️</div>
                    <h2 className={USER_DASHBOARD_STYLES.errorTitle}>Erreur de chargement</h2>
                    <p className={USER_DASHBOARD_STYLES.errorMessage}>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={USER_DASHBOARD_STYLES.container}>
            <UserHeader />

            <div className={USER_DASHBOARD_STYLES.content}>
                {/* Page Header */}
                <div className={USER_DASHBOARD_STYLES.header}>
                    <h1 className={USER_DASHBOARD_STYLES.pageTitle}>{pageTitle}</h1>
                    <button
                        onClick={handleOpenCreateModal}
                        className={USER_DASHBOARD_STYLES.createButton}
                    >
                        <span className={USER_DASHBOARD_STYLES.createButtonIcon}>+</span>
                        {createButtonText}
                    </button>
                </div>

                {/* Statistics */}
                <DashboardStats statistics={statistics} />

                {/* Filters */}
                <InterventionFilters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={clearFilters}
                />

                {/* Interventions Grid */}
                <div className={USER_DASHBOARD_STYLES.interventionsSection}>
                    {filteredInterventions.length === 0 ? (
                        <div className={USER_DASHBOARD_STYLES.noDataContainer}>
                            <div className={USER_DASHBOARD_STYLES.noDataIcon}>📋</div>
                            <p className={USER_DASHBOARD_STYLES.noDataMessage}>{noDataMessage}</p>
                        </div>
                    ) : (
                        <div className={USER_DASHBOARD_STYLES.interventionsGrid}>
                            {filteredInterventions.map((intervention) => (
                                <InterventionCard
                                    key={intervention.intervention_id}
                                    intervention={intervention}
                                    onEdit={() => handleOpenEditModal(intervention)}
                                    onSend={() =>
                                        handleSendIntervention(intervention.intervention_id)
                                    }
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modals */}
            {showCreateModal && (
                <CreateInterventionModal
                    onClose={handleCloseCreateModal}
                    onSubmit={handleCreateIntervention}
                    userId={user?.id || 0}
                />
            )}

            {showEditModal && editingIntervention && (
                <EditInterventionModal
                    intervention={editingIntervention}
                    onClose={handleCloseEditModal}
                    onSubmit={handleEditIntervention}
                    userId={user?.id || 0}
                />
            )}
        </div>
    );
};

export default UserDashboard;
