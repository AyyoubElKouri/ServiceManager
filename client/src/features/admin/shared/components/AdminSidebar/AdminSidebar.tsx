import { useAdminSidebar } from './files/AdminSidebar.hook';
import { ADMIN_SIDEBAR_STYLES } from './files/AdminSidebar.styles';
import type { AdminSidebarProps } from './files/AdminSidebar.types';

/**
 * @component AdminSidebar
 * @description Sidebar navigation component for admin dashboard
 *
 * @dependencies useAdminSidebar hook, AdminSidebar.styles
 *
 * @author Ayyoub El Kouri
 * @date 14/06/2025
 * @lastUpdate 14/06/2025
 */
const AdminSidebar = (props: AdminSidebarProps) => {
    const {
        navigationItems,
        currentPath,
        handleNavigation,
    } = useAdminSidebar(props);

    return (
        <aside className={`${ADMIN_SIDEBAR_STYLES.container} ${props.isOpen ? ADMIN_SIDEBAR_STYLES.open : ADMIN_SIDEBAR_STYLES.closed}`}>
            <div className={ADMIN_SIDEBAR_STYLES.content}>
                {/* Navigation Title */}
                <div className={ADMIN_SIDEBAR_STYLES.header}>
                    <h2 className={ADMIN_SIDEBAR_STYLES.title}>Administration</h2>
                </div>

                {/* Navigation Links */}
                <nav className={ADMIN_SIDEBAR_STYLES.nav}>
                    {navigationItems.map((item) => {
                        const isActive = currentPath === item.path || 
                                        (item.path === '/admin-dashboard' && currentPath === '/admin-dashboard/statistics');
                        
                        return (
                            <button
                                key={item.path}
                                onClick={() => handleNavigation(item.path)}
                                className={`${ADMIN_SIDEBAR_STYLES.navItem} ${
                                    isActive ? ADMIN_SIDEBAR_STYLES.navItemActive : ADMIN_SIDEBAR_STYLES.navItemInactive
                                }`}
                            >
                                <span className={ADMIN_SIDEBAR_STYLES.navIcon}>
                                    {item.icon}
                                </span>
                                <span className={ADMIN_SIDEBAR_STYLES.navText}>
                                    {item.label}
                                </span>
                                {isActive && (
                                    <div className={ADMIN_SIDEBAR_STYLES.activeIndicator}></div>
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className={ADMIN_SIDEBAR_STYLES.footer}>
                    <div className={ADMIN_SIDEBAR_STYLES.footerContent}>
                        <span className={ADMIN_SIDEBAR_STYLES.footerIcon}>⚙️</span>
                        <span className={ADMIN_SIDEBAR_STYLES.footerText}>
                            Système de gestion
                        </span>
                    </div>
                </div>
            </div>

            {/* Decorative gradient */}
            <div className={ADMIN_SIDEBAR_STYLES.gradient}></div>
        </aside>
    );
};

export default AdminSidebar;
