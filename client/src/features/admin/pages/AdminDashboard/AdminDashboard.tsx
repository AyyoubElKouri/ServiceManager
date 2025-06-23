import { Outlet } from 'react-router-dom';
import { useAdminDashboard } from './files/AdminDashboard.hook';
import { ADMIN_DASHBOARD_STYLES } from './files/AdminDashboard.styles';
import type { AdminDashboardProps } from './files/AdminDashboard.types';

// Import components
import AdminLayout from '../../shared/components/AdminLayout';

/**
 * @component AdminDashboard
 * @description Main admin dashboard component with layout and routing
 *
 * @dependencies useAdminDashboard hook, AdminLayout
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const AdminDashboard = (props: AdminDashboardProps) => {
    const {
        isLoading,
        error,
        user,
    } = useAdminDashboard(props);

    // Loading state
    if (isLoading) {
        return (
            <div className={ADMIN_DASHBOARD_STYLES.loadingContainer}>
                <div className={ADMIN_DASHBOARD_STYLES.loadingSpinner}></div>
                <p className={ADMIN_DASHBOARD_STYLES.loadingText}>
                    Chargement du tableau de bord...
                </p>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className={ADMIN_DASHBOARD_STYLES.errorContainer}>
                <div className={ADMIN_DASHBOARD_STYLES.errorIcon}>⚠️</div>
                <h2 className={ADMIN_DASHBOARD_STYLES.errorTitle}>Erreur d'accès</h2>
                <p className={ADMIN_DASHBOARD_STYLES.errorMessage}>{error}</p>
            </div>
        );
    }

    // Not admin
    if (user && user.role !== 'admin') {
        return (
            <div className={ADMIN_DASHBOARD_STYLES.errorContainer}>
                <div className={ADMIN_DASHBOARD_STYLES.errorIcon}>🚫</div>
                <h2 className={ADMIN_DASHBOARD_STYLES.errorTitle}>Accès refusé</h2>
                <p className={ADMIN_DASHBOARD_STYLES.errorMessage}>
                    Vous n'avez pas les permissions nécessaires pour accéder à cette page.
                </p>
            </div>
        );
    }

    return (
        <AdminLayout>
            <div className={ADMIN_DASHBOARD_STYLES.container}>
                <Outlet />
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
