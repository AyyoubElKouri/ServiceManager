import { useInactiveUsers } from './InactiveUsers.hook';
import { INACTIVE_USERS_STYLES } from './InactiveUsers.styles';
import UserCard from './components/UserCard';
import type { InactiveUsersProps } from './InactiveUsers.types';

/**
 * @component InactiveUsers
 * @description Page component for managing inactive users awaiting activation
 *
 * @dependencies useInactiveUsers hook, UserCard component
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const InactiveUsers = (props: InactiveUsersProps) => {
    const {
        inactiveUsers,
        isLoading,
        error,
        loadingActions,
        handleActivateUser,
        handleDeleteUser,
        handleRetry,
        pageTitle,
        subtitle,
        noDataMessage,
        loadingMessage,
    } = useInactiveUsers(props);

    // Loading state
    if (isLoading) {
        return (
            <div className={INACTIVE_USERS_STYLES.container}>
                <div className={INACTIVE_USERS_STYLES.content}>
                    <div className={INACTIVE_USERS_STYLES.loadingContainer}>
                        <div className={INACTIVE_USERS_STYLES.loadingSpinner}></div>
                        <p className={INACTIVE_USERS_STYLES.loadingText}>{loadingMessage}</p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className={INACTIVE_USERS_STYLES.container}>
                <div className={INACTIVE_USERS_STYLES.content}>
                    <div className={INACTIVE_USERS_STYLES.errorContainer}>
                        <div className={INACTIVE_USERS_STYLES.errorIcon}>⚠️</div>
                        <h2 className={INACTIVE_USERS_STYLES.errorTitle}>Erreur</h2>
                        <p className={INACTIVE_USERS_STYLES.errorMessage}>{error}</p>
                        <button
                            onClick={handleRetry}
                            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                        >
                            Réessayer
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={INACTIVE_USERS_STYLES.container}>
            <div className={INACTIVE_USERS_STYLES.content}>
                {/* Header */}
                <div className={INACTIVE_USERS_STYLES.header}>
                    <h1 className={INACTIVE_USERS_STYLES.pageTitle}>{pageTitle}</h1>
                    <p className={INACTIVE_USERS_STYLES.subtitle}>{subtitle}</p>
                </div>

                {/* Users List */}
                {inactiveUsers.length === 0 ? (
                    <div className={INACTIVE_USERS_STYLES.noDataContainer}>
                        <div className={INACTIVE_USERS_STYLES.noDataIcon}>👥</div>
                        <p className={INACTIVE_USERS_STYLES.noDataMessage}>{noDataMessage}</p>
                    </div>
                ) : (
                    <div className={INACTIVE_USERS_STYLES.usersList}>
                        {inactiveUsers.map((user) => (
                            <UserCard
                                key={user.user_id}
                                user={user}
                                onActivate={handleActivateUser}
                                onDelete={handleDeleteUser}
                                isLoading={loadingActions[user.user_id]}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InactiveUsers;
