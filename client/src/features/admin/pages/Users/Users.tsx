import { useUsers } from './Users.hook';
import { USERS_STYLES } from './Users.styles';
import UserCard from './components/UserCard';
import ConfirmationModal from './components/ConfirmationModal';
import type { UsersProps } from './Users.types';

/**
 * @component Users
 * @description Page component for managing all system users with CRUD operations
 *
 * @dependencies useUsers hook, UserCard component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const Users = (props: UsersProps) => {
    const {
        users,
        isLoading,
        error,
        loadingActions,
        handleUpdateUser,
        showDeleteConfirmation,
        handleRetry,
        pageTitle,
        subtitle,
        noDataMessage,
        loadingMessage,
        errorRetryText,
        confirmModal,
        handleConfirmDelete,
        handleCancelDelete,
    } = useUsers(props);

    // Loading state
    if (isLoading) {
        return (
            <div className={USERS_STYLES.container}>
                <div className={USERS_STYLES.content}>
                    <div className={USERS_STYLES.loadingContainer}>
                        <div className={USERS_STYLES.loadingSpinner}></div>
                        <p className={USERS_STYLES.loadingText}>{loadingMessage}</p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className={USERS_STYLES.container}>
                <div className={USERS_STYLES.content}>
                    <div className={USERS_STYLES.errorContainer}>
                        <div className={USERS_STYLES.errorIcon}>⚠️</div>
                        <h2 className={USERS_STYLES.errorTitle}>Erreur de chargement</h2>
                        <p className={USERS_STYLES.errorMessage}>{error}</p>
                        <button onClick={handleRetry} className={USERS_STYLES.retryButton}>
                            {errorRetryText}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={USERS_STYLES.container}>
            <div className={USERS_STYLES.content}>
                {/* Page Header */}
                <div className={USERS_STYLES.header}>
                    <h1 className={USERS_STYLES.pageTitle}>{pageTitle}</h1>
                    <p className={USERS_STYLES.subtitle}>{subtitle}</p>
                </div>

                {/* Users List */}
                {users.length === 0 ? (
                    <div className={USERS_STYLES.noDataContainer}>
                        <div className={USERS_STYLES.noDataIcon}>👥</div>
                        <p className={USERS_STYLES.noDataMessage}>{noDataMessage}</p>
                    </div>
                ) : (
                    <div className={USERS_STYLES.usersList}>
                        {users.map((user) => (
                            <UserCard
                                key={user.user_id}
                                user={user}
                                onUpdate={handleUpdateUser}
                                onDelete={showDeleteConfirmation}
                                isLoading={loadingActions[user.user_id]}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={confirmModal.isOpen}
                title="Confirmer la suppression"
                message={`Êtes-vous sûr de vouloir supprimer l'utilisateur "${confirmModal.userName}" ? Cette action est irréversible.`}
                confirmText="Supprimer"
                cancelText="Annuler"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                isLoading={
                    confirmModal.userId ? loadingActions[confirmModal.userId] === 'delete' : false
                }
            />
        </div>
    );
};

export default Users;
