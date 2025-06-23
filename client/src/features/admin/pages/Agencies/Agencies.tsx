import { useAgencies } from './Agencies.hook';
import { AGENCIES_STYLES } from './Agencies.styles';
import AgencyCard from './components/AgencyCard';
import CreateAgencyModal from './components/CreateAgencyModal';
import ConfirmationModal from '../Users/components/ConfirmationModal';
import type { AgenciesProps } from './Agencies.types';

/**
 * @component Agencies
 * @description Page component for managing all system agencies with CRUD operations
 *
 * @dependencies useAgencies hook, AgencyCard component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const Agencies = (props: AgenciesProps) => {
    const {
        agencies,
        isLoading,
        error,
        loadingActions,
        showCreateModal,
        isCreating,
        confirmModal,
        handleCreateAgency,
        handleUpdateAgency,
        handleSetCurrentAgency,
        showDeleteConfirmation,
        handleConfirmDelete,
        handleCancelDelete,
        handleOpenCreateModal,
        handleCloseCreateModal,
        handleRetry,
        pageTitle,
        subtitle,
        noDataMessage,
        loadingMessage,
        errorRetryText,
        createButtonText,
    } = useAgencies(props);

    // Loading state
    if (isLoading) {
        return (
            <div className={AGENCIES_STYLES.container}>
                <div className={AGENCIES_STYLES.content}>
                    <div className={AGENCIES_STYLES.loadingContainer}>
                        <div className={AGENCIES_STYLES.loadingSpinner}></div>
                        <p className={AGENCIES_STYLES.loadingText}>{loadingMessage}</p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className={AGENCIES_STYLES.container}>
                <div className={AGENCIES_STYLES.content}>
                    <div className={AGENCIES_STYLES.errorContainer}>
                        <div className={AGENCIES_STYLES.errorIcon}>⚠️</div>
                        <h2 className={AGENCIES_STYLES.errorTitle}>Erreur de chargement</h2>
                        <p className={AGENCIES_STYLES.errorMessage}>{error}</p>
                        <button onClick={handleRetry} className={AGENCIES_STYLES.retryButton}>
                            {errorRetryText}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={AGENCIES_STYLES.container}>
            <div className={AGENCIES_STYLES.content}>
                {/* Page Header */}
                <div className={AGENCIES_STYLES.header}>
                    <div className={AGENCIES_STYLES.headerLeft}>
                        <h1 className={AGENCIES_STYLES.pageTitle}>{pageTitle}</h1>
                        <p className={AGENCIES_STYLES.subtitle}>{subtitle}</p>
                    </div>
                    <button
                        onClick={handleOpenCreateModal}
                        className={AGENCIES_STYLES.createButton}
                    >
                        <span className={AGENCIES_STYLES.createButtonIcon}>+</span>
                        {createButtonText}
                    </button>
                </div>

                {/* Agencies List */}
                {agencies.length === 0 ? (
                    <div className={AGENCIES_STYLES.noDataContainer}>
                        <div className={AGENCIES_STYLES.noDataIcon}>🏢</div>
                        <p className={AGENCIES_STYLES.noDataMessage}>{noDataMessage}</p>
                    </div>
                ) : (
                    <div className={AGENCIES_STYLES.agenciesList}>
                        {agencies.map((agency) => {
                            const agencyKey =
                                agency.id || agency.agency_id || Math.random().toString();
                            return (
                                <AgencyCard
                                    key={agencyKey}
                                    agency={agency}
                                    onUpdate={handleUpdateAgency}
                                    onDelete={showDeleteConfirmation}
                                    onSetCurrent={handleSetCurrentAgency}
                                    isLoading={loadingActions[agency.id || agency.agency_id || '']}
                                />
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Create Agency Modal */}
            <CreateAgencyModal
                isOpen={showCreateModal}
                onClose={handleCloseCreateModal}
                onSubmit={handleCreateAgency}
                isLoading={isCreating}
            />

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={confirmModal.isOpen}
                title="Confirmer la suppression"
                message={`Êtes-vous sûr de vouloir supprimer l'agence "${confirmModal.agencyName}" ? Cette action est irréversible.`}
                confirmText="Supprimer"
                cancelText="Annuler"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                isLoading={
                    confirmModal.agencyId
                        ? loadingActions[confirmModal.agencyId] === 'delete'
                        : false
                }
            />
        </div>
    );
};

export default Agencies;
